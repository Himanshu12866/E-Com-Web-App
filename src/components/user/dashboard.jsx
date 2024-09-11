import { useCallback, useEffect, useState } from "react"
import "../../style/dashboard.scss"
import axios from "axios"
import { useNavigate } from "react-router-dom"
// import { useParams } from "react-router-dom"
import { useCookies } from "react-cookie"



const Dashboard = () => {
    const [products, setProducts] = useState([])
    const [refresh, setRefresh] = useState(false)
    const Navigate = useNavigate()
    // const params = useParams()
    const [cookies, setCookie, removeCookie] = useCookies()
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})



    function handleSignOut() {
        console.log("Removing cookie:", cookies.userId);
        removeCookie('userId');
        console.log("Cookie removed:", cookies.userId);
    }


    //user
    useEffect(() => {
        async function FetchUser() {
            try {
                const response = await axios.get("http://127.0.0.1:5000/users")
                setUsers(response.data)
                if (users.length > 0) {
                    const foundUser = users.find((user) => user.userId === cookies.userId)
                    if (foundUser) {
                        setUser(foundUser)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        FetchUser()
    }, [cookies.userId, users])

    //all products
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:5566/allProducts')
                setProducts(response.data)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])




    function handleAddProduct() {
        Navigate('/addProducts')
    }


    //delete product
    async function handleDelete(id) {
        try {
            // Show immediate feedback to the user
            setProducts(prevProducts => prevProducts.map(product => {
                if (product.id === id) {
                    return { ...product, deleting: true }; // Add deleting flag
                }
                return product;
            }));

            await axios.delete(`http://127.0.0.1:5566/deleteProduct/${id}`);

            // Remove the product from the list after successful deletion
            setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
        } catch (error) {
            console.log(error);
            // If deletion fails, update the product list to remove the deleting flag
            setProducts(prevProducts => prevProducts.map(product => {
                if (product.id === id) {
                    return { ...product, deleting: false }; // Remove deleting flag
                }
                return product;
            }));
        }
    }


    

    useEffect(() => {
        if (cookies.userId == undefined) {
            Navigate("/login")
        }
    }, [Navigate, cookies.userId, refresh])

    return (
        <div className="container-fluid dashboard" style={{ marginTop: "80px", height: '100vh' }}>
            <h1>{cookies.userId} - <button className="btn btn-link" onClick={handleSignOut}>Sign-Out</button></h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>UserId</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>

                        <td>{user.userName}</td>
                        <td>{user.userId}</td>
                        <td>{user.mobile}</td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                    </tr>
                </tbody>
            </table>
            <div className="d-flex flex-row justify-content-center align-items-center products-heading">
                <h1>Products</h1>
                <button onClick={handleAddProduct} className="btn btn-primary ms-4">Add Product</button>
            </div>
            <table className="products-table border-2 mb-5">
                <thead>
                    <tr>
                        <th >Id</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Preview</th>
                        <th>Price</th>
                        <th>Available</th>
                        <th colSpan={3}>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products?.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.category}</td>
                                <td><img src={(item.image)} width={60} height={60} alt="No image" /></td>
                                <td style={{ width: "80px" }}>{item.price} &#8377;</td>
                                <td>{(item.available) ? "Available" : "Out of stock"}</td>
                                <td>{item.description.substr(0, 70)}</td>
                                <td><button className="btn btn-warning" onClick={() => Navigate(`/edit/${item.id}`)}><span className="bi bi-pen"></span></button></td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                                        {item.deleting ? 'Removing...' : <span className="bi bi-trash"></span>}
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard