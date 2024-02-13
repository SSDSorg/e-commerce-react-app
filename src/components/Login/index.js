import { useState } from 'react';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"

const Login = () => { 

    const navigate = useNavigate();

    const [inputErrMsg, setInputErrMsg] = useState("");

    const [form, setForm] = useState({ email: '', password: ''});


    const handleOnchangeInput = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }


    const handleOnsubmit = async (event) => {
        event.preventDefault();

        const { email, password} = form;

        if (email.length > 0 && password.length > 0) {
            const url = 'http://localhost:8080/login'
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            }

            const response = await fetch(url, options);
            const data = await response.json();
            
            if (!response.ok) {
                alert(data.err_msg);
            }
            else {
                const {userDetails, jwtToken} = data;
                const {userId, username, email} = userDetails;

                localStorage.setItem('userId', userId);
                localStorage.setItem('username', username);
                localStorage.setItem('email', email);

                Cookies.set('jwtToken', jwtToken, {expires: 30})

                setForm({email: '', password: ''})
                navigate('/');
            }
        }
        else {
            setInputErrMsg("*Enter all feilds");

            setTimeout(() => {
                setInputErrMsg("");
            }, 1000)
        }
    }



    return (
        <div className='login-page__bg-container'>
            <form className='login-page__form-element' onSubmit={handleOnsubmit}>
                <label htmlFor='email' className='login-page__labels-elements'>Email</label>
                <input id='email' type='email' className='login-page__input-elements' placeholder='Enter Email' name='email' onChange={handleOnchangeInput}/>
                
                <label htmlFor='password' className='login-page__labels-elements'>Password</label>
                <input id='password' type='password' className='login-page__input-elements' placeholder='Enter Password' name='password' onChange={handleOnchangeInput}/>


                {inputErrMsg !== "" && <p className='login-page__input-err-msg'>{inputErrMsg}</p>}

                <button type='submit' className='login-page__submit-btn'>
                    Submit
                </button>
            </form>

            <p>
                If not registered, please click {" "}
                <Link className='login-page__link-element' to={"/signup"}>
                    here 
                </Link>
            </p>
        </div>
    )
}


export default Login;