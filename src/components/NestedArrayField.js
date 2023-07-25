import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useFieldArray } from "react-hook-form";
import { AiOutlineMinus } from 'react-icons/ai';
import GetServerUrl from '../GetServerUrl';


const NestedArrayField = ({ nestIndex, control, register, watch, reset, setBenPoints, setRisPoints, benPoints, risPoints, ids, setIds }) => {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)
  const [num, setNum] = useState(0)
  
  const {
      fields: benefitFields,
      remove: benefitRemove,
      append: benefitAppend 
    } = useFieldArray({ control, name: `Procedure[${nestIndex}].benefits` }) 
    
    
    const {
        append: riskAppend,
        fields: riskFields,
        remove: riskRemove
    } = useFieldArray({control, name: `Procedure[${nestIndex}].risks`})

    let proceduresArr = []

    if(watch('Procedure')) {
        proceduresArr = watch('Procedure');
    }
    
    useEffect(() => {
        if(watch(`Procedure[${nestIndex}.name]`)) {
        console.log("watch Select Procedure : ", watch(`Procedure[${nestIndex}.name]`))
        const search = watch(`Procedure[${nestIndex}.name]`);
        axios.get(`${GetServerUrl()}/admin/search?query=${search.value}`).then((response) => {
            // setProcedure(response.data.procedure)
            // setPid(procedure._id)
            alert("ADFdf")
            // const dummy = response.data.procedure
            // console.log(" dummy one ", dummy)
            // setBen(dummy.benefits.length)
            // setRisk(dummy.risks.length)
            console.log(response.data)
            // setBen(response.data.procedure.benefits.length)
            // console.log(data)
            // reset(resetObj)

            const uniBenifts = response.data.procedure.benefits;
            const uniRisks = response.data.procedure.risks;
            
            // if (proceduresArr.length > 1) {
            //     alert("contains : ", proceduresArr.length);
            //     let allBens = [...proceduresArr.map(pro => pro.benefits)]
            //     let sepBens = []
            //     for(let i=0; i < allBens.length; i++) {
            //         sepBens = [...sepBens, ...allBens[i]]
            //     }
            //     console.log("All to all benefits : ", allBens);
            //     console.log("All single benefits : ", sepBens);
            //     console.log("Response data benefits : ", response.data.procedure.benefits);
            //     response.data.procedure.benefits.map((item) => {
            //         // console.log("item.code : ", item.code)
            //         let flag = false;
            //         for(let a = 0; a < sepBens.length; a++){
            //             // console.log("sepbens[index]", sep)
            //             if(item.code === sepBens[a].code){
            //                 flag =true;
            //             }
            //         }
            //         if(flag === false){
            //             uniBenifts = [...uniBenifts, item]
            //         }
            //     })
                
            //     let allRis = [...proceduresArr.map(pro => pro.risks)]
            //     let sepRis = []
            //     for(let i=0; i < allRis.length; i++) {
            //         sepRis = [...sepRis, ...allRis[i]]
            //     }
                
            //     response.data.procedure.risks.map((item) => {
            //         // console.log("item.code : ", item.code)
            //         let flag = false;
            //         for(let a = 0; a < sepRis.length; a++){
            //             // console.log("sepRis[index]", sep)
            //             if(item.code === sepRis[a].code){
            //                 flag =true;
            //             }
            //         }
            //         if(flag === false){
            //             uniRisks = [...uniRisks, item]
            //         }
            //     })

            //     console.log("Uni unique Benefit : ", uniBenifts)
                
            //     console.log("+++++++++++++++++++++++++++++")
            //     console.log("+++++++++++++++++++++++++++++")
            //     console.log("+++++++++++++++++++++++++++++")
            //     console.log("Unique benefits : ", uniBenifts)
            // } else {
            //     alert("empty");
            //     uniBenifts = response.data.procedure.benefits; 
            //     uniRisks = response.data.procedure.risks; 
            // }
            const bens = response.data.procedure.benefits

            // benefitAppend(benObj)
            setIds([...ids, response.data.procedure._id])
            benefitAppend(uniBenifts)
            // benefitAppend(response.data.procedure.benefits)
            if(uniBenifts){
                setBenPoints([...benPoints, uniBenifts.length])
            } else {
                setBenPoints([...benPoints, 0])
            }
            const rises = response.data.procedure.risks
            if (uniRisks) {
                setRisPoints([...risPoints, uniRisks.length])
            } else {
                setRisPoints([...risPoints, 0])
            }
            riskAppend(uniRisks)
            setNum(num+1);
            setCount(count+1);
            setCount2(count2+1);
        }).catch((err) => {
            console.log("Error : ", err)
        })

    }        
  }, [watch(`Procedure[${nestIndex}.name]`)?.value])
  
    let benefitsArr = [];
    
    if(watch(`Procedure[${nestIndex}].benefits`)){
        benefitsArr[nestIndex] = watch(`Procedure[${nestIndex}].benefits`);
    }
    console.log("Watcg pro ", watch(`Procedure[${nestIndex}].benefits`))
    console.log("Benfit array", benefitsArr[nestIndex]);
    // console.log(" length of array : ",firstname.length)
    
    let arrlength = [];
    if(benefitsArr[nestIndex]){
        console.log("length error : ", benefitsArr[nestIndex])
        arrlength[nestIndex] =  benefitsArr[nestIndex].length;
    }
    console.log(`length ${nestIndex} : `,arrlength[nestIndex]);
    
    let risksArr =[];
    if(watch(`Procedure[${nestIndex}].risks`)){
        risksArr[nestIndex] = watch(`Procedure[${nestIndex}].risks`);
    }
    console.log(risksArr);

    let arrlength2 = [];
    if(risksArr[nestIndex]){
        arrlength2[nestIndex] = risksArr[nestIndex].length;
    }
    console.log("length : ",arrlength2);

  return (
    <div>
        {num > 0 && (
            <h4>Benefits Of Procedure</h4>
        ) }
        {benefitFields.map((item, k) => {
            return (
                <div key={k}>                    
                    {/* <h4>nest index arrlenght: {arrlength[nestIndex]}</h4> */}
                    {k + 1 >= arrlength[nestIndex] || count === 0  ? (
                        <>
                            <div className="row">
                                <div className='col-6'>
                                    <input type="text" placeholder='Enter Benefit Name' className="form-control" defaultValue={item.name} {...register(`Procedure[${nestIndex}].benefits[${k}].name`)} />
                                </div>
                                <div className='col-6'>
                                    <input type="text" placeholder='Enter Benefit Statics' className="form-control" defaultValue={item.statistics} {...register(`Procedure[${nestIndex}].benefits[${k}].statistics`)} />
                                </div>
                            </div>
                            <div className="col my-2">
                                <div className='lft-div'>
                                    <input type="text" defaultValue={item.detail} {...register(`Procedure[${nestIndex}].benefits[${k}].detail`)} className="form-control" placeholder="Add Benefit" />
                                </div>
                                <div className='button-div'>
                                    <button type="button" className="btn btn-danger my-2" onClick={() => benefitRemove(k)}><AiOutlineMinus /></button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                        <table className="table">
                            {k < 1 && (
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Benefit</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Statics</th>
                                        <th scope="col">Remove</th>
                                    </tr>
                                </thead>
                            ) }
                            <tbody>
                                <tr>
                                    <th style={{width: '4%'}} scope="row">{k + 1}</th>
                                    <td style={{width: '18%'}} >{benefitsArr[nestIndex] && benefitsArr[nestIndex][k].name}</td>
                                    <td style={{width: '44%'}}>{benefitsArr[nestIndex] && benefitsArr[nestIndex][k].detail}</td>
                                    <td style={{width: '18%'}}>{benefitsArr[nestIndex] && benefitsArr[nestIndex][k].statistics}</td>
                                    <td style={{width: '7%'}}><button type='button' className='btn btn-info px-1' onClick={() => benefitRemove(k)}>Remove</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                    )}
                </div>
            )
        })}
        {num > 0 && (
            <>
                <button type='button' className='btn btn-info mb-3' onClick={() => {
                    benefitAppend({name: "", statistics: "", detail: ""});
                    if(arrlength[nestIndex] > 0) {
                    setCount(1)
                    }
                    }}>Add Another Benefit</button>
                <h4>Risks Of Procedure</h4>
            </>
        )}
        {riskFields.map((item, k) => {
            return (
                <div key={k}>
                    {k + 1 >= arrlength2[nestIndex] || count2 === 0 ? (
                        <>
                            <div className="row">
                                <div className='col-6'>
                                    <input type="text" placeholder='Enter Risks Name' className="form-control" defaultValue={item.name} {...register(`Procedure[${nestIndex}].risks.${k}.name`)} />
                                </div>
                                <div className='col-6'>
                                    <input type="text" placeholder='Enter Risks Statics' className="form-control" defaultValue={item.statistics} {...register(`Procedure[${nestIndex}].risks.${k}.statistics`)} />
                                </div>
                            </div>
                            <div className="col my-2">
                                <div className='lft-div'>
                                    <input type="text" defaultValue={item.detail} {...register(`Procedure[${nestIndex}].risks.${k}.detail`)} className="form-control" placeholder="Add Risk" />
                                </div>
                                <div className='button-div'>
                                    <button type='button' className="btn btn-danger my-2"  onClick={() => riskRemove(k)}><AiOutlineMinus /></button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <table className="table">
                                {k < 1 && (
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Risk</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Statics</th>
                                            <th scope="col">Remove</th>
                                        </tr>
                                    </thead>
                                ) }
                                <tbody>
                                    <tr>
                                        <th style={{width: '4%'}} scope="row">{k + 1}</th>
                                        <td style={{width: '18%'}} >{risksArr[nestIndex] && risksArr[nestIndex][k].name}</td>
                                        <td style={{width: '44%'}}>{risksArr[nestIndex] && risksArr[nestIndex][k].detail}</td>
                                        <td style={{width: '18%'}}>{risksArr[nestIndex] &&risksArr[nestIndex][k].statistics}</td>
                                        <td style={{width: '7%'}}><button type='button' className='btn btn-info px-1' onClick={() => riskRemove(k)}>Remove</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            )
        })}
        {num > 0 && (
            <button type="button" onClick={() => {
                riskAppend({name: "", statistics: "", detail: ""});
                if(arrlength2[nestIndex] > 0) {
                setCount2(1);
                }
            }} className='btn btn-info mb-3'>Add Another Risk</button>
        )}
    </div>
  )
}

export default NestedArrayField