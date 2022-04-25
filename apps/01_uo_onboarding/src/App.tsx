import React from 'react';
import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import { Typography } from '@mui/material';


/*

          Root User Name (?? or just force 'root', maybe in disabled eleemnt?)
          Root User Password
          Confirm Password

          Local Development or Customize
          (customize isn't implemented yet - not MVP?)
          these are customization settings

          Storage Configuration (2nd step in wizard) ( note: defaults are perfect for local development.)
          Ephemeral Storage Backend ( ? in-memory.  needs to be synced if distributed.  redis or just local)
          Persistent Storage Backend (? database, in-memory SQLite, regular sqlite)
          File Storage Backend ( attachments, like images)

          Network Configuration
          CORS
          Port for websocket

          Once wizard is up you log in as root user and after that it's the actual UO app.

          <!-- this all posts to API and creates config file.  once config file is present, it's in locked down mode. -->
          admin mode only available to localhost


*/



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        <FormControl>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
</FormControl>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >

      <Typography variant="h1" component="div" gutterBottom>
        h1. Heading
      </Typography>
      <Typography variant="h2" gutterBottom component="div">
        h2. Heading
      </Typography>
      <Typography variant="h3" gutterBottom component="div">
        h3. Heading
      </Typography>
      <Typography variant="h4" gutterBottom component="div">
        h4. Heading
      </Typography>
          <AccessAlarmIcon></AccessAlarmIcon>
          <ThreeDRotation>  </ThreeDRotation>
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
