import './App.css';
import { Route,Router,Routes, useLocation } from 'react-router';
import Main from './Main/Main';
import Signup from './User/Singup';
import Login from './User/Login';
import ClubListPage from './Club/ClubListPage';

function App() {
  const location = useLocation();
  return (
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path='/clubs' element={<ClubListPage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
  );
}

export default App;
  