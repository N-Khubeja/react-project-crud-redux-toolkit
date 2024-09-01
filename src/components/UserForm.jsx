import {  useNavigate } from "react-router-dom"
import {  senduser } from "../store/users/users.thunk"
import { useRef } from "react"
import { useDispatch } from "react-redux"

const UserForm = ({firstname,lastname,id}) => {
    const  firstnameref = useRef()
    const  lastnameref = useRef()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const update = async (e) => {
        e.preventDefault()
        let newfirstname = firstnameref.current.value
        let newlastname = lastnameref.current.value
        try {
            await dispatch(senduser({ id,body:{firstname:newfirstname,lastname:newlastname}})).unwrap()
            .then(() => navigate('/'))
        } catch (error) {
            console.error('Update failed', error)
        }
        
    }
    
    return (
        
        <form onSubmit={update} >
            <input type="text" defaultValue={firstname} ref={firstnameref} />
            <input type="text" defaultValue={lastname} ref={lastnameref} />
            <button type="submit">update</button>
        </form>
    )
}

export default UserForm