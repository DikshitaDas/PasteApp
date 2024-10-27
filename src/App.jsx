import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './components/Home';
import Pastes from './components/Pastes';
import ViewPaste from './components/ViewPaste';
import Navbar from './components/Navbar';


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: 
      <div>
        <Navbar/>
        <Home/>
      </div>
    },
    {
      path: "/pastes",
      element: 
      <div>
        <Navbar/>
        <Pastes/>
      </div>
    },
    {
      path: "/pastes/:id",
      element: 
      <div>
        <Navbar/>
        <ViewPaste/>
      </div>
    }
  ]
);
function App() {

  return (
    <>
      <RouterProvider router={router}/>

    </>
  )
}

export default App
