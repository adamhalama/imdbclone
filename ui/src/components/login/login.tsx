import styled from "@emotion/styled";
import React, { useContext, useState } from "react";
import Input from "../inputs/input";
import { Column, Row } from "../../styled/flex";
import Link from "../link/link";
import Button from "../inputs/button";
import { UserContext } from "../user/user.context";
import useLogin from "./use-login";
import useNotify from "../notification/use-notify";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate()
    const [_, setUser] = useContext(UserContext)
    
    const notify = useNotify()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const login = useLogin(email, password)

    const onLogin = async () => {
        try {
            const { data, error } = await login()
            if (error) {
                notify(error, 'error')
                return
            }
            const { username, email, token, toplist, friends } = data
            notify('Successfully signed in.', 'success')
            setUser({ loggedIn: true, username, email, token, toplist, friends })
            navigate('/account')
        } catch (e) {
            console.log(e)
            notify('An unexpected error occurred', 'error'); console.log(e);
        }
    }

    return <LoginContainer>
        <Input type='email' value={email} onChange={(email: string) => setEmail(email)} label="Email" />
        <Input type='password' value={password} onChange={(password: string) => setPassword(password)} label="Password"/>
        <Button label="Sign In" onClick={async () => await onLogin()}/>
        <Row>
            <span>Don't have an account? {<Link to="/register" allowHighlight={false}>Register</Link>}</span>
        </Row>
        
        
        
    </LoginContainer>
}

export const LoginContainer = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height: 80%;
gap: 20px;
align-items: center;
justify-content: center;
padding: 20px;
`



export default Login