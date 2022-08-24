import { AxiosError, Axios } from 'axios'
import { Dispatch } from 'redux'
import {
  ContactsStateType,
  ContactType,
  FetchContactsAction,
  StateType,
} from '../../types'

const initialState = {
  contacts: [],
  currentContact: null,
}

const ActionType = {
  SET_CONTACTS: `SET_CONTACTS`,
  SET_CURRENT_CONTACTS: `SET_CURRENT_CONTACTS`,
}

const ActionCreator = {
  setContacts: (contacts: ContactType[]) => {
    return {
      type: ActionType.SET_CONTACTS,
      payload: contacts,
    }
  },
  setCurrentContact: (id: number | null) => {
    return {
      type: ActionType.SET_CURRENT_CONTACTS,
      payload: id,
    }
  },
}

const reducer = (
  state = initialState as ContactsStateType,
  action: FetchContactsAction,
) => {
  switch (action.type) {
    case ActionType.SET_CONTACTS:
      return { ...state, contacts: action.payload }
    case ActionType.SET_CURRENT_CONTACTS:
      return { ...state, currentContact: action.payload }
    default:
      return state
  }
}

const Operation = {
  getContacts: () => (
    dispatch: Dispatch,
    getState: () => StateType,
    api: Axios,
  ) => {
    return api
      .get(`contacts`)
      .then((response: { data: ContactType[] }) => {
        const data = response.data
        dispatch(ActionCreator.setContacts(data))
      })
      .catch((err: AxiosError) => {
        throw err
      })
  },
  searchContacts: (string: string) => (
    dispatch: Dispatch,
    getState: () => StateType,
    api: Axios,
  ) => {
    return api
      .get(`contacts?q=${string}`)
      .then((response: { data: ContactType[] }) => {
        const data = response.data
        dispatch(ActionCreator.setContacts(data))
      })
      .catch((err: AxiosError) => {
        throw err
      })
  },
  addContact: (contact: ContactType) => (
    dispatch: Dispatch,
    getState: () => StateType,
    api: Axios,
  ) => {
    const newContact = { ...contact }
    delete newContact.id
    return api
      .post(`contacts`, newContact)
      .then((response: { data: ContactType }) => {
        const data = response.data
        if (data && data.id) {
          const contacts = [...getState().CONTACTS.contacts]
          contacts.push(data)
          dispatch(ActionCreator.setContacts(contacts))
        }
      })
      .catch((err: AxiosError) => {
        throw err
      })
  },
  deleteContact: (id: number) => (
    dispatch: Dispatch,
    getState: () => StateType,
    api: Axios,
  ) => {
    return api
      .delete(`contacts/${id}`)
      .then((response: { status: number }) => {
        const status = response.status
        if (status === 200) {
          const contacts = [...getState().CONTACTS.contacts]
          const index = contacts.findIndex((item) => item.id === id)
          if (index > -1) {
            contacts.splice(index, 1)
          }
          dispatch(ActionCreator.setContacts(contacts))
        }
      })
      .catch((err: AxiosError) => {
        throw err
      })
  },
  editContact: (id: number, contact: ContactType) => (
    dispatch: Dispatch,
    getState: () => StateType,
    api: Axios,
  ) => {
    return api
      .patch(`contacts/${id}`, contact)
      .then((response: { data: ContactType }) => {
        const data = response.data
        const contacts = [...getState().CONTACTS.contacts]
        const index = contacts.findIndex((item) => item.id === id)
        if (index > -1) {
          contacts.splice(index, 1, data)
        }
        dispatch(ActionCreator.setContacts(contacts))
      })
      .catch((err: AxiosError) => {
        throw err
      })
  },
}

export { reducer, Operation, ActionType, ActionCreator }
