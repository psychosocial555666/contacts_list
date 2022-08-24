import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { connect } from 'react-redux'
import { ContactType } from '../../types'
import {
  ActionCreator,
  Operation as ContactOperation,
} from '../../reducer/contacts/contacts'
import DialogTitle from '@mui/material/DialogTitle'
import { newContact } from '../../const'

interface Props {
  setCurrentContact: (id: number | null) => void
  addContact: (contact: ContactType) => void
  editContact: (id: number, contact: ContactType) => void
  currentContact: number | null
  contacts: ContactType[]
}

function ContractModal(props: Props) {
  const {
    addContact,
    editContact,
    currentContact,
    setCurrentContact,
    contacts,
  } = props
  const [contact, setContact] = React.useState<ContactType>(newContact)

  React.useEffect(() => {
    if (currentContact !== -1 && currentContact !== null) {
      let stateContact = contacts.find((cont) => cont.id === currentContact)
      if (stateContact) setContact({ ...stateContact })
    }
  }, [currentContact, contacts])

  const onContactChange = (evt: { target: { id: string; value: string } }) => {
    const { id, value } = evt.target
    const data = { ...contact, [id]: value }
    setContact(data)
  }

  const onModalClose = () => {
    setCurrentContact(null)
    setContact(newContact)
  }

  const onModalSubmit = () => {
    if (currentContact !== -1 && currentContact !== null) {
      editContact(currentContact, contact)
    } else {
      addContact(contact)
    }
    onModalClose()
  }

  return (
    <div>
      <Dialog open={Boolean(currentContact)} onClose={onModalClose}>
        <DialogTitle>Новый контакт</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={contact.name}
            label="Имя"
            onChange={onContactChange}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            onChange={onContactChange}
            id="phone"
            value={contact.phone}
            label="Номер телефона"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            onChange={onContactChange}
            value={contact.description}
            id="description"
            label="Описание"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onModalClose}>Отмена</Button>
          <Button onClick={onModalSubmit}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  currentContact: state.CONTACTS.currentContact,
  contacts: state.CONTACTS.contacts,
})

const mapDispatchToProps = (dispatch: (arg: any) => void) => ({
  addContact(contact: ContactType) {
    dispatch(ContactOperation.addContact(contact))
  },
  editContact(id: number, contact: ContactType) {
    dispatch(ContactOperation.editContact(id, contact))
  },
  setCurrentContact(id: number | null) {
    dispatch(ActionCreator.setCurrentContact(id))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ContractModal)
