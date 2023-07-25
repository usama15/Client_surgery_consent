import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import GetServerUrl from '../GetServerUrl'

const FormComponent = () => {
  const {register, handleSubmit, formState: {errors}} = useForm()

  const onSubmit = (data) => {
    console.log("data1", data)
    const nameObj={firstname:data.firstname,  lastname:data.lastname,   practicename:data.practicename }
    localStorage.setItem("fname", nameObj.firstname)
    localStorage.setItem("lname", nameObj.lastname)
    localStorage.setItem("pname", nameObj.practicename)

    // console.log(data.firstname)  

    // console.log(data.lastname)
    // console.log(data.practicename)
      axios.post(`${GetServerUrl()}/admin/users`, data).then((response) => {
      alert("User Created Successfully");
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
          <div className="title text-center">Create user</div>
          <div className="form-div">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <div className="mb-3">
                <label for="formGroupExampleInput" className="form-label">Name</label>
                <input type="text" name="name" required className="form-control"  placeholder="Product Name" />
              </div> */}
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input type="text" name="fname" {...register("firstname", {required: true})} className="form-control"  placeholder="write text here" />
                {errors.firstname && <span className='text-danger'>First Name is required</span>}
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input type="text" name="lname" {...register("lastname", {required: true})} className="form-control"  placeholder="write text here" />
                {errors.lastname && <span className='text-danger'>Last Name is required</span>}
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="text" name="key1" className="form-control" {...register("email", {required: true})}  placeholder="write text here" />
                {errors.email && <span className='text-danger'>Email is required</span>}
              </div>
              <div className="mb-3">
                <label className="form-label">Qualifications</label>
                <input type="text" name="key1" {...register("qualifications", {required: true})}  className="form-control"  placeholder="write text here" />
                {errors.qualifications && <span className='text-danger'>Qualification is required</span>}
              </div>
              <div className="mb-3">
                <label className="form-label">Practice Name</label>
                <input type="text" name="key1" {...register("practicename", {required: true})} className="form-control"  placeholder="write text here" />
                {errors.practicename && <span className='text-danger'>Practice Name is required</span>}
              </div>
              <div className="mb-3">
                <label className="form-label">Passwod</label>
                <input type="text" name="key1" className="form-control" {...register("password", {required: true, minLength: 5})}  placeholder="write text here" />
                {errors.password && <span className='text-danger'>Password is required and minmux length is 5</span>}
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

export default FormComponent