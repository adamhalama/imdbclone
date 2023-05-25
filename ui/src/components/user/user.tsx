import React, { useContext, useState } from "react";
import { UserContext } from "./user.context";
import styled from "@emotion/styled";
import { Column, Row } from "../../styled/flex";
import Login from "../login/login";
import Button from "../inputs/button";
import useNotify from "../notification/use-notify";
import useDeleteAccount from "./use-delete-account";
import { useNavigate } from "react-router-dom";
import Friends from "./friends";
import Input from "../inputs/input";
import useAddFriend from "./use-add-friend";
import useChangePassword from "./use-change-password";
import useChangeUsername from "./use-change-username";

const User = () => {
    const [user, setUser] = useContext(UserContext)
    const notify = useNotify()
    const navigate = useNavigate()
    const [addFriend, setAddFriend] = useState('')

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const [newUsername, setNewUsername] = useState('')
    
    const onSignOut = () => {
        setUser({ loggedIn: false })
        notify('Successfully signed out.', 'success')
    }

    const deleteAccount = useDeleteAccount()
    const callAddFriend = useAddFriend()
    const changePassword = useChangePassword()
    const changeUsername = useChangeUsername()
    
    if (user.loggedIn) {
        const { username, email, friends, toplist } = user

        const onDelete = async () => {
            try {
                const { error } = await deleteAccount(email)
                if (error) {
                    notify(error, 'error')
                    return
                }
                setUser({ loggedIn: false })
                navigate('/')
                notify('Account deleted successfully.', 'success')
            } catch (e) {
                notify('An unexpected error occurred.', 'error')
            }
        }

        const onAddFriend = async (added: string) => {
            try {
                const { data, error } = await callAddFriend(username, added)
                if (error) {
                    notify(error, 'error')
                    return
                }
                console.log(data, error)
                if (!data) notify('An unexpected error occurred', 'error');
                notify('Friend added successfully', 'success')
                setUser({ ...user, friends: data })
            } catch (e) {
                notify('An unexpected error occurred', 'error'); console.log(e);
            }
        }

  
        const onChangePassword = async (email: string, currentPassword: string, newPassword: string, confirmNewPassword: string) => {
            try {
                const { error } = await changePassword(email, currentPassword, newPassword, confirmNewPassword)
                if (error) {
                    notify(error, 'error')
                    return
                }
                notify('Password changed successfully, please sign in again.')
                setUser({ loggedIn: false })
                navigate('/login')
            } catch (e) {
                notify('An unexpected error occurred', 'error'); console.log(e);
            }
        }

        const onChangeUsername = async (email: string, username: string) => {
            try {
                const { error } = await changeUsername(email, username)
                if (error) {
                    notify(error, 'error')
                    return
                }
                notify('Username changed successfully, please sign in again.')
                setUser({ loggedIn: false })
                navigate('/login')
            } catch (e) {
                notify('An unexpected error occurred', 'error'); console.log(e);
            }
        }

        return <Container>
        <Details>
            <span>Email: {email}</span>
            <span>Username: {username}</span>
            <span>Friends:</span>
            <Friends friends={friends} />
        </Details>
        <Buttons>
            <Row>
                <Button label="Sign out" onClick={onSignOut}/>
                <Button label="Delete account" onClick={async () => await onDelete()} />
            </Row>
            <Spacer/>
            <Input width="200px" value={addFriend} onChange={(friend: string) => setAddFriend(friend)} />
            <Button label="Add Friend" onClick={async () => await onAddFriend(addFriend)} />
            <Spacer/>
            <Input width="200px" placeholder="Current Password" value={currentPassword} onChange={(currentPassword: string) => setCurrentPassword(currentPassword)} type='password' />
            <Input width="200px" placeholder="New Password" value={newPassword} onChange={(newPassword: string) => setNewPassword(newPassword)} type='password' />
            <Input width="200px" placeholder="Confirm New Password" value={confirmNewPassword} onChange={(confirmNewPassword: string) => setConfirmNewPassword(confirmNewPassword)} type='password' />
            <Button label="Change Password" onClick={async () => await onChangePassword(email, currentPassword, newPassword, confirmNewPassword)} />
            <Spacer/>
            <Input width="200px" placeholder="New Username" value={newUsername} onChange={(newUsername: string) => setNewUsername(newUsername)}/>
            <Button label="Change Username" onClick={async () => await onChangeUsername(email, newUsername)} />
        </Buttons>
    </Container>
    } else {
        return <Login />
    }


}

const Container = styled(Row)`
width: 100%;
height: 80%;
justify-content: space-between;
align-items: top;
padding: 30px;
`

const Details = styled(Column)`
gap: 20px;
`

const Buttons = styled(Column)`
gap: 10px;
justify-content: top;
align-items: center;
`

const Spacer = styled.div`
height: 10px;
`

export default User