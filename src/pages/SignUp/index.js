import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';

import marvelLoginIcon from "../../assets/MarvelLogo.svg";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
}));

const SignUp = (props) => {
  const classes = useStyles();
  const [ firstname, setFirstName ] = useState("");
  const [ lastname, setLastName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ success, setSuccess ] = useState(false);


  const handleChange = (prop) => eve => {
    const input = eve.target.value;
    switch (prop) {
      case 'firstName':
        setFirstName(input)
        break;
      case 'lastName':
        setLastName(input)
        break;
      case 'email':
        setEmail(input)
        break;
      case 'password':
        setPassword(input)
        break;
    };
  };

  const handleSubmit = async (eve) => {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    //chamada para backend
    const chamadaBackEnd = true;
    //se retornar true
    if(chamadaBackEnd) {
      eve.preventDefault()
      setSuccess(true);
      await delay(3000);

      props.history.push('/login');
    } else {
      setSuccess(false);
      props.history.push('/login');
    };
  };


  const successMessage = () => (
    <>
      <Typography variant="h2" gutterBottom>Conta Criada!</Typography>
      <Typography variant="h5" gutterBottom>Super Redirecionamento Rolando!</Typography>
    </>
  );

  const formRegister = () => (
      <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form 
        className={classes.form} 
        noValidate
        onSubmit={(eve) => handleSubmit(eve)}  
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="Nome"
              autoFocus
              onChange={handleChange('firstName')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Sobrenome"
              name="lastName"
              autoComplete="lname"
              onChange={handleChange('lastName')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              onChange={handleChange('email')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange('password')}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Criar super conta
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Já tem uma conta? Logue-se meu herói
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );

  return (
    <Container component="main" maxWidth="xs">
      <img 
        src={marvelLoginIcon} 
        alt="Marvel Login Icon" 
        height={500} 
        width={500} 
      />
       {success ? (
        successMessage()
      ) : (
        formRegister()
      )}
    </Container>
  );
};

export default withRouter(SignUp);
