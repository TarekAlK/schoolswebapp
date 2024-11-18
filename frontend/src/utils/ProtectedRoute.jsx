import { useNavigate } from "react-router-dom";
//import { useAuth } from "./AuthContext";
import { useEffect } from "react";

export default function ProtectedRoute({children, permission}) {
    //const [user, setUser] = useAuth()
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
    
    useEffect(() => {
        //if(Object.keys(user).length === 0) {
        // if(user.role !== 'admin') {
        //     navigate('/login', {replace: true})
        // }
        if(user === null) {
            navigate('/login', {replace: true})
        } else if(user.role !== permission) {
            navigate('/notallowed', {replace: true})
        }
    }, [navigate, user])
    
    return children
}