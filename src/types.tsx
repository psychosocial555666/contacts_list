import { Axios } from 'axios'
import { Dispatch } from 'redux'

export interface UserType {
  id: string
  name: string
}

export interface StateType {
  USER: UserStateType
  CONTACTS: ContactsStateType
}

export interface UserStateType {
  user: UserType | null
}

export interface ContactsStateType {
  contacts: ContactType[]
  currentContact: number | null
}

export interface ContactType {
  id?: number
  phone: string
  name: string
  description: string
}

export enum UserActionTypes {
  SET_USER = 'SET_USER',
}

export enum ContactsActionTypes {
  SET_CONTACTS = `SET_CONTACTS`,
  SET_CURRENT_CONTACTS = `SET_CURRENT_CONTACTS`,
}

export interface FetchUserAction {
  type: typeof UserActionTypes.SET_USER
  payload: UserType | null
}

export interface FetchContactsAction {
  type:
    | typeof ContactsActionTypes.SET_CONTACTS
    | typeof ContactsActionTypes.SET_CURRENT_CONTACTS
  payload: ContactType | number | null
}

export interface UserOperationType {
  checkAuth: () => (
    dispatch: Dispatch,
    getState: () => StateType,
    api: Axios,
  ) => void
}

export interface ContactsOperationType {
  getContacts: () => (
    dispatch: Dispatch,
    getState: () => StateType,
    api: Axios,
  ) => void
  searchContacts: () => (
    dispatch: Dispatch,
    getState: () => StateType,
    api: Axios,
  ) => void
  addContact: () => (
    dispatch: Dispatch,
    getState: () => StateType,
    api: Axios,
  ) => void
  deleteContact: () => (
    dispatch: Dispatch,
    getState: () => StateType,
    api: Axios,
  ) => void
  editContact: () => (
    dispatch: Dispatch,
    getState: () => StateType,
    api: Axios,
  ) => void
}
