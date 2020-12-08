import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
  root: {
    width: 310,
    height: 800
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 400,
    paddingTop: '56.25%',
  },
});

const CharacterCard = (props) => {
  const classes = useStyles();
  const { character, pagination } = props;

  const handleImage = (character) => {
    const { thumbnail } = character;
    return `${thumbnail.path}.${thumbnail.extension}`;
  };

  const handleClickCard = (id) => {
    props.history.push(`/character/${id}`);
  }

  return (
    <Card className={classes.root}>
    <CardContent>
      <Typography className={classes.pos} color="textPrimary" gutterBottom>
        {character.name}
      </Typography>
      <Typography className={classes.title} color="textSecondary">
        {character.description}
      </Typography>
    </CardContent>
    <CardMedia
      className={classes.media}
      image={handleImage(character)}
      title={character.name}
    />
    <CardActions>
      <Button 
        size="small" 
        color="primary"
        onClick={() => handleClickCard(character.id)}
      >
        Saiba mais
      </Button>
    </CardActions>
  </Card>
  )
}

export default CharacterCard;