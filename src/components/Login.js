import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""})
    let history = useNavigate()

    const handelSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlYjc2YjE5ZDAxZDI5MGYxOWE2ZWU2In0sImlhdCI6MTY5MzE1Mjk1MX0.lXxsr7ULxb7hmIdt0mhGvWtUp_ZbQ-HAoLaEYRN_8q8"
            },body: JSON.stringify({ email : credentials.email, password:credentials.password}),
        });
        const json = await response.json()
        console.log(json)
        if (json.success){
            //save the auth-token and redirect
            localStorage.setItem('token',json.authtoken)
            history('/')
            props.showAlert(' Logged in Successfully','success')
        }else{
            props.showAlert('Invalid Credentials','danger')
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form  onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} id="email" onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" onChange={onChange} name='password' />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
