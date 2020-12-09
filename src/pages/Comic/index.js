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

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
  },
  media: {
    height: 800,
  },
  status: {
    color: 'red'
  }
});

const Comic = (props) => {
  const classes = useStyles();
  const [ comic, setComic ] = useState();
  const [ status, setStatus ] = useState();

  useEffect(() => {
    getComic()
  }, []);

  const getComic = async () => {
    //hackezada sinistra para pegar o ultimo item do "/"
    const href = (window.location.href).split('/') 
    const id = href[href.length - 1];
    await axios.get(`${BASE_URL}/comics/${id}`)
    .then(data => {
      setComic(data.data.comic);
    })
  };


  const handleImage = () => {
    const { images, thumbnail } = comic;
    return images[0] ? (
      `${images[0].path}.${images[0].extension}`
    ) : `${thumbnail.path}.${thumbnail.extension}`
  }
  
  const handleFavoritar = async () => {
    setStatus("");
    const { id } = JSON.parse(window.localStorage.getItem('data'));
    const id_api_comic = comic.id;
    try {
      await axios.post(`${BASE_URL}/add/favorite/comic`, {
        id_api_comic: id_api_comic,
        id_user: id
      })
      .then(data => {
        setStatus(data.data.message);
      }) 
    } catch (error) {
      setStatus("Comic já Favoritada!")
      console.log("Error try Favoritar", error);
    }
  }

  return (
    <>
    { comic && (
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
              />
              { status && (
                <Typography gutterBottom className={classes.status} variant="h4" component="h2">
                {status}
                </Typography>
              )}
              <CardContent>
                <Typography gutterBottom variant="h4" component="h2">
                  {comic.title}
                </Typography>
                  {comic.description !== "" ? (
                    <>
                      <Typography gutterBottom variant="h5" component="h2">
                        Descrição
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {comic.description}
                      </Typography>
                    </>
                  ) : ""}
                  <Typography gutterBottom variant="h5" component="h2">
                    Criadores
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {comic.creators.available > 0 ? (
                    comic.creators.items.map(creator => (
                      <Typography variant="body2" color="textSecondary" component="p">
                        {creator.name}<br></br>{creator.role}
                      </Typography>
                    ))
                  ): null}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                    Dia da venda: {comic.dates[0].date}
                </Typography>
                <Typography gutterBottom variant="h8" component="h2">
                  <a 
                    target="__blank"
                    href={comic.urls[0].url}>
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
  )
};

export default Comic;