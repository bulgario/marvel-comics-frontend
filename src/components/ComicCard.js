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

const ComicCard = (props) => {
  const classes = useStyles();
  const { comic, pagination } = props;

  const handleImage = (comic) => {
    const { images, thumbnail } = comic;
    return images[0] ? (
      `${images[0].path}.${images[0].extension}`
    ) : `${thumbnail.path}.${thumbnail.extension}`
  }

  const handleClickCard = (id) => {
    props.history.push(`/comic/${id}`);
  }

  return (
      <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.pos} color="textPrimary" gutterBottom>
          {comic.title}
        </Typography>
        <Typography className={classes.title} color="textSecondary">
          {comic.series.name}
        </Typography>
      </CardContent>
      <CardMedia
        className={classes.media}
        image={handleImage(comic)}
        title={comic.title}
      />
      <CardActions>
        <Button 
          size="small" 
          color="primary"
          onClick={() => handleClickCard(comic.id)}
        >
          Saiba mais
        </Button>
      </CardActions>
    </Card>
  );
}

export default ComicCard;