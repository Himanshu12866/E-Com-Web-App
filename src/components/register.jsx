import Input from '@mui/material/Input';
import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';

const Register = () => {
    const navigate = useNavigate()
    const [verify, setVerify] = useState("")
    const [users, setUsers] = useState([])
    const [color, setColor] = useState('')

    const formik = useFormik({
        initialValues: {
            'userId': '',
            'userName': '',
            'password': '',
            'age': 0,
            'email': '',
            'mobile': ''
        },
        onSubmit: (values) => {
            axios({
                method: 'post',
                url: 'http://127.0.0.1:5000/register',
                data: values
            })
            alert("register successfuly")
            navigate('/login')
        }
    })

    function VerifyUserId(e) {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/customers',
        }).then((response) => {
            setUsers(response.data)
            for (let user of users) {
                if (e.target.value == user.userId) {
                    setVerify("userId is not available")
                    setColor("text-danger")
                    break;
                }
                else {
                    setVerify("userId is available")
                    setColor("text-success")
                }
            }
        })
    }

    return (
        <div className="w-25 border border-3 p-3 rounded" style={{ height: '521px', margin: '80px' }}>
            <h1 className="text-center">Register</h1>
            <form onSubmit={formik.handleSubmit} className="">
                <dl>
                    <dd>
                        <TextField id="standard-basic" name='userId' type='text' required onKeyUp={VerifyUserId} label="User ID" className='w-100' variant="standard" onChange={formik.handleChange} />
                    </dd>
                    <dd className={color}>{verify}</dd>

                    <dd>
                        <TextField id="standard-basic" name='userName' type='text' required label="UserName" className='w-100' variant="standard" onChange={formik.handleChange} />

                        {/* <input type="text"
                        name="userName"
                        className="form-control"
                        onChange={formik.handleChange} /> */}
                    </dd>

                    <dd>

                        <TextField id="standard-basic" name='email' type='email' label="Email" required className='w-100' variant="standard" onChange={formik.handleChange} />

                        {/* <input type="email"
                        name="email"
                        className="form-control"
                        onChange={formik.handleChange} /> */}
                    </dd>


                    <dd>
                        <TextField id="standard-basic" name='password' type='password' required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$" label="Password" className='w-100' variant="standard" onChange={formik.handleChange} />
                        {/* <input
                        type="password"
                        name="password"
                        className="form-control"
                        onChange={formik.handleChange} /> */}
                    </dd>

                    <dd>
                        <TextField id="standard-basic" name='age' type='number' label="Age" className='w-100' variant="standard" onChange={formik.handleChange} />
                        {}
                    </dd>

                    <dd>
                        <TextField id="standard-basic" name='mobile' type='text' pattern="^(?:\+?91)?[789]\d{9}$" label="Mobile" required className='w-100' variant="standard" onChange={formik.handleChange} />
                        {/* <input
                            type="text"
                            name="mobile"
                            className="form-control"
                            onChange={formik.handleChange} /> */}
                    </dd>

                </dl>
                <button className="btn btn-success w-100">Register</button>
                <Link to="/login">Existing user login</Link>
            </form>
        </div>
    )
}

export default Register