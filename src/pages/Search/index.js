import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../consts";

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core/';

import ComicCard from "../../components/ComicCard";
import CharacterCard from "../../components/CharacterCard";
import Paginations from "../../components/Paginations";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  icon: {
    marginRight: 20,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    cards: {
      marginTop: 10
    }
  },
  button: {
    paddingLeft: 10,
    paddingRight: 10
  },
}));

const Search = (props) => {
  const classes = useStyles();
  const [ user, setUser ] = useState({});
  const [ comicOption, setComicOption ] = useState(false);
  const [ characterOption, setCharacterOption ] = useState(false);
  const [ comics, setComics ] = useState({});
  const [ characters, setCharacters ] = useState({});
  const [ loading, setLoading ] = useState(false);

  const [ totalResultsComics, setTotalResultsComic ] = useState(0);
  const [ currentPageComic, setCurrentPageComic ] = useState(1);
  
  const [ totalResultsCharacter, setTotalResultsCharacter ] = useState(0);
  const [ currentPageCharacter, setCurrentPageCharacter ] = useState(1);

  const [ numberPagesComic, setNumberPagesComic ] = useState();
  const [ numberPagesCharacter, setNumberPagesCharacter ] = useState();


  useEffect(() => {
    getUserData()
  }, []);

  useEffect(() => {
    getComicData()
    getCharacterData()
  }, [])

  useEffect(() => {
    setNumberPagesComic(Math.floor(totalResultsComics / 20));
    setNumberPagesCharacter(Math.floor(totalResultsCharacter / 20));
  }, [])

  const handleProfileMenuOpen = () => {
    props.history.push('/edit');
  };

  const handleFavoriteMenuOpen = () => {
    props.history.push('/favorite');
  };

  const getUserData = async () => {
    const { email } = JSON.parse(window.localStorage.getItem('data'));
    await axios.get(`${BASE_URL}/user`, {
      params: {
        email: email
      }
    }).then(res => {
      setUser(res.data.data);
    });
  };

  const getComicData = async () => {
    try {
      setLoading(true);
      await axios.get(`${BASE_URL}/comics`)
      .then(data => {
        setComics(data.data);
        setTotalResultsComic(data.data.pagination.total);
        setLoading(false);
    });
    } catch (error) {
      console.log("Error trying get comics", error)
    }
  };

  const getCharacterData = async () => {
    try {
      setLoading(true);
      await axios.get(`${BASE_URL}/characters`)
      .then(data => {
        console.log()
        setCharacters(data.data);
        setTotalResultsCharacter(data.data.pagination.total);
        setLoading(false);
    });
    } catch (error) {
      console.log("Error trying get characters", error)
    }
  };

  const nextPageComic = async(pageNumber) => {
    try {
      setLoading(true);
      await axios.get(`${BASE_URL}/comics/?offset=${pageNumber}`)
      .then(data => {
          setCurrentPageComic(pageNumber);
          setComics(data.data);
      setLoading(false);
    });
    } catch (error) {
      console.log("Error trying get characters", error)
    }
  };

  const nextPageCharacter = async(pageNumber) => {
    try {
      setLoading(true);
      await axios.get(`${BASE_URL}/characters/?offset=${pageNumber}`)
      .then(data => {
        setCurrentPageCharacter(pageNumber);
        setCharacters(data.data);
      setLoading(false);
    });
    } catch (error) {
      console.log("Error trying get characters", error)
    }
  };

  

 const handleClick = (type) => {
    switch (type) {
      case 'comic':
        if(characterOption) {
          setCharacterOption(false)
          setComicOption(true)
        } else {
          setComicOption(true)
        }
        break;
      case 'character':
        if(comicOption) {
          setCharacterOption(true)
          setComicOption(false)
        } else {
          setCharacterOption(true)
        }
        break;
      default:
        break;
    }
 }

 const renderComic = () => (
   <>
    <Grid container spacing={10} >
      {comics.comics.map(comic => (
          <Grid item className={classes.cards}>
            <ComicCard 
              comic={comic}
              pagination={comics.pagination} 
              history={props.history} 
            />
          </Grid>
      ))}
    </Grid>
    { totalResultsComics > 20 ? 
      <Paginations 
        pages={numberPagesComic} 
        nextPage={nextPageComic}
        currentPage={currentPageComic}
      /> : null
    }
  </>
 );

 const renderCharacter = () => (
  <>
  <Grid container spacing={10} >
    {characters.characters.map(character => (
        <Grid item className={classes.cards}>
          <CharacterCard 
            character={character}
            pagination={characters.pagination} 
            history={props.history} 
          />
        </Grid>
    ))}
  </Grid>
  { totalResultsCharacter > 20 ? 
     <Paginations 
       pages={numberPagesCharacter} 
       nextPage={nextPageCharacter}
       currentPage={currentPageCharacter}
     /> : null
   }
  </>
);

  return (
    <div className={classes.grow}>
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h6" noWrap>
          Bem vindo,{user.nome}
        </Typography>
        <div className={classes.button}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => handleClick('comic')}
          >
            Comics
          </Button>
        </div>
        <div className={classes.button}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={ () => handleClick('character')}
          >
            Characters
          </Button>
        </div>
        <div className={classes.grow} />
        <div className={classes.icon}>
          <IconButton
            edge="end"
            aria-label="edit"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
        <div className={classes.icon}>
          {/* <FavoriteIcon
            edge="end"
            aria-label="favorite"
            aria-haspopup="true"
            onClick={handleFavoriteMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </FavoriteIcon> */}
        </div>
      </Toolbar>
    </AppBar>
    <div>
      { comicOption ? (
        renderComic()
      ) : characterOption ? (
        renderCharacter()
      ) : null}
    </div>
  </div>
  )
};

export default Search;