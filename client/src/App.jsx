import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/LoginPage/Login';
import Registration from "./pages/RegistrationPage/Registration";
import UserList from "./pages/UserListPage/UserList";
import './App.css'
import PageNotFound from "./pages/ErrorPage/PageNotFound";


export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/registration" element={<Registration/>}></Route>
                <Route path="/secure/user/list" element={<UserList/>}></Route>
                <Route path="/error" element={<PageNotFound/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}