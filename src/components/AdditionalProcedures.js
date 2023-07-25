import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GetServerUrl from '../GetServerUrl'

const AdditionalProcedures = () => {
  const [data, setData] = useState(null)
  const [flag, setFlag] = useState(1);
  const navigate = useNavigate()
  useEffect(() => {
    axios.get(`${GetServerUrl()}/admin/procedures`).then((response) => {
      // console.log("response", response.data)
      setData(response.data.procedures)
    })
  }, [flag])

  const delUser = (id) => {
    axios.delete(`${GetServerUrl()}/admin/procedures/${id}`).then((response) => {
      alert("Procedure Deleted Successfully")
      console.log(response)
      // setData(data)
      setFlag(flag + 1);
    }).catch((err) => {
      console.log("Errror : ", err)
    })
  }

  const acceptPro = (id, user) => {
    user['status'] = 'Approved';
    // axios.delete(`https://doctor-node-api.herokuapp.com/admin/procedures/${id}`).then((response) => {
    axios.patch(`${GetServerUrl()}/admin/procedures/${id}`, user).then((response) => {
      alert("Procedure Approved Successfully")
      console.log(response)
      // setData(data)
      setFlag(flag + 1);
    }).catch((err) => {
      console.log("Errror : ", err)
    })
  }

  return (
    <div className="home-content width-100" style={{width: '100%'}}>
      <div className="sales-boxes width-100 " style={{width: '100%'}}>
        <div className="recent-sales box width-100" style={{width: '100%'}}>
          <div className="title">Additional Procedures </div>
          <div className="sales-details">
            <div className="table-responsive" style={{width: '100%'}}>
              <table className="table" style={{width: '100%'}}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Benefits</th>
                    <th scope="col">Risks</th>
                    <th scope="col">Accept</th>
                    <th scope="col">Reject</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.filter(item => item.status === 'Pending').map((user, index) => (
                    <tr key={index}>
                        <th  scope="row">{index + 1}</th>
                        <td>{user.name}</td>
                        <td style={{width: '60%'}}>{user.benefits && (
                            <table className='table'>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Code</th>
                                    <th>Benefit</th>
                                    <th>Explaination</th>
                                    <th>Statistics</th>
                                </tr>
                                </thead>
                                <tbody>
                                {user.benefits && user.benefits.map((benefit, ind) => (
                                    <tr key={ind}>
                                        <td>{ind + 1}</td>
                                        <td>{benefit.code}</td>
                                        <td>{benefit.name}</td>
                                        <td>{benefit.detail}</td>
                                        <td>{benefit.statistics}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}</td>
                        <td style={{width: '60%'}}>{user.risks && (
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Code</th>
                                        <th>Risk</th>
                                        <th>Explaination</th>
                                        <th>Statistics</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {user.risks && user.risks.map((risk, ind) => (
                                    <tr key={ind}>
                                        <td>{ind + 1}</td>
                                        <td>{risk.code}</td>
                                        <td>{risk.name}</td>
                                        <td>{risk.detail}</td>
                                        <td>{risk.statistics}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}</td>
                        <td><button onClick={() => {acceptPro(user._id, user)}} className="btn btn-success px-3">Accept</button></td>
                        <td><button onClick={() => delUser(user._id)} className="btn btn-danger">Reject</button></td>
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

export default AdditionalProcedures