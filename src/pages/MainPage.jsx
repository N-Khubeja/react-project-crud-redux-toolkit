import { useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { deleteuser, getuser, getusers } from "../store/users/users.thunk"
import { changetheme, defaultvalues } from "../store/users/users.slice"


const MainPage = () => {
    const {users,sendLoading,sendError,toggle} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(() => {
        document.body.style.backgroundColor = toggle ? 'red' : 'white'
    },[toggle])

    useEffect(() => {
        dispatch(getusers())
    },[dispatch])

   const userdelete = async (id) => {
    try {
        await dispatch(deleteuser(id)).unwrap()
        dispatch(getusers())
    } catch (error) {
        console.log('failed',error)
    }
   }

   const forupdate = (id,firstname,lastname) =>{
        dispatch(getuser(id))
        .then(() => dispatch(defaultvalues({firstname,lastname})))
        .then(() => navigate(`/users/${id}`))
        

   }

    
    if(sendLoading) return <p>...loading</p>
    if(sendError) return <p>{sendError}</p>
    return (
        <div className="users">
            <button onClick={() => dispatch(changetheme(!toggle))}>change theme</button>
            <Link to={'/create'}>create</Link>
            {users.map((user) => (
                <div className="user" key={user._uuid}>
                    <h3>FIRSTNAME:{user.firstname}</h3>
                    <h3>LASTNAME:{user.lastname}</h3>
                    <button onClick={() => userdelete(user._uuid)}>DELETE</button>
                    <button onClick={() => forupdate(user._uuid,user.firstname,user.lastname)}>update</button>
                </div>
            ))}
            
        </div>
    )
}

export default MainPage