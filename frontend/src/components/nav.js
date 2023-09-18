import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Nav = () => {

    const auth = localStorage.getItem("user")
    const navigate = useNavigate()
    const logOut = () => {
        localStorage.clear()
        navigate('/signup')

    }


    return (
        <>
            <div className='nav'>

                <img src="https://www.blogtyrant.com/wp-content/uploads/2019/07/how-to-start-an-online-store-min.png" alt="logo" id='logo' />
                {auth ?
                    <>
                        <li><Link to="/">Products</Link></li>
                        <li><Link to="/add">Add Products</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link onClick={logOut} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>

                    </> :
                    <>
                        <ul className='nav nav-end'>
                            <li><Link to="/signup">Signup</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </ul>


                    </>
                }
            </div>


        </>
    )
}

export default Nav