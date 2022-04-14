import React,{useState} from "react";
import { useSelector, useDispatch } from "react-redux";

import './search.css'
import {searchProduct, getAllProduct} from '../../../redux/reducer'

export default function Search(){

    // const state = useSelector((state) => state.ecommerce);
    const dispatch = useDispatch();

    return(
        <div className={'search'} >
            <div>
                <img src={require('../../../assets/Search.jpg')} className={'img_search'} />
            </div>

            <div className={'search_input'} >
                <input type={'text'} placeholder={'living room'}  onChange={(e)=> {
                    const text = e.target.value;

                    if (text === ''){
                        dispatch(getAllProduct());
                    } else {
                        dispatch(searchProduct(text));
                    }

                }} />

                <div>
                    <span>Powered by Sajari.com</span>
                    <img src={require('../../../assets/Sajari Logo.jpg')}/>
                </div>
            </div>

            <select className={'select_item'} >
                <option value={'Best match'} >Best match</option>
            </select>

            <div className={'search_mobile'} >

                <img src={require('../../../assets/Search (1).jpg')} />
                <div>
                    <input type={'text'} placeholder={'living room'} />
                </div>

                <div>
                    <span>Powered by Sajari.com</span>
                    <img src={require('../../../assets/Sajari Logo.jpg')}/>
                </div>
            </div>
        </div>
    )
}
