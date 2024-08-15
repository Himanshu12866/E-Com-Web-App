
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Login from "./login"
import Home from "./home"
import Register from "./register"
import Products from "./products"
import NotFound from "./notFound"
import AddProducts from "./addProducts"
import Dashboard from "./user/dashboard"
import EditProduct from "./editProduct"
import Cart from "./cart"
import { useSelector } from "react-redux"
import ProductDetails from "./productDetails"

const Index = () => {

    const products = useSelector(state => state.products)

    return (
        <BrowserRouter>
            <section>
                <header className="d-flex w-100 justify-content-between align-items-center p-1">
                   <img src="https://banner2.cleanpng.com/20180519/jjs/kisspng-e-commerce-logo-electronic-business-5b00d2d0918d84.2335269315267806245962.jpg" alt="guygfuj" height={50} width={50}/>
                    <nav className="d-flex justify-content-between align-items center">
                        <div className=" m-2">
                            <Link className="btn btn-warning" to="/">Home</Link>
                        </div>
                        <div className="m-2">
                            <Link className="btn btn-warning" to="/register">Register</Link>
                        </div>
                        <div className="m-2">
                            <Link className="btn btn-warning" to="/login">Login</Link>
                        </div>

                        <div className=" m-2">
                            <Link className="btn btn-warning" to="/products">Products</Link>
                        </div>
                        <div className=" m-2">
                            <Link className="btn btn-warning" to="/dashboard">Dashboard</Link>
                        </div>
                        <div className=" m-2">
                            <Link to="cart">
                                <div className="position-ralative me-2">
                                    <span className="bi bi-cart text-warning fw-bold"></span>
                                    <span className="position-absolute text-light fw-bold rounded d-flex justify-content-center align-items-center" style={{ top: '9px', right: '14px', height: '15px', width: "15px", backgroundColor: "#c01414" }}>{products?.length - 1}</span>
                                </div>
                            </Link>
                        </div>
                    </nav>
                </header>
                <main className="w-100 d-flex justify-content-center" style={{ height: "100vh" }}>
                    <Routes Basename="/">
                        <Route path="/" element={<Home/>} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/addProducts" element={<AddProducts />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/edit/:id" element={<EditProduct />} />
                        <Route path="cart" element={<Cart />} />
                        <Route path="details/:id" element={<ProductDetails />} />
                        <Route path="/error" element={<NotFound />} />
                    </Routes>
                </main>
            </section>
        </BrowserRouter>
    )
}

export default Index