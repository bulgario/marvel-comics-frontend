import React from "react";
import MarvelNoImage from "../../assets/MarvelNoImage.jpg";
import { Grid, Typography } from "@material-ui/core";

const Maintenance = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Typography gutterBottom variant="h5" component="h2">
        Página em Manutenção!
      </Typography>
      <Grid item xs={3}>
        <img
          src={MarvelNoImage}
          alt="Marvel Login Icon"
          height={200}
          width={200}
        />
      </Grid>
    </Grid>
  );
};

export default Maintenance;
