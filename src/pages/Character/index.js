import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../consts";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import api from "../../services/api";

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
  },
  media: {
    height: 800,
  },
});


const Character = () => {
  const classes = useStyles();
  const [ character, setCharacter ] = useState();

  useEffect(() => {
    getCharacter()
  }, []);

  const getCharacter = async () => {
    //hackezada sinistra para pegar o ultimo item do "/"
    const href = (window.location.href).split('/') 
    const id = href[href.length - 1];
    await axios.get(`${BASE_URL}/characters/${id}`)
    .then(data => {
      setCharacter(data.data.character);
    })
  };

  const handleImage = () => {
    const { thumbnail } = character;
    return `${thumbnail.path}.${thumbnail.extension}`;
  }
  
  const handleFavoritar = async () => {
    const { id } = JSON.parse(window.localStorage.getItem('data'));
    const id_api_comic = character.id;
    await api.post(`${BASE_URL}/add/favorite/character`, {
      id_api_comic: id_api_comic,
      id_user: id
    })
    .then(data => {
      console.log(data);
    })
  }
  return (
    <>
    { character && (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={10}>
          <Card className={classes.root}>
              <CardMedia
                className={classes.media}
                image={handleImage()}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="h2">
                  {character.name}
                </Typography>
                  {character.description !== "" ? (
                    <>
                      <Typography gutterBottom variant="h5" component="h2">
                        Descrição
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {character.description}
                      </Typography>
                    </>
                  ) : ""}
                <Typography gutterBottom variant="h8" component="h2">
                  <a 
                    target="__blank"
                    href={character.urls[0].url}>
                      Para saber mais
                  </a>
                </Typography>
              </CardContent>
            <CardActions>
              <Button 
                size="small"
                color="primary"
                onClick={() => handleFavoritar()}
              >
                Favoritar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    )}
    </>
  );
}

export default Character;