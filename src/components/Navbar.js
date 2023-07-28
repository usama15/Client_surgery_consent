import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import img1 from '../images/mainlogo.png'

const Navbar = () => {
    const navigate = useNavigate()
    const utoken = localStorage.getItem('bcouser')
    const fname = localStorage.getItem('fname')
    const lname = localStorage.getItem('lname')
    const pname = localStorage.getItem('pname')
const name = localStorage.getItem("bcousername")
    console.log(fname)
    console.log(lname)
    console.log(pname)

    if (utoken !== 'abcd') {
        navigate('/')
    }
    const Logout = () => {
        localStorage.removeItem('bcouser');
        localStorage.removeItem('bcousername');
        navigate('/')
    }
    return (
        <div className='navbar fixed-top px-md-5 px-1 py-2 bg-white'>
            <div className='d-inline-block w-md-50 w-25'>
                <h4 className='mb-0 ' style={{color:"black"}} > Dr. {name}</h4>
            </div>
            <div className='d-inline-block w-md-50 w-25'>
                <img src={img1} className="logo" alt="logo" />
                {/* <h4 className='mb-0'> Dr. Import ant Surgeon <br />Big City Orthopaedics</h4> */}
            </div>
            <div className='d-inline-block w-md-50 w-25'>
                <ul className='d-inline-block f-right nav-list' >
                    {/* <li className='me-3 px-md-3 px-0'>
                        <b onClick={() => navigate('/document')}>Create Document</b>
                    </li> */}
                    <li>
                        <b  style={{color:"black"}} onClick={() => Logout()}>Logout</b>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar