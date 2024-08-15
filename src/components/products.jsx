import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import '../style/products.scss'
import { useDispatch } from "react-redux"
import { addProduct } from "../features/products/productSlice"


const Products = () => {
  const [cookies, setCookie, removeCokie] = useCookies()
  const [products, setProducts] = useState([])
  // const [style, setStyle] = useState("bi bi-success")
  // const [cart, setCart] = useState([])

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5566/allProducts')
        setProducts(response.data)

      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  // addToCart
  async function handleCart(id) {
    try {
      const response = await axios.get(`http://127.0.0.1:5566/products/${id}`)
      dispatch(addProduct(response.data))
      alert("Product added successfuly")
    } catch (err) {
      console.log(err)
    }
  }

  //sort products

  function handleSortProducts(e) {
    try {
      if (e.target.value !== "-1") {
        axios.get(`http://127.0.0.1:5566/sort/${e.target.value}`)
          .then((res) => {
            setProducts(res.data)
          })
      } else {
        axios.get('http://127.0.0.1:5566/allProducts').then((res) => {
          setProducts(res.data)
        })

      }
      // console.log(cart)
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {

    if (cookies.userId == undefined) {
      navigate("/login")
    }
    // console.log(cart)
  }, [cookies.userId, navigate])

  // Product details

  function handleDetails(id) {
    navigate(`/details/${id}`)
  }



  return (
    <div className="product-home" style={{ marginTop: "70px" }}>
      <div className="sort">
        <select className="ms-2 form-select bg-warning" onChange={handleSortProducts}>
          <option value="-1">All</option>
          <option value="shirts">shirts</option>
          <option value="shoes">Shoes</option>
          <option value="accessories">Accessories</option>
          <option value="bags">Bags</option>
          <option value="electronics">Electronics</option>
        </select>
      </div>
      <section className="products-section">
        <div className="products d-flex flex-wrap w-100">
          {
            products.map((item) => (
              < div className="card m-2" key={item.id}>
                <img src={item.image} className="card-img-top" alt="" />
                <div className="card-header">
                  <p>{item.title.substr(0, 10)}</p>
                </div>
                <div className="card-body" style={{ lineHeight: 1 }}>
                  <p >Description : {item.description ? item.description.substr(0, 80) : "No Description"}</p>
                  <p className="bg-warning p-2 w-75 rounded text-dark">Price: {item.price} &#8377;</p>
                  <p className={(item.available) ? "btn btn-success" : "btn btn-danger"}>{(item.available) ? "Available" : "Out of stock"}</p>
                </div>
                <div className="card-footer">
                  <button className="btn btn-success me-2" onClick={() => handleDetails(item.id)}>Details</button>
                  <button className="btn btn-warning" onClick={() => handleCart(item.id)}>Add To Cart</button>
                </div>
              </div>
            ))
          }
        </div>
      </section >

    </div >
  )
}



export default Products