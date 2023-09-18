import React, { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const [name, setName] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const navigate = useNavigate()

    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth)
          navigate('/')
    })
    const collectData = async () => {
        console.log(name,email,password)
        let result = await fetch("http://localhost:5001/register", {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                "content-Type": "application/json"
            }
        })
        result = await result.json()
        if(result){
            localStorage.setItem(result)
            navigate("/")
        }

    }

    return (
        <>
            <div className='mt-5 bder'>
                <h1>Register</h1>
                <input
                    type="text"
                    placeholder='Enter name'
                    onChange={(e) => setName(e.target.value)}
                    value={name}

                />
                <br />
                <br />
                <input
                    type="email"
                    placeholder='Enter email'
                    onChange={(e) => setemail(e.target.value)}
                    value={email}
                />
                <br />
                <br />
                <input
                    type="password"
                    placeholder='Enter password'
                    onChange={(e) => setpassword(e.target.value)}
                    value={password}
                />
                <br /><br />
                <button 
                type='submit' 
                onClick={collectData}
                className='btn btn-outline-success'>Signup</button>
            </div>
        </>
    )
}

export default Signup;