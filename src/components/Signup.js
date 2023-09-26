import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    let history = useNavigate()
    const handelSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password} = credentials
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },body: JSON.stringify({name,email,password}),
        });
        const json = await response.json()
        console.log(json)
        if (json.success){
            //save the auth-token and redirect
            localStorage.setItem('token',json.authtoken)
            history('/')
            props.showAlert('Account Created Successfully','success')
        }else{
            props.showAlert(' Invalid Credentials','danger')
        }
    }

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container'>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control"name='name' id="name"onChange={onchange} aria-describedby="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="email"onChange={onchange} aria-describedby="emailHelp" />
                    <div id="email" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="password"onChange={onchange} minLength={5}  required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name='cpassword' id="cpassword"onChange={onchange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
