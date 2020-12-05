import React, { useRef, useState } from 'react'
import Error from '../components/Error';
import { Link } from 'react-router-dom'
import logoNoBg from '../images/logoNoBg.svg';
function Login() {
    const [errors, setErrors] = useState("");
    const inputEmail = useRef();
    const inputPassword = useRef();
    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/v1/auth/login", {
                method: "POST",
                body: JSON.stringify({
                    email: inputEmail.current.value,
                    password: inputPassword.current.value
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            const data = await response.json();
            console.log(data.success)
            if (data.success) {
                setErrors("");
                console.log("Logging in...")
            }
            else {
                setErrors(data.error);
            }

            console.log(errors)
        } catch (err) {
            console.log(err)
        }

    }
    // const createWrittenWorkHandler = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch("api/v1/auth/me")
    //         const data = await response.json();
    //         console.log(data)
    //         if (data.success) {
    //             setErrors("");
    //         }
    //         else {
    //             setErrors(data.error);
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
    return (
        <div className="login">
            <img src={logoNoBg} alt="Main Logo" />
            <form className="login-form">
                <h1>Login To Your Writer’s Cafe Account</h1>
                <Error error={errors} />
                <div className="searchInput">
                    <input ref={inputEmail} type="text" name="email" required />
                    <label className="label-name"> <span className="content-name">
                        Email
                    </span>
                    </label>
                </div>
                <div className="searchInput">
                    <input ref={inputPassword} type="password" name="password" required />
                    <label className="label-name"> <span className="content-name">
                        Password
                    </span>
                    </label>
                </div>
                <div className="links">Forgot Password?</div>
                <button onClick={loginHandler} className="button">Login</button>
                {/* <button onClick={createWrittenWorkHandler} className="button">Login</button> */}
                <div className="links borderTop">Don't Have An Accout? <b>
                    <Link to="/register">Sign Up</Link>
                </b></div>
            </form>
        </div>
    )
}


export default Login