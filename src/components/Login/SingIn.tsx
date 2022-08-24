import * as React from 'react'
import { Grid } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Operation } from '../../reducer/user/user'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

interface Props {
  checkAuth: (authData: { login: string; password: string }) => void
}

interface AuthData {
  login: string
  password: string
}

export function SingIn(props: Props) {
  const { checkAuth } = props

  const [authData, setAuthData] = React.useState<AuthData>({
    login: '',
    password: '',
  })
  const [showPassword, setShowPassword] = React.useState<Boolean>(false)

  const singInHandler = () => {
    checkAuth(authData)
  }

  const authDataChangeHandler = (evt: {
    target: { name: string; value: string }
  }) => {
    const { name, value } = evt.target
    const data = { ...authData, [name]: value }
    setAuthData(data)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  return (
    <React.Fragment>
      <DialogTitle>Вход в приложение</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ padding: '0.5em 0' }}>
          <Grid item xs={12}>
            <TextField
              label="Логин"
              name="login"
              variant="outlined"
              color="secondary"
              value={authData?.login || ''}
              fullWidth
              onChange={authDataChangeHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="password">Пароль</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                label="Пароль"
                type={showPassword ? 'text' : 'password'}
                value={authData?.password || ''}
                onChange={authDataChangeHandler}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Посмотреть пароль"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              onClick={singInHandler}
              fullWidth
              variant="contained"
            >
              Войти
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </React.Fragment>
  )
}

const mapDispatchToProps = (dispatch: Dispatch | any) => ({
  checkAuth(authData: AuthData) {
    dispatch(Operation.checkAuth(authData))
  },
})

export default connect(null, mapDispatchToProps)(SingIn)
