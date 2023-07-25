import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import GetServerUrl from '../GetServerUrl'

const ProName = () => {
  const {register, handleSubmit, reset, formState: {errors}} = useForm()

  const onSubmit = (data) => {
    console.log("data1", data)
    //   axios.post('${GetServerUrl()}/admin/users', data).then((response) => {
      axios.post(`${GetServerUrl()}/admin/procedurenames`, data).then((response) => {
      alert("Procedure Created Successfully");
      reset({name: ''});
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
          <div className="title text-center">Create Procedure </div>
          <div className="form-div">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <div className="mb-3">
                <label for="formGroupExampleInput" className="form-label">Name</label>
                <input type="text" name="name" required className="form-control"  placeholder="Product Name" />
              </div> */}

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" name="lname" {...register("name", {required: true})} className="form-control"  placeholder="write text here" />
                {errors.name && <span className='text-danger'>Procedure Name is required</span>}
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

export default ProName