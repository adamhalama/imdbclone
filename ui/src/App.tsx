import React, { useEffect } from 'react';
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/layout/layout';
import UserContainer from './components/user/user.context';
import { ToastContainer } from 'react-toastify';
import MoviesContainer from './components/movies/movie.context';
import DevBanner from './components/dev/dev-banner';

const App = () => {

useEffect(() => {
  document.title = 'BestMovie'
}, [])

return <MoviesContainer>
  <UserContainer>
    <DevBanner />
    <Layout/>
    <ToastContainer theme='dark'/>
  </UserContainer>
</MoviesContainer>
} 
    
export default App
