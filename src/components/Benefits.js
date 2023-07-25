import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GetServerUrl from '../GetServerUrl'

const Benefits = () => {
  const [data, setData] = useState(null)
  const navigate = useNavigate()
  const [flag, setFlag] = useState(1);
  useEffect(() => {
        axios.get(`${GetServerUrl()}/admin/benefits`).then((response) => {
        // axios.get('${GetServerUrl()}/admin/benefits').then((response) => {
          console.log("response", response)
          setData(response.data.benefits)
        }).catch((err) => {
          console.log("Error : ", err)
        })
  }, [flag])

  const delUser = (id) => {
    let abc = 0;
    axios.get(`${GetServerUrl()}/admin/procedures`).then((response) => {
    // axios.get('${GetServerUrl()}/admin/procedure').then((response) => {
      const result = response.data.procedures;
      // let abc = 0;
      result && result.map((item) => {
        item.benefits.map(sben => {
          if(sben._id === id){
            abc = abc + 2;
          }
        })
      })
      
    }).catch((err) => {
      console.log("Errror : ", err)
    })
    // axios.patch(`${GetServerUrl()}/admin/update-procedure/${id}`).then((response) => {
    if(abc === 0){
        axios.delete(`${GetServerUrl()}/admin/benefits/${id}`).then((response) => {
          alert("Benefit Deleted Successfully")
          console.log(response);
          setFlag(flag + 1);
        }).catch((err) => {
          console.log("Errror : ", err)
        })
      }else {
        alert("Benefit is Linked in Procedure So you can't Delete this.");
      }
  }

  let no = 1;

  return (
    <div className="home-content width-100" style={{width: '100%'}}>
      <div className="sales-boxes width-100 " style={{width: '100%'}}>
        <div className="recent-sales box width-100" style={{width: '100%'}}>
          <div className="title w-100">Benefit List <button onClick={() => navigate('/admin/benefits/add')} className='btn btn-success' style={{marginLeft: 'calc(100% - 260px)'}}>Add Benefit</button></div>
          <div className="sales-details">
            <div className="table-responsive" style={{width: '100%'}}>
              <table className="table" style={{width: '100%'}}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    {/* <th scope="col">Procedure Name</th> */}
                    <th scope="col">Code</th>
                    <th scope="col">Name</th>
                    <th scope="col">Detail</th>
                    <th scope="col">Statistics</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.map((item, index) => (
                        <tr key={index + 1}>
                            <th  scope="row">{no++}</th>
                            {/* <td>{user.name}</td> */}
                            <td>{item.code}</td>
                            <td>{item.name}</td>
                            <td>{item.detail}</td>
                            <td>{item.statistics}</td>
                            <td><button onClick={() => { navigate(`/admin/benefits/edit/${item._id}`)}} className="btn btn-primary px-3">Edit</button></td>
                            <td><button onClick={() => delUser(item._id)} className="btn btn-danger">Delete</button></td>
                        </tr>
                    ))
                  }
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

export default Benefits