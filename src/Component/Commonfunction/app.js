import React from "react";
import Search from "../header/search/search";
import Body from "../body/body";

export const uiNavMobile = (dispatch , setNavMobile) => {
    return (
        <div className={'nav_mobile'}>
            <div>
                <img src={require('../../assets/Logo.jpg')}/>

                <div>
                    <img src={require('../../assets/Cart Button.png')}/>
                    <img src={require('../../assets/Combined Shape.png')}
                         onClick={() => dispatch(setNavMobile(false))}
                    />
                </div>
            </div>

            <div>
                <a>Home</a>
                <a>Shop</a>
                <a>Magazine</a>
            </div>
        </div>
    )
};

export const homeRouter = () => {
    const stt = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '>'];

    return (
        <div>
            <Search/>
            <Body/>

            <div className={'pages'}>
                {stt.map((item, index) => {
                    return (
                        <a key={index}>{item}</a>
                    )
                })}
            </div>
        </div>
    )
};
