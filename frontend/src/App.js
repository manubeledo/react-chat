import MainChatbox from './components/mainChatbox'
import SetUserLogic from './components/setUserLogic'

import { BrowserRouter, Route, Routes } from "react-router-dom"
import socket from './components/socket';
import './App.css';
import './Login.css';

function App() {
  socket.emit('conectado', "hola desde cliente")

  return (
    <BrowserRouter>

      <Routes> 
        <Route path="/" element={<SetUserLogic/>}></Route>
        <Route path="/chat" element={<MainChatbox/>}></Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
