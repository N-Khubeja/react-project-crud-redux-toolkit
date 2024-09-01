import { useDispatch, useSelector } from "react-redux"
import UserForm from "../components/UserForm"
import { useParams } from "react-router-dom"
import { changetheme } from "../store/users/users.slice"
import { useEffect} from "react"


const UpdatePage = () => {
    const {sendLoading,sendError,defaultfirstname,defaultlastname,toggle} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const {userid} = useParams()
    

    useEffect(() => {
        document.body.style.backgroundColor = toggle ? 'red' : 'white'
    },[toggle])

    if(sendLoading) return <p>...loading</p>
    if(sendError) return <p>{sendError}</p>
    return (
        <div>
            <UserForm firstname={defaultfirstname} lastname={defaultlastname} id={userid}/>
            <button onClick={() => dispatch(changetheme(!toggle))}>change theme</button>
        </div>
    )
}

export default UpdatePage