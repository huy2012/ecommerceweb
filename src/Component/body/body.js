import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import {
    getAllProduct, filterProduct, setFilterMobile,
    incrementAmountProduct, addCardProducts
} from '../../redux/reducer'
import './body.css'

export default function Body() {

    const state = useSelector((state) => state.ecommerce);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllProduct());
    }, []);

    const handleSelect = (data) => {

        if (data === 'Category') {
            dispatch(getAllProduct());
        } else {
            dispatch(filterProduct(data));
        }

    };

    const uiFilter = () => (
        <div className={'filter'}>
            <p>Filter by</p>
            <select>
                <option value={'Collection'}>Collection</option>
            </select>

            <select>
                <option value={'Color'}>Color</option>
            </select>

            <select onChange={(event) => handleSelect(event.target.value)}>
                <option value={'Category'}>Category</option>
                <option value={'living room'}>living room</option>
                <option value={'bed room'}>bed room</option>
                <option value={'other'}>other</option>
            </select>

            <p>Price Range</p>

            <div className={'filter_range'}>
                <img src={require('../../assets/Knob - Left.jpg')}/>
                <img src={require('../../assets/Line.jpg')}/>
                <img src={require('../../assets/Knob - Right.jpg')}/>
            </div>

            <div className={'filter_price'}>
                <span>$0</span>
                <span>$10,000+</span>
            </div>
        </div>
    );

    const handleClickcard = (item) => {
      // dispatch(incrementAmountProduct());
      dispatch(addCardProducts({...item , amount : 1 , totalPrice : item.price}));
    };

    return (
        <div className={'body'}>

            <div className={'body_mobile_select'}>
                <select>
                    <option value={'Best match'}>Best match</option>
                </select>

                <select onClick={() => dispatch(setFilterMobile(state.filterMobile ? false : true))}>
                    <option value={'Filters'}>Filters</option>
                </select>
            </div>

            {state.filterMobile ? uiFilter() : ''}

            {state.handlingListProduct.map((item, index) => {
                return (
                    <div key={index} className={'card'} onClick={()=> navigate("/detailProduct" , {state : item})}>
                        <img src={item.link_Image}/>

                        <div className={'product'}>
                            <div>
                                <span>{item.name}</span>
                                <span>{item.des}</span>
                                <img src={require('../../assets/Rating.jpg')}/>
                            </div>

                            <div>
                                <span>${item.price}</span>
                                <a>
                                    <img src={require('../../assets/Add to Cart Button.jpg')}
                                         onClick={()=> handleClickcard(item)}/>
                                </a>
                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}
