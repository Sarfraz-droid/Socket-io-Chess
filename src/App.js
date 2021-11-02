import React,{useState,useEffect} from 'react'
import Board from "./components/ChessBoard"
import { io } from "socket.io-client";

import "./sass/globalstyles.scss"

import Login from "./components/Login"
import PlayGame from "./components/Play"
import Win from "./components/Win"
import Waiting from './components/Waiting';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


const socket = io('http://localhost:8000')

function App() {

  const [Play, setPlay] = useState({
    room : {},
    state : false
  })
  useEffect(() => {
  }, [])

  useEffect(() => {
    console.log(socket)
  },[socket])

  useEffect(() => {
    
    socket.on('play-chess', (room) => {
      console.log(room)

      setPlay({
        room : room.room,
        state : room.state
      });
    });

    console.log(Play.state)
  },[socket])


  useEffect(() => {
    window.onbeforeunload = function() {
      return "Data will be lost if you leave the page, are you sure?";
    };
  
  }, []);
  
  const handleBeforeUnload = (e) => {
    e.preventDefault();
    const message =
      "Are you sure you want to leave? All provided data will be lost.";
    e.returnValue = message;
    return message;
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
          <Login socket={socket}/>
          </Route>

          <Route exact path="/login">
            <Login socket={socket}/>
          </Route>

          <Route exact path="/play">
              <PlayGame socket={socket} Play={Play} />
          </Route>

          <Route exact path="/play/:id">
              {Play.state ? <PlayGame socket={socket} Play={Play} /> : <Waiting socket={socket} Play={Play} />}
          </Route>
          <Route exact path="/play/:id/Win/:name">
            <Win />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
