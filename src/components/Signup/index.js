import { useState } from 'react';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => { 

    const navigate = useNavigate();

    const [inputErrMsg, setInputErrMsg] = useState("");

    const [form, setForm] = useState({username: '', email: '', password: ''});


    const handleOnchangeInput = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }


    const handleOnsubmit = async (event) => {
        event.preventDefault();

        const {username, email, password} = form;

        if (username.length > 0 && email.length > 0 && password.length > 0) {
            const url = 'http://localhost:8080/signup'
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
                setForm({username: '', email: '', password: ''})
                navigate('/login');
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
        <div className='signup-page__bg-container'>
            <form className='signup-page__form-element' onSubmit={handleOnsubmit}>
                <label htmlFor='username' className='signup-page__labels-elements'>Username</label>
                <input id='username' type='text' className='signup-page__input-elements' placeholder='Enter Username' name='username' onChange={handleOnchangeInput}/>
                
                <label htmlFor='email' className='signup-page__labels-elements'>Email</label>
                <input id='email' type='email' className='signup-page__input-elements' placeholder='Enter Email' name='email' onChange={handleOnchangeInput}/>
                
                <label htmlFor='password' className='signup-page__labels-elements'>Password</label>
                <input id='password' type='password' className='signup-page__input-elements' placeholder='Enter Password' name='password' onChange={handleOnchangeInput}/>


                {inputErrMsg !== "" && <p className='signup-page__input-err-msg'>{inputErrMsg}</p>}

                <button type='submit' className='signup-page__submit-btn'>
                    Submit
                </button>
            </form>

            <p>
                If already registered, click {" "}
                <Link className='signup-page__link-element' to={"/login"}>
                    here 
                </Link>
            </p>
        </div>
    )
}


export default Signup;