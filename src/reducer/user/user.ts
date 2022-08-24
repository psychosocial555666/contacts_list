import { Axios, AxiosError } from 'axios'
import cogoToast from 'cogo-toast'
import { Dispatch } from 'redux'
import {
  FetchUserAction,
  StateType,
  UserStateType,
  UserType,
} from '../../types'
import { Operation as ContactsOperation } from '../contacts/contacts'

const initialState = {
  user: null,
}

const ActionType = {
  SET_USER: `SET_USER`,
}

const ActionCreator = {
  setUser: (user: UserType) => {
    return {
      type: ActionType.SET_USER,
      payload: user,
    }
  },
}

const reducer = (
  state = initialState as UserStateType,
  action: FetchUserAction,
) => {
  switch (action.type) {
    case ActionType.SET_USER:
      return { ...state, user: action.payload }
    default:
      return state
  }
}

const Operation = {
  checkAuth: (authData: { login: string; password: string }) => (
    dispatch: Dispatch | any,
    getState: () => StateType,
    api: Axios,
  ) => {
    return api
      .get(`users?login=${authData.login}&password=${authData.password}`)
      .then((response: { data: UserType[] }) => {
        if (response.data.length) {
          const { id, name } = response.data[0]
          dispatch(ActionCreator.setUser({ id, name }))
          dispatch(ContactsOperation.getContacts())
        } else {
          cogoToast.error('Неверный логин или пароль', {
            position: 'bottom-right',
          })
        }
      })
      .catch((err: AxiosError) => {
        throw err
      })
  },
}

export { reducer, Operation, ActionType, ActionCreator }
