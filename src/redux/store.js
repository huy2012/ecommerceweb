import { configureStore } from '@reduxjs/toolkit'
import Reducer from './reducer'

export default configureStore({
    reducer: {
        ecommerce : Reducer
    }
})
