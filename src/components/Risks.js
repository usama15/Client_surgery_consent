import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GetServerUrl from '../GetServerUrl'

const Risks = () => {
  const [data, setData] = useState(null)
  const [flag, setFlag] = useState(1)
  const navigate = useNavigate()
  useEffect(() => {
        // await axios.get('${GetServerUrl()}/admin/procedures').then((response) => {
         axios.get(`${GetServerUrl()}/admin/risks`).then((response) => {
          // console.log("response", response.data)
          setData(response.data.risks)
        }).catch((err) => {
          console.log("error : ", err);
        })
  }, [flag])

  const delUser = (id) => {
    let abc = 0;
    axios.get(`${GetServerUrl()}/admin/procedures`).then((response) => {
      const result = response.data.procedures;
      result && result.map((item) => {
        item.risks.map(sben => {
          if(sben._id === id){
            abc = abc + 2;
          }
        })
      })
      
    }).catch((err) => {
      console.log("Errror : ", err)
    })

    if(abc === 0){
      axios.delete(`${GetServerUrl()}/admin/risks/${id}`).then((response) => {
        alert("Risk Deleted Successfully")
        console.log(response)
        setFlag(flag + 1);
      }).catch((err) => {
        console.log("Errror : ", err)
      })
    }else {
      alert("Risk is Linked in Procedure So you can't Delete this.");
    }

    // axios.put(`${GetServerUrl()}/admin/update-procedure/${id}`).then((response) => {
    
  }

  let no = 1;

  return (
    <div className="home-content width-100" style={{width: '100%'}}>
      <div className="sales-boxes width-100 " style={{width: '100%'}}>
        <div className="recent-sales box width-100" style={{width: '100%'}}>
          <div className="title">Risks List <button onClick={() => { navigate('/admin/risks/add')}} className="btn btn-success" style={{marginLeft: 'calc(100% - 220px)'}}>Add Risk</button> </div>
          <div className="sales-details">
            <div className="table-responsive" style={{width: '100%'}}>
              <table className="table" style={{width: '100%'}}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    {/* <th scope="col">Procedure Name</th> */}
                    <th scope="col">Code</th>
                    <th scope="col">Benefit</th>
                    <th scope="col">Detail</th>
                    <th scope="col">Statistics</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.map((item, index) => (
                      <tr key={index +  1}>
                          <th  scope="row">{no++}</th>
                          {/* <td>{user.name}</td> */}
                          <td>{item.code}</td>
                          <td>{item.name}</td>
                          <td>{item.detail}</td>
                          <td>{item.statistics}</td>
                          <td><button onClick={() => { navigate(`/admin/risks/edit/${item._id}`)}} className="btn btn-primary px-3">Edit</button></td>
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

export default Risks