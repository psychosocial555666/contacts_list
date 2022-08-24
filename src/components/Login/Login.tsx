import Dialog from '@mui/material/Dialog'
import SingIn from './SingIn'
import React from 'react'

export function Login() {
  return (
    <Dialog open={true} fullWidth={true} maxWidth="xs">
      <SingIn />
    </Dialog>
  )
}

export default Login
