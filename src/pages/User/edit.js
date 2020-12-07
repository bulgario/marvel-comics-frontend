import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../consts";

import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, Button } from "@material-ui/core";

import MarvelLogo from "../../assets/MarvelLogo.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    button: {
      marginBottom: theme.spacing(2),
      color: "white",
      background: "#f44336",
    },
  },
}));

const User = () => {
  const classes = useStyles();
  const [userid, setUserId] = useState();
  const [user, setUserData] = useState({});

  const getUserId = async () => {
    const { email } = JSON.parse(window.localStorage.getItem("data"));
    try {
      await axios
        .get(`${BASE_URL}/user`, {
          params: {
            email: email,
          },
        })
        .then((res) => {
          setUserId(res.data.data.id);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      await axios.get(`${BASE_URL}/user/${userid}`).then((res) => {
        setUserData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    getUserData();
  }, [userid]);

  const handleSubmitForm = (eve) => {
    eve.preventDefault();
    // request para backend
  };

  const handleChange = (prop) => (eve) => {
    const input = eve.target.value;
    setUserData((prevState) => ({ ...prevState, [prop]: input }));
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <form className={classes.root} noValidate autoComplete="off">
      <Grid item>
        <img 
          src={MarvelLogo} 
          alt="Marvel Login Icon" 
          height={200} 
          width={200} 
        />
      </Grid>
        <Grid item xs={10}>
          <TextField
            required
            id="outlined-required"
            label="Nome"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={user.nome}
            onChange={handleChange("nome")}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            required
            id="outlined-required"
            label="Sobrenome"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={user.nome}
            onChange={handleChange("nome")}
            value={user.sobrenome}
            onChange={handleChange("sobrenome")}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            required
            id="outlined-required"
            label="Email"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={user.email}
            onChange={handleChange("email")}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            required
            id="outlined-required"
            label="Senha"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={user.senha}
            onChange={handleChange("senha")}
          />
        </Grid>
        <Grid item xs={10}>
          <Button
            id="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            fullWidth
            onClick={(eve) => handleSubmitForm(eve)}
          >
            Alterar dado
          </Button>
        </Grid>
        <Grid item xs={10}>
          <a
            href="/search"
          >
            Voltar
          </a>
        </Grid>
      </form>
    </Grid>
  );
};

export default User;
