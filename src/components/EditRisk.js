import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import GetServerUrl from '../GetServerUrl'

const EditRisk = () => {
  const {register, handleSubmit, reset, formState: {errors}} = useForm()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${GetServerUrl()}/admin/risks/${id}`).then((response) => {
      reset(response.data.risk)
      console.log("response : ", response)
    }).catch((err) => {
      alert("Error")
      console.log("Error : ", err)
    })
  }, [])

  const onSubmit = (data) => {
    console.log("data1", data)
    //   axios.post('${GetServerUrl()}/admin/users', data).then((response) => {
      axios.patch(`${GetServerUrl()}/admin/risks/${id}`, data).then((response) => {
      alert("Risk Updated Successfully");
      navigate('/admin/risks');
      console.log("response : ", response)
    }).catch((err) => {
      alert("Error")
      console.log("Error : ", err)
    })
  }

  return (
    <div className="home-content width-100" style={{width: '100%'}}>
      <div className="sales-boxes width-100 " style={{width: '100%'}}>
        <div className="recent-sales box width-100" style={{width: '100%', minHeight: 'calc(100vh - 130px)'}}>
          <div className="title text-center">Edit Risk</div>
          <div className="form-div">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <div className="mb-3">
                <label for="formGroupExampleInput" className="form-label">Name</label>
                <input type="text" name="name" required className="form-control"  placeholder="Product Name" />
              </div> */}
              <div className="mb-3">
                <label className="form-label">Code</label>
                <input type="text" name="fname" {...register("code", {required: true})} className="form-control"  placeholder="write text here" />
                {errors.code && <span className='text-danger'>Risk Code is required</span>}
              </div>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" name="lname" {...register("name", {required: true})} className="form-control"  placeholder="write text here" />
                {errors.name && <span className='text-danger'>Risk Name is required</span>}
              </div>
              <div className="mb-3">
                <label className="form-label">Statistics</label>
                <input type="text" name="key1" className="form-control" {...register("statistics", {required: true})}  placeholder="write text here" />
                {errors.statistics && <span className='text-danger'>Statistics is required</span>}
              </div>
              <div className="mb-3">
                <label className="form-label">Detail</label>
                <input type="text" name="key1" {...register("detail", {required: true})}  className="form-control"  placeholder="write text here" />
                {errors.detail && <span className='text-danger'>Risk Detail is required</span>}
              </div>
              <button className="btn btn-primary" name="submit">Submit</button>
            </form>
          </div>
          {/* <!-- <div className="button">
            <a href="#">See All</a>
          </div> --> */}
        </div>
        
      </div>
    </div>
  )
}

export default EditRisk