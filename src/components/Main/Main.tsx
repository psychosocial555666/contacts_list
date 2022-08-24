import { Box } from '@mui/system'
import ContactsList from '../ContactsList/ContactsList'
import Header from '../Header/Header'

export function MainScreen() {
  return (
    <Box
      sx={{
        minHeight: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Header />
      <ContactsList />
    </Box>
  )
}

export default MainScreen
