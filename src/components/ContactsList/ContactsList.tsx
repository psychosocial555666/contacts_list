import * as React from 'react'
import { connect } from 'react-redux'
import List from '@mui/material/List'
import ContactItem from '../ContactItem/ContactItem'
import { ContactType, StateType } from '../../types'

interface Props {
  contacts: ContactType[]
}

function ContactsList(props: Props) {
  const { contacts } = props
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 960,
        bgcolor: 'background.paper',
        height: 'calc(100vh - 88px)',
        overflowY: 'auto',
      }}
    >
      {contacts.map((contact) => (
        <ContactItem contact={contact} key={contact.id} />
      ))}
    </List>
  )
}

const mapStateToProps = (state: StateType) => ({
  contacts: state.CONTACTS.contacts,
})

export default connect(mapStateToProps)(ContactsList)
