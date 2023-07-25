import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GetServerUrl from '../GetServerUrl'

const ProNameList = () => {
  const [data, setData] = useState(null)
  const [flag, setFlag] = useState(1)
  const navigate = useNavigate()
  useEffect(() => {
        // await axios.get('${GetServerUrl()}/admin/procedures').then((response) => {
         axios.get(`${GetServerUrl()}/admin/procedurenames`).then((response) => {
          console.log("response", response.data)
          setData(response.data.pronames)
        }).catch((err) => {
          console.log("error : ", err);
        })
  }, [flag])

  const delUser = (id) => {
    // axios.put(`${GetServerUrl()}/admin/update-procedure/${id}`).then((response) => {
    axios.delete(`${GetServerUrl()}/admin/procedurenames/${id}`).then((response) => {
      alert("Procedure Deleted Successfully")
      console.log(response)
      setFlag(flag + 1);
    }).catch((err) => {
      console.log("Errror : ", err)
    })
  }


  return (
    <div className="home-content width-100" style={{width: '100%'}}>
      <div className="sales-boxes width-100 " style={{width: '100%'}}>
        <div className="recent-sales box width-100" style={{width: '100%'}}>
          <div className="title">Procedures List <button onClick={() => { navigate('/admin/proceduresname/add')}} className="btn btn-success" style={{marginLeft: '74%'}}>Add Procedure</button> </div>
          <div className="sales-details">
            <div className="table-responsive" style={{width: '100%'}}>
              <table className="table" style={{width: '100%'}}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    {/* <th scope="col">Procedure Name</th> */}
                    <th scope="col">Procedure Name</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.map((item, index) => (
                        <tr key={index +  1}>
                            <th  scope="row">{index + 1}</th>
                            {/* <td>{user.name}</td> */}
                            <td>{item.name}</td>
                            <td><button onClick={() => { navigate(`/admin/proceduresname/edit/${item._id}`)}} className="btn btn-primary px-3">Edit</button></td>
                            <td><button onClick={() => delUser(item._id)} className="btn btn-danger">Delete</button></td>
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

export default ProNameList