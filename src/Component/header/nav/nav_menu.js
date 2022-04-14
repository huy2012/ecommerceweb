import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
    Modal, Tabs, message, Button, Badge, BackTop,
    Card, List, Avatar, Space, Typography
} from 'antd';
import "antd/dist/antd.css";
import {UpOutlined, CloseOutlined, MinusOutlined, PlusOutlined} from '@ant-design/icons'
import {getAuth, signOut, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import {Link} from "react-router-dom";
import { getDatabase, ref, set, onValue , push} from "firebase/database";

import './nav_menu.css'

import './nav_menu_responsive.css'
import Logo from '../../../assets/Logo.jpg'
import {
    setNavMobile, showModalLogSign, hideModalLogSign, userLogOut,
    showModalCard, hideModalCard, incrementAmountCardProduct,
    decrementAmountCardProduct, setTabsKey, deleteCardProduct, userLoginEmail
} from '../../../redux/reducer'
import Modal_Tabs_logiin from "./Modal_Tabs_logiin";
import Modal_Tabs_SignUp from "./Modal_Tabs_SignUp";
import app from '../../Firebase/firebase';
function NavMenu() {

    const database = getDatabase(app);

    const {TabPane} = Tabs;
    const {Meta} = Card;
    const {Title} = Typography;
    const ButtonGroup = Button.Group;

    const state = useSelector((state) => state.ecommerce);
    const dispatch = useDispatch();

    useEffect(() => {
        const auth = getAuth(app);
        // console.log(auth);

        const tk = localStorage.getItem("tk");
        const mk = localStorage.getItem("mk");

        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                // ...
                dispatch(userLoginEmail({avatar : user.photoURL , email : user.email}));
            } else {
                // User is signed out
                // ...
            }
        });

        if (state.userLogin === false && tk && mk){
            signInWithEmailAndPassword(auth, tk, mk)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    // ...

                    dispatch(userLoginEmail({avatar : user.photoURL , email : user.email}));
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    message.error(errorMessage);
                });
        }
    }, []);

    const showModal = () => {
        dispatch(showModalLogSign());
    };

    const handleOk = () => {
        dispatch(hideModalLogSign());
    };

    const handleCancel = () => {
        dispatch(hideModalLogSign());
    };

    const changeTabs = (key) => {
        // console.log("-----------------------",state.tabsKey);
        dispatch(setTabsKey(key));
    };

    const userLogin = () => {

        return (
            <a onClick={() => showModal()}>LOGIN</a>
        )
    };

    const userInfo = () => {
        return (
            <div className={'users'}>
                {state.user.avatar === null ?
                    <img src={'https://www.kindpng.com/picc/m/22-223910_circle-user-png-icon-transparent-png.png'}/> :
                    <img src={state.user.avatar}/>}

                <Link to={"/profile"}>{state.user.email}</Link>

                <Button type="primary" danger ghost onClick={() => handleLogOut()}>
                    Log Out
                </Button>
            </div>
        )
    };

    const handleLogOut = () => {
        const auth = getAuth(app);
        signOut(auth).then(() => {
            // Sign-out successful.
            message.success("Sign-out successful !");
            localStorage.removeItem("tk");
            localStorage.removeItem("mk");
            dispatch(userLogOut());
        }).catch((error) => {
            // An error happened.
            message.error(error.message);
        });
    };

    const style = {
        height: 40,
        width: 40,
        lineHeight: '40px',
        borderRadius: 4,
        backgroundColor: '#1088e9',
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
    };

    const hanldePayment =async () => {
        if (state.userLogin) {

            const today = new Date();

            let listProductCard = JSON.parse(localStorage.getItem("listProductCard"));

            if (! listProductCard){
                listProductCard = [];
            }

            listProductCard.push({
                arr : state.cardProducts,
                dateTimeCard : `${today.getHours()}:${today.getMinutes()} -- ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`
            });

            localStorage.setItem("listProductCard" , JSON.stringify(listProductCard));

            message.success("Thanh Toán ... !");
            dispatch(hideModalCard());

        } else {
            dispatch(hideModalCard());
            dispatch((showModalLogSign()));
        }
    };

    return (
        <div className={'header'}>

            <div className={'logo_menu'}>
                <img src={Logo} className={'img_logo'}/>
                <div>
                    <Link to={'/'}>HOME</Link>
                    <a href={''}>SHOP</a>
                    <a href={''}>Magazine</a>
                    <Link to={"/profile"}>Profile</Link>
                </div>
            </div>

            <div className={'card_login'}>
                <Badge count={state.cardProducts.length} showZero>
                    <a> <img src={require('../../../assets/Cart Button.jpg')}
                             onClick={() => dispatch(showModalCard())}/></a>
                </Badge>

                <Modal visible={state.modal_Card} footer={null} onCancel={() => dispatch(hideModalCard())}
                       width={700}>
                    <div>
                        <Title>Giỏ Hàng</Title>
                        {state.cardProducts.map((item, index) => {
                            return (
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
                                                <div onClick={() => dispatch(deleteCardProduct(index))}>
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

                                                    <ButtonGroup>
                                                        <Button
                                                            onClick={() => dispatch(decrementAmountCardProduct(index))}>
                                                            <MinusOutlined/>
                                                        </Button>
                                                        <Button>
                                                            {item.amount}
                                                        </Button>
                                                        <Button onClick={()=> dispatch(incrementAmountCardProduct(index))}>
                                                            <PlusOutlined/>
                                                        </Button>
                                                    </ButtonGroup>
                                                </div>
                                            }
                                        />

                                    </List.Item>
                                </div>
                            )
                        })}

                        <div style={{width: "100%", textAlign: "center"}}>
                            <Space align={"center"} direction={"vertical"}>
                                <h2> Tổng tiền : {state.priceTotal} </h2>
                                <Button type={"primary"} onClick={() => hanldePayment()}> Thanh Toán </Button>
                            </Space>
                        </div>

                        <BackTop>
                            <div style={style}><UpOutlined/></div>
                        </BackTop>
                    </div>

                </Modal>

                {state.userLogin ? userInfo() : userLogin()}

                <Modal visible={state.modal_log_signUP} onOk={handleOk} onCancel={handleCancel}
                       footer={false} keyboard={true}>
                    <Tabs activeKey={state.tabsKey} centered={true}
                          onTabClick={changeTabs}>
                        <TabPane tab="Đăng nhập" key="1">
                            <Modal_Tabs_logiin/>
                        </TabPane>
                        <TabPane tab="Đăng ký" key="2">
                            <Modal_Tabs_SignUp/>
                        </TabPane>
                    </Tabs>

                </Modal>
                <img src={require('../../../assets/Combined Shape.jpg')}
                     onClick={(e) => {
                         dispatch(setNavMobile(true));
                     }}
                />
            </div>

        </div>
    );
}

export default NavMenu;
