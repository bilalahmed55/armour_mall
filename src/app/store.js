import {configureStore} from '@reduxjs/toolkit'
import cartSystem from '../features/CartSystem'
const store = configureStore({
    reducer: {
        name: cartSystem
    }
})

export default store