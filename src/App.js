import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Routes, Route} from "react-router-dom";

import './App.css';
import Nav_menu from './Component/header/nav/nav_menu'
import {setNavMobile} from './redux/reducer';
import Profile from "./pages/Profile";
import * as commonApp from './Component/Commonfunction/app'
import DetailProduct from "./pages/DetailProduct/DetailProduct";

function App() {

    const state = useSelector((state) => state.ecommerce);
    const dispatch = useDispatch();


    return (
        <div className="App">

            {state.navMobile ? commonApp.uiNavMobile(dispatch , setNavMobile) : ''}
            <Nav_menu/>


            <Routes>
                <Route path={"/"} element={commonApp.homeRouter()}/>
                <Route path={"/profile"} element={<Profile />}/>
                <Route path={"/detailProduct"} element={<DetailProduct />}/>
            </Routes>

        </div>
    );
}

export default App;
