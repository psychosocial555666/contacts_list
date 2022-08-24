import { combineReducers } from 'redux'
import { reducer as contacts } from './contacts/contacts'
import { reducer as user } from './user/user'

const store = combineReducers({
  USER: user,
  CONTACTS: contacts,
})

export default store
