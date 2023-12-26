import { useRecoilValue } from "recoil";
import { Navigate, Outlet } from "react-router-dom";
import { userDetails } from "../recoil/selectors/userSelectors.js";

export default function PrivateRoute() {
   const user = useRecoilValue(userDetails);

    return user ? <Outlet/> : <Navigate to='/sign-in'/>
};