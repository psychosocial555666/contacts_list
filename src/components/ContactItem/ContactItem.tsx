import * as React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit'
import { connect } from 'react-redux'
import {
  ActionCreator,
  Operation as ContactOperation,
} from '../../reducer/contacts/contacts'
import { ContactType } from '../../types'
import { stringAvatar } from '../../utils'
import { Dispatch } from 'redux'

interface Props {
  contact: ContactType
  setCurrentContact: (id: number) => void
  deleteContact: (id: number) => void
}

function ContactItem(props: Props) {
  const { contact, setCurrentContact, deleteContact } = props
  const { id = -1, phone, name, description } = contact

  const onEditButtonClick = () => {
    setCurrentContact(id)
  }

  const onDeleteButtonClick = () => {
    deleteContact(id)
  }

  return (
    <ListItem
      alignItems="flex-start"
      secondaryAction={
        <>
          <IconButton
            onClick={onEditButtonClick}
            color="primary"
            aria-label="Редактировать"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={onDeleteButtonClick}
            color="error"
            edge="end"
            aria-label="Удалить"
          >
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <ListItemAvatar>
        <Avatar {...stringAvatar(name)} />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {`${phone} - `}
            </Typography>
            {description}
          </React.Fragment>
        }
      />
    </ListItem>
  )
}

const mapDispatchToProps = (dispatch: Dispatch | any) => ({
  setCurrentContact(id: number) {
    dispatch(ActionCreator.setCurrentContact(id))
  },
  deleteContact(id: number) {
    dispatch(ContactOperation.deleteContact(id))
  },
})

export default connect(null, mapDispatchToProps)(ContactItem)
