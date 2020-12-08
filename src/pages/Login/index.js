import React, { useState } from "react"
import {
  Button,
  TextField,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import marvelLoginIcon from "../../assets/MarvelLogo.svg";

import axios from "axios";

import { BASE_URL } from "../../consts";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 'auto',
  },
  button: {
    marginBottom: theme.spacing(2),
    color:"white",
    background:"#f44336"
  },
  margin:{
    marginTop: theme.spacing(2.5),
  }
}));

const Login = (props) => {
  const classes = useStyles();
  const USER_EMPTY = 'Email não preenchido!'
  const PASS_EMPTY = 'Senha não preenchida!'
  const CREDENTIALS_ERROR = 'Email ou senha incorretos!'
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ emailNameError, setEmailNameError ] = useState("");
  const [ passwordNameError, setPasswordNameError ] = useState("");
  const [ loginSubmitted, setLoginSubmitted ] = useState(false);

  const handleChange = (prop) => eve => {
    const input = eve.target.value;
    switch (prop) {
      case 'email':
        setEmail(input)
        break;
      case 'password':
        setPassword(input)
        break;
    };
  };

  const handleSignIn = async () => {
    if(email && password) {
      setLoginSubmitted(true);
      try {
        await axios.post(`${BASE_URL}/user/login`, {
          email: email,
          senha: password
        })
        .then(res => {
          const data = {
            id: res.data.id,
            token: res.data.token,
            email: email
          }
          window.localStorage.setItem('data', JSON.stringify(data));
        });
          props.history.push('/search')
      } catch (error) {
        console.log(error);
      }
    }
    if (!email && !password) {
      return (setEmailNameError(USER_EMPTY) && setPasswordNameError(PASS_EMPTY));
    }
    if(!email) {
      return setEmailNameError(USER_EMPTY)
    }
  };

  const getErrorMessage = () => {
    if (loginSubmitted) {
      return (
        <>
          <Typography variant={'body2'} gutterBottom color={'error'}>
            {CREDENTIALS_ERROR}
          </Typography>
        </>
      );
    }
    return null;
  }

  return (
    <>
      {getErrorMessage()}
      <Grid  
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
      <Grid item xs={3}>
        <img 
          src={marvelLoginIcon} 
          alt="Marvel Login Icon" 
          height={200} 
          width={200} 
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          id={'email'}
          error={!!emailNameError}
          className={classes.margin}
          variant={'outlined'}
          fullWidth
          autoFocus
          label={'Email'}
          value={email}
          onChange={handleChange('email')}
          helperText={emailNameError}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          id={'password'}
          error={!!passwordNameError}
          className={classes.margin}
          variant={'outlined'}
          fullWidth
          label={'Senha'}
          value={password}
          onChange={handleChange('password')}
          helperText={passwordNameError}
        />
      </Grid>
      <br></br>
      <Grid item xs={3}>
        <Button
          id="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          fullWidth
          onClick={(eve) => handleSignIn(eve)}
        >
          ENTRAR
      </Button>
      </Grid>
      <Grid item xs={3}>
      <Typography variant={'body2'}>
            <a href="/SignUp">Não tem conta? Registre-se</a>
          </Typography>
      </Grid>
      </Grid>
    </>
  )
};

export default Login;