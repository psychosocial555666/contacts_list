import MainScreen from '../Main/Main'
import { SnackbarProvider } from 'notistack'
import Login from '../Login/Login'
import { connect } from 'react-redux'
import { StateType, UserType } from '../../types'
import ContractModal from '../ContactModal/ContactModal'

interface Props {
  user: UserType | null
}

export function App(props: Props) {
  const { user } = props

  return (
    <SnackbarProvider maxSnack={3}>
      {!user?.id ? <Login /> : <MainScreen />}
      <ContractModal />
    </SnackbarProvider>
  )
}

const mapStateToProps = (state: StateType) => ({
  user: state.USER.user,
})

export default connect(mapStateToProps)(App)
