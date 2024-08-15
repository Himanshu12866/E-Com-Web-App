//bring configure store

import { configureStore } from '@reduxjs/toolkit'
import productReducer from "../features/products/productSlice"

//make store
export const store = configureStore({
    reducer: productReducer
})