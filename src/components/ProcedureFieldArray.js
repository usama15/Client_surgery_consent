import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useFieldArray, Controller } from "react-hook-form";
import NestedArrayField from './NestedArrayField';
import Select from 'react-select';
import GenericProcedureArr from './GenericProcedureArr';
import GetServerUrl from '../GetServerUrl';
import { FiMinus, FiPlay, FiPlus } from "react-icons/fi";
import { IconBase } from 'react-icons';
import { Col, Row } from 'react-bootstrap';
const ProcedureFieldArray = ({ control, register, watch, reset, benPoints, setBenPoints, risPoints, setRisPoints, ids, setIds }) => {
  const [pro, setPro] = useState(0)
  const [procedures, setProcedures] = useState(null)
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "Procedure"
  });

  const cssobj = { width: 'calc(100% - 120px)', display: 'inline-block' }

  console.log("arry benefits length points : ", benPoints)
  console.log("arry risks length points : ", risPoints)


  let proceduresArr = []

  if (watch('Procedure')) {
    proceduresArr = watch('Procedure');
  }

  let proceduresArrLength = 0;

  if (proceduresArr !== null) {
    proceduresArrLength = proceduresArr.length;
  }
  useEffect(() => {
    if (proceduresArrLength === 0) {
      append();
    }
  }, [proceduresArrLength === 0])

  useEffect(() => {
    axios.get(`${GetServerUrl()}/admin/procedures`).then((response) => {
      // console.log("response", response.data)
      let procedureArray = [{ label: "Add New Procedure", value: "Add New Procedure" }];
      response.data.procedures && response.data.procedures.map((item) => procedureArray.push({
        label: item.name,
        value: item.name
      }))
      setProcedures(procedureArray)
    })
  }, [])
  const addP = {
    width:"84%",
borderWidth:1,
borderColor:"black",
opacity:0.5,
marginBottom:10
}
  return (
    <div>
      <div className="row">
        {fields.map((item, index) => {
          return (
            <div className="col-12" key={item.id}>
              {index > 0 && (
                <hr className='w-100 my-4' style={{ borderBottom: '3px solid black' }} />
              )}
              <div className="mb-3">
                {/* <input type="text" placeholder='Search Procedure' style={{width: 'calc(100% - 120px)', display: 'inline-block'}} className='form-control' defaultValue={item.search} {...register(`Procedure[${index}.search]`)} /> */}
                <div style={cssobj}>
                  <Controller

                    name={`Procedure[${index}.name]`}
                    control={control}
                    render={({ field }) => <Select
                      {...field}
                      options={procedures}
                    />}
                  />
                  {/* <Select options={procedures} defaultValue={item.search} {...register(`Procedure[${index}.search]`)} /> */}
                </div>

                <button className='btn ms-3' type='button' onClick={() => {
                  remove(index);
                  ids.splice(index, 1);
                  benPoints.splice(index, 1);
                  risPoints.splice(index, 1);
                }}>

                  {/* <FiPlus color='green' size="35" /> */}
                  <FiMinus color='green' size="29" />

                </button>

              </div>
              {watch(`Procedure[${index}.name]`)?.value === 'Add New Procedure' && (
                <>
                  <div className='mb-3'>

                    <input type="text" className='form-control' {...register(`Procedure[${index}.newname]`)} placeholder="Enter Procedure Name" />
                  </div>
                  <GenericProcedureArr key={index} nestIndex={index} {...{ control, register, watch, reset, setBenPoints, setRisPoints, benPoints, risPoints, ids, setIds }} />
                </>
              )}
              <NestedArrayField key={index} nestIndex={index} {...{ control, register, watch, reset, setBenPoints, setRisPoints, benPoints, risPoints, ids, setIds }} />
            </div>
          )
        })}
      </div>
      <div className="row ">
        <Col  sm="12 ">

          <button className='btn  ' style={addP} type='button' onClick={() => {
            append();
            setPro(pro + 1)
          }}>Add Another Procedure  <FiPlus color='green' size="30" />
          </button>
        </Col>
      </div>
    </div>
  )
 
}

export default ProcedureFieldArray 