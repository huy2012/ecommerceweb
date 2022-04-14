import React, {useState , useEffect} from 'react'
import { getDatabase, ref, set, onValue , push} from "firebase/database";
import {useSelector, useDispatch} from "react-redux";
import { List} from "antd";

import app from '../Firebase/firebase'
import {CloseOutlined, MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {decrementAmountCardProduct, incrementAmountCardProduct} from "../../redux/reducer";
import {getUniqueListBy} from '../../tool/tool';

const CartHistory = () => {

  const state = useSelector((state) => state.ecommerce);
  const dispatch = useDispatch();

  const [listProductCard , setListProductCard] = useState([]);

  useEffect(() => {
    setListProductCard(JSON.parse(localStorage.getItem("listProductCard")) ?? []);

  } , []);

  const cardHistory = (item , index) => {
      return(
          <div key={index}>
            <List.Item
                key={index}

                extra={
                  <img
                      width={180}
                      alt="logo"
                      src={item.link_Image}
                  />
                }
            >
              <List.Item.Meta
                  avatar={
                    <div onClick={() => console.log("aaaaaaaa")}>
                      <a><CloseOutlined style={{color: "red"}}/></a>
                    </div>
                  }
                  title={<a style={{fontSize: "20px"}}>{item.name}</a>}
                  description={
                    <div>
                                                    <span style={{
                                                      fontSize: "18px",
                                                      color: "green"
                                                    }}>${item.totalPrice}</span>
                      <p>{item.des}</p>
                    </div>
                  }
              />

            </List.Item>
          </div>
      );
  };

  return(
      <div>
        {listProductCard.map((item, index) => {
          return(
              <div key={index}>
                <h1 key={index}> Lịch sử mua hàng vào {item.dateTimeCard}</h1>
                {item.arr.map((e, i)=>{
                  return cardHistory(e , i);
                })}
              </div>
          );
        })}
      </div>
  );
};

export default CartHistory;
