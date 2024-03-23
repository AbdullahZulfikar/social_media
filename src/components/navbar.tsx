import { Link } from "react-router-dom"
import {auth} from "../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth"
import {signOut} from "firebase/auth"



export const Navbar = () => {
    const [user] = useAuthState(auth)

    const signUserOut = async() => {
        alert("Are you sure?")
        await signOut(auth);
    }
    return (
        <div className="navbar">
            <div className="links">
                <Link to="/">Home</Link>
                {!user ? <Link to="/login">Login</Link> : <Link to="/createpost">create post</Link>}
                
            </div>
          
           <div className="user">
                <p>{user?.displayName}</p>
                {user && <img src={user?.photoURL || ""} width="20" height="20"/> }
                {user && <button onClick={signUserOut}>Signout</button>}
           </div>
           
        </div>
    )
}