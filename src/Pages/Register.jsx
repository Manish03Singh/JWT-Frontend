import React, { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'
import axios from 'axios'
import { useCookies } from "react-cookie";
import { register } from '../links';

const Register = () => {
  console.log('register component is called')
    const [cookies] = useCookies(["cookie-name"]);
    const navigate = useNavigate();
    useEffect(() => {
        if (cookies.jwt) {
        navigate("/");
        }
    }, [cookies, navigate]);

    const [credentials, SetCredentials] = useState({
        email : "",
        password : ""
    })
    const [reenter, setReneter] = useState("")

    const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      if(reenter !== credentials.password ){
        toast.error("Passwords don't match", {
          position: "bottom-right",
        });
      } else {
        const { data } = await axios.post(
          register,
          {
            ...credentials,
          },
          { withCredentials: true }
        );
        if (data) {
          if (data.errors) {
            const { email, password } = data.errors;
            if (email) generateError(email);
            else if (password) generateError(password);
          } else {
            navigate("/");
          }
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

    return (
        <div className='container'>
            <h2>Register Account</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' placeholder='abc@def.gih' 
                            onChange={(e) => SetCredentials({...credentials, [e.target.name] : e.target.value})}/>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' placeholder='********'
                            onChange={(e) => SetCredentials({...credentials, [e.target.name] : e.target.value})}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Re-enter Password</label>
                    <input type='password' name='reenter_password' placeholder='********'
                            onChange={(e) => setReneter(e.target.value)}
                    />
                </div>
                <button type='submit'>Submit</button>
                <span>
                    Already have an account? <Link to='/login'>Login</Link> 
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Register