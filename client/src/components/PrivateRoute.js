
import { Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
function PrivateRoute({ children }) {
    
    const navigate = useNavigate()
    const {publicKey, jwt_token, isLoggedIn} = useSelector((state) => state.auth)

    if (!isLoggedIn && !jwt_token) {
        return navigate('/');
    } else {
        return children
    }
}

export default PrivateRoute