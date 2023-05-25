import React, { useContext, useState } from "react"
import { Movie } from "../../types"
import Button from "../inputs/button"
import Modal from "../modal/modal"
import { Row } from "../../styled/flex"
import { UserContext } from "./user.context"
import useRemoveFriend from "./use-remove-friend"
import useNotify from "../notification/use-notify"


type Props = {
    username: string
    toplist: Movie[]
}

const FriendComponent = ({ username, toplist }: Props) => {
    const [open, setOpen] = useState(false)
    const [user, setUser] = useContext(UserContext)
    const removeFriend = useRemoveFriend()
    const notify = useNotify()

    if (user.loggedIn) {

    const onRemoveFriend = async () => {
        try {
            const { data, error } = await removeFriend(user.username, username)
            if (error) {
                notify(error, 'error')
                return
            }
            if (!data) {
                notify('An unexpected error occurred', 'error');
                return
            }
            notify("Friend removed successfully", 'success')
            setUser({ ...user, friends: data })
        } catch (e) {
            notify('An unexpected error occurred', 'error'); console.log(e);
        }
        
    }

    return <>
    <Modal 
        open={open}
        setOpen={setOpen}
        title="Toplist"
        children={<></>}
    />
    <Row>
        <Button label={username} onClick={() => setOpen(true)}/>
        <Button label="Remove friend" onClick={async () => await onRemoveFriend()} />
    </Row>
    
    </>
    } return <></>
}


export default FriendComponent