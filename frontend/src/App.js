import logo from './logo.svg';
import MainChatbox from './components/mainChatbox'
import SetUserLogic from './components/setUserLogic'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css';
import './Login.css';


function App() {
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
