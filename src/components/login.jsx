import { useFormik } from 'formik'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import TextField from '@mui/material/TextField';

const Login = () => {

  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [cookies, setCookie, removeCokie] = useCookies()

  const formik = useFormik({
    initialValues: {
      userId: '',
      password: ''
    },
    onSubmit: (users) => {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:5000/users'
      }).then((response) => {
        setUsers(response.data)
      })
    }
  })

  useEffect(() => {
    for (let user of users) {
      if (user.userId == formik.values.userId && user.password == formik.values.password) {
        setCookie('userId', user.userId, { expires: new Date('2024-08-08 23:33:34') })
        setLoginSuccess(true)
        break;
      } else {
        setError("Wrong UserId or Password")
      }
    }
  }, [users, formik.values, setCookie])

  useEffect(() => {
    if (loginSuccess) {
      navigate('/products')
    }
  }, [loginSuccess, navigate])

  return (
    <div className='w-25 border border-2 p-3 mb-2 rounded' style={{ marginTop: "114px", height: "47vh" }}>
      <h1 className='text-center'>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <p className='text-danger'>{error}</p>
        <dl>
          <TextField id="standard-basic" name='userId' type='text' label="User ID" className='w-100' variant="standard" onChange={formik.handleChange} />
          {}

          <TextField id="standard-basic" type="password" name='password' label="Password" className='w-100' variant="standard" onChange={formik.handleChange} />
        </dl>
        <button className='btn btn-success w-100' type='submit'>Login</button>
      </form>

    </div>
  )
}

export default Login