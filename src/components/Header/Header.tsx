import * as React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import { connect } from 'react-redux'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import {
  ActionCreator,
  Operation as ContactOperation,
} from '../../reducer/contacts/contacts'

interface Props {
  setCurrentContact: (id: number) => void
  searchContacts: (string: string) => void
}

function Header(props: Props) {
  const { setCurrentContact, searchContacts } = props

  const [searchString, setSearchString] = React.useState('')

  const onModalOpen = () => {
    setCurrentContact(-1)
  }

  const onSearchStringChange = (evt: { target: { value: string } }) => {
    const string = evt.target.value
    setSearchString(string)
  }

  const onSearchSubmit = () => {
    searchContacts(searchString)
  }

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        m: '20px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 960,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Поиск"
        value={searchString}
        onChange={onSearchStringChange}
        inputProps={{ 'aria-label': 'Поиск' }}
      />
      <IconButton
        onClick={onSearchSubmit}
        type="button"
        sx={{ p: '10px' }}
        aria-label="Кнопка поиска"
      >
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        onClick={onModalOpen}
        color="primary"
        sx={{ p: '10px' }}
        aria-label="Добавить контакт"
      >
        <AddCircleIcon />
      </IconButton>
    </Paper>
  )
}

const mapDispatchToProps = (dispatch: (arg: any) => void) => ({
  setCurrentContact(id: number) {
    dispatch(ActionCreator.setCurrentContact(id))
  },
  searchContacts(string: string) {
    dispatch(ContactOperation.searchContacts(string))
  },
})

export default connect(null, mapDispatchToProps)(Header)
