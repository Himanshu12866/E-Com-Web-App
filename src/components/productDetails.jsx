import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { addProduct } from '../features/products/productSlice'
import { useDispatch } from "react-redux"



const ProductDetails = () => {
    const [product, setProducts] = useState([])
    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://127.0.0.1:5566/products/${params.id}`)
                setProducts(response.data)

            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [dispatch, params.id])

    //add to cart
    function handleCart(id) {
        axios.get(`http://127.0.0.1:5566/products/${id}`).then((res) => {
            dispatch(addProduct(res.data))
            alert("Item added to cart")
        })
    }



    return (
        <div style={{ margin: "100px" }}>
            <h1 className='text-center'>Product Details</h1>
            {
                product?.map((item) => (
                    < div className="mt-4 d-flex" key={item.id}>
                        <div>
                            <img src={item.image} className="card-img-top" alt="" height={400} width={400} />
                        </div>
                        <div className="ms-2">
                            <p>{item.title}</p>
                            <div className="" style={{ lineHeight: 1 }}>
                                <p >Description : {item.description ? item.description : "No Description"}</p>
                                <button className="btn btn-warning">Price: {item.price} &#8377;</button>
                                <button className={(item.available) ? "btn btn-success ms-2" : "btn btn-danger mb-2"}>{(item.available) ? "Available" : "Out of stock"}</button>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-warning mt-2" onClick={() => handleCart(item.id)}>Add To Cart</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ProductDetails