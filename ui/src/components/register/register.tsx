import React, { useContext, useState } from "react";
import { LoginContainer } from "../login/login";
import Input from "../inputs/input";
import { Row } from "../../styled/flex";
import Link from "../link/link";
import Button from "../inputs/button";
import { UserContext } from "../user/user.context";
import useRegister from "./use-register";
import useNotify from "../notification/use-notify";
import { useNavigate } from "react-router-dom";
import User from "../user/user";

const Register = () => {
    
    const navigate = useNavigate()
    const [user, _] = useContext(UserContext)
    
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const register = useRegister(email, username, password, confirmPassword)

    const notify = useNotify()
    

    const onRegister = async () => {
        try {
        const { error } = await register()
        if (error) {
            notify(error, 'error')
            return
        }
        notify('Registration successful, you can now sign in.', 'success')
        navigate('/login')
        } catch (e) {
            console.log(e)
            notify('An unexpected error occurred', 'error')
        }
    }
    
    return <LoginContainer>
        <Input value={email} type={'email'} onChange={(email: string) => setEmail(email)} label="Email" />
        <Input value={username} onChange={(username: string) => setUsername(username)} label="Username" />
        <Input value={password} type={'password'} onChange={(password: string) => setPassword(password)} label="Password"/>
        <Input value={confirmPassword} type={'password'} onChange={(confirmPassword: string) => setConfirmPassword(confirmPassword)} label="Confirm Password" />
        
        <Button label="Register" onClick={async () => await onRegister()} />
        <Row>
            <span>Already have an account? {<Link to="/login" allowHighlight={false}>Sign In</Link>}</span>
        </Row>
        
        
        
    </LoginContainer>
}

export default Register