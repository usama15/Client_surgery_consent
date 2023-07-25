import React,{useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import axios from 'axios'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
// import GetServerUrl from '../../GetServerUrl'


const AdminLogin = () => {
  const [error, setError] = useState(null);
  const log = 'logged';
  const { register, handleSubmit, formState: {errors}} = useForm()

  const navigate = useNavigate()

  const onSubmit = (data) => {
    console.log("data : ", data)
    console.log(data.username)
    console.log(data.password)
    if(data.username === 'admin@bco.com' && data.password === 'secret') {
        // localStorage.setItem("bcoadmin", "logged")
        localStorage.setItem("bcoadmin", log)
        navigate('/admin')
    }
    else {
        setError("Invalid username or password...!")
    }
  }

  return (
    <>
        <section className="vh-100 gradient-custom" style={{backgroundColor: '#e9ecef'}}>
            <div className="container py-3 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card " style={{bordeRadius:'1rem'}}>
                    <div className="card-body p-5">

                        <div className="mb-md-5 mt-md-4 pb-5">

                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email/UserName</Form.Label>
                                <Form.Control type="text" name="username" {...register("username", {required: true})} placeholder="Enter email" />
                                {errors.username && <span className='text-danger'>Username is required</span>}
                                {/* <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text> */}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" {...register("password", {required: true})} placeholder="Password" />
                                {errors.password && <span className='text-danger'>Password is required</span>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            <br />
                          
                            {error && (<><br /> <span className='text-danger pt-3'>{error}</span></>)}
                            </Form>
                        </div>
                        <button onClick={() => navigate('/')} className='btn btn-link'>User Login</button>

                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
    </>
  )
}

export default AdminLogin