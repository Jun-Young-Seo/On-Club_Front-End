import logo from './logo.svg';
import './App.css';
import { Route,Router,Routes, useLocation } from 'react-router';
import Main from './Main/Main';
//asdasd
function App() {
  const location = useLocation();
  return (
      <Routes>
        <Route path="/" element={<Main/>}/>
      </Routes>
  );
}

export default App;
  