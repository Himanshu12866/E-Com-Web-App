import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';

const AddProducts = () => {
    // const [products, setProducts] = useState([])
    const [, setBool] = useState(false)
    const [countId, setCountId] = useState()
    const [randomId, setRandomId] = useState(0)
    const Navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            "id": 0,
            "image": "",
            "description": "",
            'category': "",
            "title": "",
            "price": 0,
            "available": false
        },
        onSubmit: (async (values) => {
            try {
                values.id = countId
                await axios.post("http://127.0.0.1:5566/addProduct", values)
            } catch (error) {
                console.log(error)
            }
        })
    })



    //move dashboard
    function handleMoveProducts() {
        Navigate('/dashboard')
    }

    //get prouducts for id count
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:5566/allProducts')
                let random = Math.floor(Math.random() * 10000)
                setRandomId(random)
                setBool(true)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    function handleSubmit() {
        alert("Your product has been added succssfuly")
    }

    return (
        <div>
            <div className="d-flex justify-content-center " style={{ margin: '80px' }}>
                <form action="" className="d-flex justify-content-center flex-column align-items-center" onSubmit={formik.handleSubmit}>
                    <h1>Add Products</h1>
                    <dl>
                        <dd>
                            <TextField id="standard-basic" type="number" value={randomId} name='id' autoFocus label="Product Id" className='w-100' variant="standard" onChange={formik.handleChange} />
                            {/* <input type="number" name="id" onChange={formik.handleChange} /> */}
                        </dd>
                        <dd>
                            <TextField id="standard-basic" type="text" name='image' label="Image" className='w-100' variant="standard" onChange={formik.handleChange} />
                            {/* <input type="text" name="image" onChange={formik.handleChange} /> */}
                        </dd>

                        <dd>
                            <TextField id="standard-basic" type="text" name='title' label="Title" className='w-100' variant="standard" onChange={formik.handleChange} />
                            {/* <input type="text" name="title" onChange={formik.handleChange} /> */}
                        </dd>

                        <dd>
                            <TextField id="standard-basic" type="text" name='category' label="Category" className='w-100' variant="standard" onChange={formik.handleChange} />
                            {/* <input type="text" name="category" onChange={formik.handleChange} /> */}
                        </dd>

                        <dd>
                            <TextField id="standard-basic" type="text" name='description' label="Description" className='w-100' variant="standard" onChange={formik.handleChange} />
                            {/* <input type="text" name="description" onChange={formik.handleChange} /> */}
                        </dd>

                        <dd>

                            <TextField id="standard-basic" type="number" name='price' label="Price" className='w-100' variant="standard" onChange={formik.handleChange} />
                            {/* <input type="number" name="price" onChange={formik.handleChange} /> */}
                        </dd>
                        <dt>Available</dt>
                        <dd>
                            {/* <TextField id="standard-basic" type="Checkbox" name='available' label="Available" className='w-100' variant="standard" checked={formik.values.available} onChange={formik.handleChange} /> */}
                            <input type="checkbox" name="available" onChange={formik.handleChange} checked={formik.values.available} />
                        </dd>
                        <div>
                            <button type="submit" className="btn btn-success" onClick={handleSubmit}>Submit</button>
                            <button className="btn btn-link" onClick={handleMoveProducts}>Check Products</button>
                        </div>
                    </dl>
                </form>
            </div>
        </div>
    )
}

export default AddProducts