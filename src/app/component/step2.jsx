"use client"
import { useState } from "react"


export const Step2 = ({a, b, c, fdata}) => {
    const [error, setError] = useState({});

    const inputData = [ 
        { label: "Email", type: "text", placeholder: "Your email"  },
        { label: "Phone number", type: "text", placeholder: "Your phone number"  },
        { label: "Password", type: "password", placeholder: "Your password"  },
        { label: "Confirm password", type: "password", placeholder: "Confirm password"  }
     ]

     const inputChange = (e) => {
       const name = e.target.name;
       const value = e.target.value;
       setError( {...error, [name]: "" } )
       c(name,value);
     }
     const testEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
     }
     const testPhoneNumber = (phoneNumber) => {
        const regex = /^[0-9]{8}$/;
        return regex.test(phoneNumber)
     }
     const nextButton = () => {

        const err = {};
        inputData.forEach( (v) => {
            const val = (fdata[v.label] || "" );
            if( v.label === "Email" && val &&  !testEmail(val)) { err[v.label] = "nonono"}
            if( v.label === "Phone number" && val && !testPhoneNumber(val)) { err[v.label] = "zov dugaar oruulna uu(8n orontoi too)" }
            if( v.label === "Password" && val.length < 6 ) { err[v.label] = "min >= 6!" }
            if( v.label === "Confirm password" && val !== fdata["Password"] ) { err[v.label] = "nuust ug taarahgui baina" }
            if( !val.trim()) { (err[v.label] = "hooson baina!") }

        })
        

        if( Object.keys(err).length > 0 ){
            setError(err)
        }else{
            a();
        }

     }

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
                         placeholder={v.placeholder}
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