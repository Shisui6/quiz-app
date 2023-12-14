// Import necessary dependencies
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import App from './App.tsx'
import ErrorPage from './error-page.tsx';
import './index.css'
import Home from './components/Home/Home.tsx';
import Quiz from './components/Quiz/Quiz.tsx';
import Result from './components/Result/Result.tsx';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';


// Create a browser router with routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'quiz',
        element: <Quiz />
      },
      {
        path: 'result',
        element: <Result />
      }
    ]
  },
]);

// Render the application
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </MantineProvider>
  </React.StrictMode>,
)
