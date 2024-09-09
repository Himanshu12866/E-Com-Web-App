import { useSelector, useDispatch } from 'react-redux'
import { removeProduct } from "../features/products/productSlice"
import { useEffect, useState } from 'react'

const Cart = () => {

    const [cartPrice, setCartPrice] = useState(0)
    const [cartWarn, setCartWarn] = useState("")
    const products = useSelector(state => state.products)

    const dispatch = useDispatch()


    useEffect(() => {
        let totalPrice = 0;
        products.forEach((item) => {
            item.product.forEach((product) => {
                totalPrice += product.price;
            });
        });
        setCartPrice(totalPrice);
    }, [products])
    console.log(products)

    function handleBuy() {
        if (cartPrice > 0) {
            alert("Your order has successfuly added!")
        } else {
            setCartWarn("Products not found!!")
        }
    }

    return (
        <div className='d-flex align-items-center flex-column' style={{ width: 500, marginTop: '80px' }}>
            <h1>Cart Items</h1>
            <p className='text-danger'>{cartWarn}</p>
            <table className='table table-striped-columns'>
                <thead>
                    <tr>
                        <th>title</th>
                        <th>category</th>
                        <th>preview</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((item) => (
                            item.product.map((productItem) => (
                                <tr key={productItem.id} className='table-active'>
                                    <td>{productItem.title}</td>
                                    <td>{productItem.category}</td>
                                    <td><img src={productItem.image} alt="" height={50} width={50} /></td>
                                    <td>&#8377; {productItem.price}</td>
                                    <td><button className='btn btn-danger' onClick={() => dispatch(removeProduct(item.id))}>Delete</button></td>
                                    {}
                                </tr>
                            ))
                        ))
                    }
                    <tr>
                        <td colSpan={3}><b>Total</b></td>
                        <td className='fw-bold'>&#8377; {cartPrice}</td>
                        <td><button className='btn btn-warning' onClick={handleBuy}>Buy</button></td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default Cart