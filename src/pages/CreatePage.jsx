import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { sendusers } from "../store/users/users.thunk"
import { changetheme } from "../store/users/users.slice"


const CreatePage = () => {
  const  firstnameref = useRef()
  const  lastnameref = useRef()
  const dispatch = useDispatch()
  const {sendLoading,sendError,toggle} = useSelector(state => state.users)
  const navigate = useNavigate()

    const onsubmit = async (e) => {
        e.preventDefault()
        let firstname = firstnameref.current.value
        let lastname = lastnameref.current.value

        try {
            await  dispatch(sendusers([{firstname,lastname}])).unwrap()
            navigate('/')
        } catch (error) {
            console.log('errror',error)
        }
        firstname = ''
        lastname = ''
    }
    
    useEffect(() => {
        document.body.style.backgroundColor = toggle ? 'red' : 'white'
    },[toggle])

    

    if(sendLoading) return <p>...loading</p>
    if(sendError) return <p>{sendError}</p>
    return(
        <div>
            <Link to={'/'}>main</Link>
            <button onClick={() => dispatch(changetheme(!toggle))}>change theme</button>
            <form onSubmit={onsubmit}>
                <input type="text" placeholder="FirstName" ref={firstnameref}/>
                <input type="text" placeholder="LastName" ref={lastnameref}/>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}


export default CreatePage