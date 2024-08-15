import { createSlice, nanoid } from '@reduxjs/toolkit'


//create initialStates

const initialState = {
    products: [{ id: 1, product: [] }]
}

export const productSlice = createSlice({
    name: "Myntra Products",
    initialState,
    //create reducers
    reducers: {
        addProduct: (state, action) => {
            const product = {
                id: nanoid(),
                product: action.payload
            }
            state.products.push(product)
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter((product) => (
                product.id !== action.payload
            ))
        }
    }
})


export const { addProduct, removeProduct } = productSlice.actions

export default productSlice.reducer