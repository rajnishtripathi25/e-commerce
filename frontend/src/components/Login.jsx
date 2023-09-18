import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth)
            navigate('/')
    })
    const handleLogin = async () => {
        let result = await fetch("http://localhost:5001/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }

        })
        result = await result.json()

        if (result.name) {
            localStorage.setItem("user", JSON.stringify(result))
            navigate('/')
        }
        else {
            alert("No user found")
        }
    }
    return (
        <>
            <div className='form mt-5 bder'>
                <h1>Login Page</h1>
                <div>
                    <input
                        type="email"
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name=""
                        id=""
                        value={password}
                        placeholder='Enter your password'
                        onChange={(e) => setpassword(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="button"
                        value="Submit"
                        onClick={handleLogin}
                        className='btn btn-outline-success'
                    />
                </div>
            </div>
        </>
    )
}

export default Login 