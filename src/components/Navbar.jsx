import { NavLink } from "react-router-dom"
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="flex flex-row gap-4 place-content-evenly navbar">  

        <NavLink to={"/"} className='navlink '>Home</NavLink>
        <NavLink to={"/pastes"} className='navlink'>Pastes</NavLink>

    </div>
  )
}

export default Navbar
