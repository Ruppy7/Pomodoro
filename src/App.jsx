import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
// import axios from 'axios';
// import Register from './Register';
// import Login from './Login';
import Pomodoro from './Pomodoro';

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Check if user is already authenticated
  //   const accessToken = localStorage.getItem('accessToken');
  //   const refreshToken = localStorage.getItem('refreshToken');
  //   if(accessToken && refreshToken){
  //     // Verify and refresh tokens
  //     axios.post('http://127.0.0.1:8000/token/verify-refresh/', {access: accessToken, refresh: refreshToken})
  //     .then((response) => {
  //       if('access' in response.data){
  //         const {access} = response.data;
  //         localStorage.setItem('accessToken', access);
  //         setAuthenticated(true);
  //       } else {
  //         setAuthenticated(true);
  //       }
  //     })
  //     .catch(() => {
  //       //Invalid Tokens, log out
  //       localStorage.removeItem('accessToken');
  //       localStorage.removeItem('refreshToken');
  //       setAuthenticated(false);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  //   } else {
  //     setLoading(false);
  //   }
  // }, []);

  // if(loading){
  //   return <div className='flex flex-row justify-center items-center'>Loading ...</div>
  // }

  return(
    <Router>
      <Routes>
        {/* <Route path='/login' element={<Login setAuthenticated={setAuthenticated} />} />
        <Route path='/register' element={<Register />} /> 
        {/* Redirect to login if not authenticated */}
        {/*{!authenticated && <Route path='*' element={<Navigate to="/login" replace />} />}
        {/* Render Pomodoro component if authenticated 
        
        {authenticated && <Route path='/' element={<Pomodoro setAuthenticated={setAuthenticated}/>} />} */}
        <Route path="/" element={<Pomodoro />}/>
      </Routes>
    </Router>
  );
}

export default App
