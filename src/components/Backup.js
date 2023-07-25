import axios from 'axios'
import Axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import FileDownload from "js-file-download";
import GetServerUrl from '../GetServerUrl'

const Backup = () => {
  const {register, handleSubmit, reset, formState: {errors}} = useForm()
  const navigate = useNavigate();
  const [doc, setDoc] = useState('');
  const onSubmit = (data) => {
    console.log("data1", data)
    const formData = new FormData();
    formData.append("procedures", doc);
    //   axios.post('${GetServerUrl()}/admin/users', data).then((response) => {
      axios.post(`${GetServerUrl()}/admin/import-data/`, formData).then((response) => {
      alert("Data Imported Successfully");
      // reset('');
      // navigate('/admin/benefits');
      console.log("response : ", response)
    }).catch((err) => {
      alert("Error")
      console.log("Error : ", err)
    })
  }

  const exportData = () => {
    const rend = Math.floor(Math.random() * 100) + 1;
    // axios.get('${GetServerUrl()}/admin/export-procedures/').then((response) => {
    //     console.log("Response : ", response);
    //     alert("Files exported successfully.");
    // }).catch((err) => {
    //     console.log("error : ", err);
    // })
    const name = "database-backup"+rend+".xlsx";
      Axios({url: `${GetServerUrl()}/admin/export-procedures/`, method: "GET", responseType: "blob",}).then((res) => {
        console.log(res);
        FileDownload(res.data, name);
        alert("Backup Downloaded Successfully");
      }).catch((error) => {
      console.log(error);
    }) 
  }

  return (
    <div className="home-content width-100" style={{width: '100%'}}>
      <div className="sales-boxes width-100 " style={{width: '100%'}}>
        <div className="recent-sales box width-100" style={{width: '100%', minHeight: 'calc(100vh - 130px)'}}>
          {/* <div className="title text-center">Create Benefit</div> */}
          <div className="form-div">
          <div className='w-100 text-center'>
            <h3 className='my-4'>Export Files</h3>
            <button className='btn btn-info' onClick={() => exportData()}>Take Database Backup</button>
          </div>
            <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
              <div className="mb-3">
                <label className="form-label">File</label>
                <input type="file" name="key1" {...register("document", {required: true})} onChange={(e) => setDoc(e.target.files[0])}  className="form-control"  placeholder="Select File" />
                {errors.document && <span className='text-danger'>Document is required</span>}
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

export default Backup