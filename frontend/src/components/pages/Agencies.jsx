// This component will diplay each user  \\

import {Grid,Paper,TextField,Typography,Button,CircularProgress,Card, CardActions, CardMedia, CardContent} from "@mui/material";
import { React, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import StateContex from "../contex/StateContex";
import ProfileUpdate from "./ProfileUpdate";
import { useImmerReducer } from "use-immer";
import axios from "axios";
import { Container } from "@mui/system";
import { DraftsRounded } from "@mui/icons-material";

function Agencies() {
  //START STATE MANAGEMENT WITH IMMERREDUCER START \\
  const initialState = {
    // As always with get request you will need state for datais loading
    dataIsLoading: true,
    //an empty array for the agencies that we want to display
    agenciesList: [],
  };

  function ReducerFunction(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "catchAgencies":
        draft.agenciesList = action.agenciesArray;
        break;
      case "loadingDone":
        draft.dataIsLoading = false;
        break;
    }
  }
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);
  //START STATE MANAGEMENT WITH IMMERREDUCER END \\


    // REQUEST TO GET ALL PROFILES START//
  // useEffect will run once when page loads
  useEffect(() => {
    async function GetAgencies() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/profiles/`
        );
        console.log("AgenciesList:", response.data,);
        dispatch({
          type: "catchAgencies",
          agenciesArray: response.data,
          //value being caught
        });
// dispatch used switching dataIsLoading on and off
        dispatch( { type: "loadingDone" })
      } catch (error) {
        console.log(error.response);
      }
    }
    GetAgencies();
  }, []);
// REQUEST TO GET ALL PROFILES END//

  //functionality to keep user data in form @ profile page
  if (state.dataIsLoading === true) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{height: "85vh"}}>
        <CircularProgress />
      </Grid>
    );
    // to better see this loding animation comment out setDataIsLoading above
  }

  return (
  <Grid item container>
    <Grid item>{state.agenciesList.map(agency => {
      if(agency.agency_name && agency.phone_number)
      return (
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="profile picture"
          height="140"
          image={agency.profile_picture}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {agency.agency_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {agency.bio}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">X Properties</Button>
        </CardActions>
      </Card>
      )
    })}</Grid>
    </Grid>
  )
}

export default Agencies;
