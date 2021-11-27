import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Workout from './routes/Workout'
import { ChakraProvider, Container } from '@chakra-ui/react';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Container m="auto" p="0" maxW="container.lg" centerContent>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/:tab" element={<App />}></Route>
          <Route path="workouts/:id/:pageId" element={<Workout />}></Route>
        </Routes>
        </BrowserRouter>
      </Container>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
