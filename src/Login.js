import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './firebase'
import './Login.css'
import { actionTypes } from './Reducer'
import { useStateValue } from './StateProvider'

function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider).then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        })
        .catch((error) => alert(error.message));
    }




    return (
        <div className='login'>
            <div className='login_container'>
                <img src='https://www.flaticon.com/svg/vstatic/svg/4144/4144845.svg?token=exp=1614612454~hmac=6a8d0191973d777edad83093a289b057'
                alt='icon'/>
                <div className='login_text'>
                    <h1>Sign In!</h1>
                </div>

                <Button type='submit' onClick={signIn}>
                    Sign In with Google
                </Button>
            </div>
            
        </div>
    )
}

export default Login
