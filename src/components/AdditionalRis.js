import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GetServerUrl from '../GetServerUrl'

const AdditionalRis = () => {
  const [data, setData] = useState(null)
  const [code, setCode] = useState(null)
  const [flag, setFlag] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    axios.get(`${GetServerUrl()}/admin/procedures`).then((response) => {
      console.log("response", response.data)
      setData(response.data.procedures)
    })
  }, [flag])

  const delUser = (id, ben) => {
    if(code) {
      console.log("Code code ::::", code)
      axios.patch(`${GetServerUrl()}/admin/procedure/risks/${id}`, {code}).then((response) => {
      // axios.patch(`http://localhost:5000/admin/procedure/risks/${id}`, {code}).then((response) => {
        alert("Risk Approved Successfully")
        console.log(response)
        axios.post(`${GetServerUrl()}/admin/risks`, {code: code, name: ben.name, detail: ben.detail, statistics: ben.statistics}).then((response) => {
          alert("Risk Created Successfully");
          console.log("response : ", response);
          setCode(null)
          setData(data)
          setFlag(flag + 1);
        }).catch((err) => {
          alert("Create ris Error")
          console.log("Create ben Error : ", err)
        })
      }).catch((err) => {
        console.log("Errror : ", err)
      })
    }
    else{
      alert("Please Enter Code before Approving.");
    }
  }
  const rejectFun = (id) => {
    axios.put(`${GetServerUrl()}/admin/procedure/risks/${id}`).then((response) => {
      alert("Risk Rejected Successfully")
      console.log(response)
      setFlag(flag + 1);
    }).catch((err) => {
      console.log("Errror : ", err)
    })
  }
  let no = 1;
  return (
    <div className="home-content width-100" style={{width: '100%'}}>
      <div className="sales-boxes width-100 " style={{width: '100%'}}>
        <div className="recent-sales box width-100" style={{width: '100%'}}>
          <div className="title">Additional Risks</div>
          <div className="sales-details">
            <div className="table-responsive" style={{width: '100%'}}>
              <table className="table" style={{width: '100%'}}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Procedure Name</th>
                    <th scope="col">Benefit</th>
                    <th scope="col">Detail</th>
                    <th scope="col">Statistic</th>
                    <th scope="col">Code</th>
                    {/* <th scope="col">Qualification</th> */}
                    <th scope="col">Approve</th>
                    <th scope="col">Reject</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.map((user, index) => (
                    user.additionalRisks && user.additionalRisks.filter(pro => pro?.status === "Pending").map((ben, ind) => (
                    <tr key={index + ind}>
                        <th  scope="row">{no++}</th>
                        {/* <th  scope="row">{index + 1 + ind}</th> */}
                        <td>{user.name}</td>
                        <td>{ben.name}</td>
                        <td>{ben.detail}</td>
                        <td>{ben.statistics}</td>
                        <td><form><input type="text" className='form-control' required placeholder="Enter Code" onChange={(e) => setCode(e.target.value)} /></form></td>
                        <td><button onClick={() => delUser(ben._id, ben)} className="btn btn-success">Approve</button></td>
                        <td><button onClick={() => rejectFun(ben._id)} className="btn btn-danger px-4">Reject</button></td>
                    </tr>
                    )) 
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

export default AdditionalRis