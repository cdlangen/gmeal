import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Button from "@material-ui/core/Button";
// import { google } from "googleapis";

function App() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_API_KEY
  const notLoggedInMessage = "user not signed in";
  const [signedIn, setSignedIn] = useState(false);
  const [currentUserProfile, setCurrentUserProfile] = useState({});

  const onAuthChange = (isSignedIn) => {
    setSignedIn(isSignedIn);
    setCurrentUserProfile();
  };

  useEffect(() => {
    const params = {
      clientId: CLIENT_ID,
      apiKey: API_KEY,
      scope: "https://www.googleapis.com/auth/calendar.events",
      discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
      ],
    };

    window.gapi.load("client:auth2", () => {
      window.gapi.client.init(params).then((response) => {
        onAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange);
      });
    });
  }, []);

  function onSignInButtonClick() {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  function getContent() {
    if (signedIn) {
      return <Dashboard></Dashboard>;;
    } else {
      return (
        <div>
          <p>You are not signed in... Click here to sign in.</p>
          <Button id="loginButton" onClick={onSignInButtonClick}>
            Login with Google
          </Button>
        </div>
      );
    }
  }

  return <div className="App">{getContent()}</div>;
}

export default App;
