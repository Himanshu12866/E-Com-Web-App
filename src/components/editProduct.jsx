import axios from "axios"
import { useFormik } from "formik"
import { useNavigate, useParams } from "react-router-dom"
import "../style/editProduct.scss"
import { useEffect, useState } from "react"

const EditProduct = () => {
    const [products, setProducts] = useState([])
    const params = useParams()
    const navigate = useNavigate()

    //update products
    const formik = useFormik({
        initialValues: {
            "id": 0,
            "image": "",
            "category": "",
            "title": "",
            "description": "",
            "price": 0,
            "available": false
        },
        onSubmit: (async (values) => {
            await axios.put(`http://127.0.0.1:5566/updateProduct/${params.id}`, values)
            alert("Your product has been successfuly updated")
        })
    })

    //all products
    useEffect(() => {
        async function FetchData() {
            try {
                const response = await axios.get(`http://127.0.0.1:5566/products/${params.id}`)
                setProducts(response.data)
            }
            catch (error) {
                console.log(error)
            }
        }
        FetchData()
    }, [params.id])

    function handleSubmit() {
        alert("Product has been updated")
    }

    function handleMoveDashBoard() {
        navigate('/dashboard')
    }

    return (
        <div className="container" style={{ margin: '140px' }}>
            <div className="Input-form">
                <h1>Update Product</h1>
                <form action="" onSubmit={formik.handleSubmit}>
                    <dl>
                        <dt>Product Id</dt>
                        <dd><input type="number" name="id" onChange={formik.handleChange} className="form-control" /></dd>
                        <dt>Image</dt>
                        <dd><input type="text" name="image" onChange={formik.handleChange} className="form-control" /></dd>
                        <dt>Title</dt>
                        <dd><input type="text" name="title" onChange={formik.handleChange} className="form-control" /></dd>
                        <dt>Category</dt>
                        <dd><input type="text" name="category" onChange={formik.handleChange} className="form-control" /></dd>
                        <dt>Description</dt>
                        <dd><input type="text" name="description" onChange={formik.handleChange} className="form-control" /></dd>
                        <dt>Price</dt>
                        <dd><input type="number" name="price" onChange={formik.handleChange} className="form-control" /></dd>
                        <dt>Available</dt>
                        <dd><input type="checkbox" name="available" checked={formik.values.available} onChange={formik.handleChange} /></dd>
                    </dl>
                    <button type="submit" className="btn btn-success me-3" onClick={handleSubmit}>Submit</button>
                    <button className="btn btn-success" onClick={handleMoveDashBoard} >Dashboard</button>
                </form>
            </div>
            <div className="data-before">
                <h1>Data</h1>
                {
                    products.map((product) => (
                        <dl key={product.id}>
                            <dt>Id</dt>
                            <dd>{product.id}</dd>
                            <dt>image url</dt>
                            <dd>{product.image}</dd>
                            <dt>Title</dt>
                            <dd>{product.title}</dd>
                            <dt>Category</dt>
                            <dd>{product.category}</dd>
                            <dt>Description</dt>
                            <dd>{product.description}</dd>
                            <dt>Price</dt>
                            <dd>{product.price}</dd>
                            <dt>Available</dt>
                            <dd>{(product.available) ? "true" : "false"}</dd>
                        </dl>
                    ))
                }
            </div>
        </div>
    )
}

export default EditProduct