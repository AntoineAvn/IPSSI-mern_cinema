import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomeContainer from "./pages/home/HomeContainer";
import UserMovies from './pages/user/UserMovies.jsx';
import MovieDetails from './pages/user/MovieDetails.jsx';
import MovieForm from './pages/user/MovieForm.jsx';
// import ErrorPage from "./pages/error/ErrorPage";
import RegistrationForm from './pages/registration/RegistrationForm.jsx';
import Page404 from "./pages/page404/Page404.jsx";
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeContainer />
  },
  {
    path: '/registration',
    element: <RegistrationForm />, 
  },
  {
    path: '/user/movies',
    element: <UserMovies />,
  },
  {
    path: '/user/movie/:movieId',
    element: <MovieDetails />,
  },
  {
    path: '/create/movie',
    element: <MovieForm />,
  },
  {
    path: '/edit/movie/:movieId',
    element: <MovieForm />,
  },
  {
    path: '*',
    element: <Page404 />
  },
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


