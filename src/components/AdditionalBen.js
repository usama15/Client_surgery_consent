import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GetServerUrl from '../GetServerUrl'

const AdditionalBen = () => {
  const [data, setData] = useState(null)
  const [code, setCode] = useState(null)
  const [flag, setFlag] = useState(1)
  const navigate = useNavigate()
  useEffect(() => {
    axios.get(`${GetServerUrl()}/admin/procedures`).then((response) => {
      console.log("response", response.data)
      setData(response.data.procedures)
    })
  }, [flag])

  const delUser = (id, ben) => {
    if (code) {
      console.log("code code code : : : ", code)
      axios.patch(`${GetServerUrl()}/admin/procedure/benefits/${id}`, {code}).then((response) => {
        alert("Benefit Approved Successfully")
        console.log(response)
        setData(data)
        axios.post(`${GetServerUrl()}/admin/benefits`, {code: code, name: ben.name, detail: ben.detail, statistics: ben.statistics}).then((response) => {
          alert("Benefit Created Successfully ");
          
          console.log("response : ", response)
          setCode(null);
          setFlag(flag + 1);
        }).catch((err) => {
          alert("Create ben Error")
          console.log("Create ben Error : ", err)
        })

      }).catch((err) => {
        alert("err")
        console.log("Errror : ", err)
      })
    }
    else {
      alert("Please Enter code before Approving Benefit");
    }
  }
  const rejectFun = (id) => {
    console.log("id -- ", id)
    axios.put(`${GetServerUrl()}/admin/procedure/benefits/${id}`).then((response) => {
      setFlag(flag + 1);
      alert("Benefit Rejected Successfully")
      console.log(response)
      setData(data)
    }).catch((err) => {
      console.log("Errror : ", err)
    })
  }
  let no = 1;

  return (
    <div className="home-content width-100" style={{width: '100%'}}>
      <div className="sales-boxes width-100 " style={{width: '100%'}}>
        <div className="recent-sales box width-100" style={{width: '100%'}}>
          <div className="title">Additional Procedures</div>
          <div className="sales-details">
            <div className="table-responsive" style={{width: '100%'}}>
              
                <table className="table" style={{width: '100%'}}>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Procedure Name</th>
                      <th scope="col">Code</th>
                      <th scope="col">Benefit</th>
                      <th scope="col">Detail</th>
                      <th scope="col">Statistic</th>
                      {/* <th scope="col">Qualification</th> */}
                      <th scope="col">Approve</th>
                      <th scope="col">Reject</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.map((user, index) => (
                      user.additionalBenefits && user.additionalBenefits.filter(pro => pro?.status === "Pending").map((ben, ind) => (
                      <tr key={index + ind}>
                          <th  scope="row">{no++}</th>
                          {/* <th  scope="row">{index + 1 + ind}</th> */}
                          <td>{user.name}</td>
                          <td>{ben.name}</td>
                          <td>{ben.detail}</td>
                          <td>{ben.statistics}</td>
                          <td><form><input type="text" required className='form-control' onChange={(e) => setCode(e.target.value)} placeholder='Enter Code' /></form></td>
                          {/* <td>{ben.qualifications}</td> */}
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

export default AdditionalBen