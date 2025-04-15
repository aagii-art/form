"use client"
import { useState } from "react"


export const Step2 = ({a, b, c, fdata}) => {

    // const [ inputValue, setInpuValue ] = useState({});
    const [error, setError] = useState({});

    const inputData = [ 
        { label: "Email", type: "email", placeholder: "Your email"  },
        { label: "Phone number", type: "email", placeholder: "Your email"  },
        { label: "Password", type: "email", placeholder: "Your email"  },
        { label: "Confirm password", type: "email", placeholder: "Your email"  }
     ]
     const errMessage = {
        "Email": "zuv email oruul",
        "Phone number": "dugaaraa zov oruul",
        "Password": "password oruul",
        "Confirm password": "nuuts ug taarahgui baina"
     }

     const inputChange = (e) => {
       const name = e.target.name;
       const value = e.target.value;
       setError( {...error, [name]: "" } )
       c(name,value);
     }
     console.log(error);
     
     const nextButton = () => {
        const err = {};
        inputData.forEach( (v) => {
            const val = fdata[v.label]?.trim();
            if( !val ){
                err[v.label] = errMessage[v.label]
            }
        })

        if( Object.keys(err).length > 0 ){
            setError(err)
        }else{
            setError({})
            a();
        }


     }
    console.log(error);
    

    return ( 
        <div>

           { inputData.map((v,i) => {
                return (
                    <div key={i} >
                        <p> {v.label} </p>
                        <input type={v.type}
                         name={v.label}
                         value={ fdata[v.label] || "" }
                         onChange={inputChange}
                         className="border" />

                         { error[v.label] && 
                             <p className="text-red-500" >{error[v.label]}</p>

                         }
                    </div>
                    
                )
            })}
            <button onClick={nextButton} >next</button>
            <button onClick={b} >back</button>
        </div>
    )
}