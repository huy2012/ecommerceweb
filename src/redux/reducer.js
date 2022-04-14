import {createSlice} from '@reduxjs/toolkit'

import {getUniqueListBy} from '../tool/tool';

export const ecommerceSlice = createSlice({
    name: 'ecommerce',
    initialState: {
        value: 0,
        navMobile: false,
        filterMobile: true,
        modal_log_signUP: false,
        modal_Card: false,
        userLogin: false,
        user: {
            avatar: '',
            email: ''
        },
        amountProduct: 0,
        cardProducts: [],
        priceTotal: 0,
        tabsKey: "1",
        ListProduct: [
            {
                name: 'Coombes',
                des: 'living room',
                price: 2600,
                link_Image: 'https://res.cloudinary.com/dnn308vwn/image/upload/v1648106934/Test/Image_e7iept.png'
            },

            {
                name: 'Keeve Set',
                des: 'bed room',
                price: 590,
                link_Image: 'https://res.cloudinary.com/dnn308vwn/image/upload/v1648109388/Test/Image_1_jn5uih.png'
            },

            {
                name: 'Nillè',
                des: 'living room',
                price: 950,
                link_Image: 'https://res.cloudinary.com/dnn308vwn/image/upload/v1648109496/Test/Image_2_gxc06u.png'
            },

            {
                name: 'Blanko',
                des: 'bed room',
                price: 90,
                link_Image: 'https://res.cloudinary.com/dnn308vwn/image/upload/v1648110217/Test/Image_3_ih3ruf.png'
            },

            {
                name: 'Momo',
                des: 'other',
                price: 890,
                link_Image: 'https://res.cloudinary.com/dnn308vwn/image/upload/v1648111619/Test/Image_4_epcon2.png'
            },

            {
                name: 'Penemillè',
                des: 'living room',
                price: 120,
                link_Image: 'https://res.cloudinary.com/dnn308vwn/image/upload/v1648111708/Test/Image_5_whvcoo.png'
            },

            {
                name: 'Kappu',
                des: 'other',
                price: 420,
                link_Image: 'https://res.cloudinary.com/dnn308vwn/image/upload/v1648111740/Test/Image_6_vqsmvc.png'
            }
        ],
        handlingListProduct: []
    },
    reducers: {
        getAllProduct: state => {
            state.handlingListProduct = [...state.ListProduct];
        },
        searchProduct: (state, action) => {
            state.handlingListProduct = state.ListProduct.filter((item, index) => {
                return item.name.includes(action.payload);
            });
        },
        filterProduct: (state, action) => {
            state.handlingListProduct = state.ListProduct.filter((item, index) => {
                return item.des.includes(action.payload);
            });
        },

        setNavMobile: (state, action) => {
            state.navMobile = action.payload;
        },

        setFilterMobile: (state, action) => {
            state.filterMobile = action.payload;
        },

        showModalLogSign: (state) => {
            state.modal_log_signUP = true;
        },

        hideModalLogSign: (state) => {
            state.modal_log_signUP = false;
        },

        userLoginEmail: (state, action) => {
            state.userLogin = true;
            state.user.avatar = action.payload.avatar;
            state.user.email = action.payload.email;
        },

        userLogOut: state => {
            state.userLogin = false;
        },

        incrementAmountProduct: state => {
            state.amountProduct += 1;
        },

        decrementAmountProduct: state => {
            state.amountProduct -= 1;
        },

        showModalCard: (state) => {
            state.modal_Card = true;
        },

        hideModalCard: (state) => {
            state.modal_Card = false;
        },

        addCardProducts: (state, action) => {
            const a = [...state.cardProducts, action.payload];

            let tong = 0;
            a.forEach(item => {
                tong += item.totalPrice;
            });

            state.priceTotal = tong;

            state.cardProducts = getUniqueListBy(a);

        },

        incrementAmountCardProduct: (state, action) => {
            state.cardProducts[action.payload].amount += 1;

            state.cardProducts[action.payload].totalPrice = Number(state.cardProducts[action.payload].price) * state.cardProducts[action.payload].amount;

            const listTotalPrice = state.cardProducts.map(item => item.totalPrice);

            state.priceTotal = listTotalPrice.reduce((p, c) => p + c);
        },

        decrementAmountCardProduct: (state, action) => {
            const index = Number(action.payload)

            if (state.cardProducts[index].amount === 1) {
                state.cardProducts.splice(index, 1);

                const listTotalPrice = state.cardProducts.map(item => item.totalPrice);

                state.priceTotal = listTotalPrice.reduce((p, c) => p + c , 0);
            } else {
                state.cardProducts[index].amount -= 1;

                state.cardProducts[action.payload].totalPrice = Number(state.cardProducts[action.payload].price) * state.cardProducts[action.payload].amount;

                const listTotalPrice = state.cardProducts.map(item => item.totalPrice);

                state.priceTotal = listTotalPrice.reduce((p, c) => p + c , 0);
            }
        },

        setTabsKey: (state, action) => {
            state.tabsKey = action.payload;
        },

        deleteCardProduct: (state, action) => {
            state.cardProducts.splice(Number(action.payload), 1);

            let tong = 0;
            state.cardProducts.forEach(item => {
                tong += item.totalPrice;

            });

            state.priceTotal = tong;
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    getAllProduct, searchProduct, filterProduct, setNavMobile,
    setFilterMobile, showModalLogSign, hideModalLogSign, userLoginEmail, userLogOut,
    incrementAmountProduct, decrementAmountProduct, showModalCard, hideModalCard,
    addCardProducts, incrementAmountCardProduct, decrementAmountCardProduct,
    setTabsKey, deleteCardProduct
} = ecommerceSlice.actions

export default ecommerceSlice.reducer
