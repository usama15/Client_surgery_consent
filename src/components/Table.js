import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GetServerUrl from '../GetServerUrl'

const Table = () => {
  const [data, setData] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    axios.get(`${GetServerUrl()}/admin/users`).then((response) => {
      // console.log("response", response.data)
      setData(response.data.users)
    })
  }, [])

  const delUser = (id) => {
    axios.delete(`${GetServerUrl()}/admin/users/${id}`).then((response) => {
      alert("User Deleted Successfully")
      console.log(response)
      setData(data)
    }).catch((err) => {
      console.log("Errror : ", err)
    })
  }

  return (
    <div className="home-content width-100" style={{width: '100%'}}>
      <div className="sales-boxes width-100 " style={{width: '100%'}}>
        <div className="recent-sales box width-100" style={{width: '100%'}}>
          <div className="title">Users <button onClick={() => { navigate('/admin/user/add')}} className="btn btn-success float-end">ADD USER</button></div>
          <div className="sales-details">
            <div className="table-responsive" style={{width: '100%'}}>
              <table className="table" style={{width: '100%'}}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Practice Name</th>
                    <th scope="col">Qualification</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.map((user, index) => (
                    <tr key={index}>
                        <th  scope="row">{index + 1}</th>
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>{user.email}</td>
                        <td>{user.practicename}</td>
                        <td>{user.qualifications}</td>
                        <td><button onClick={() => { navigate(`/admin/user/edit/${user._id}`)}} className="btn btn-primary px-3">Edit</button></td>
                        <td><button onClick={() => delUser(user._id)} className="btn btn-danger">Delete</button></td>
                        </tr>
                  ))}
                </tbody>
              </table> 
            </div>
          </div>
          {/* <!-- <div className="button">
            <a href="#">See All</a>
          </div> --> */}
        </div>
        
      </div>
    </div>
  )
}

export default Table