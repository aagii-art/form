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
            if( v.label === "Email" && val &&  !testEmail(val)) { err[v.label] = "Мэйл хаягаа оруулна уу"}
            if( v.label === "Phone number" && val && !testPhoneNumber(val)) { err[v.label] = "Утасны дугаараа оруулна уу." }
            if( v.label === "Password" && val.length < 6 ) { err[v.label] = "Нууц үгээ оруулна уу" }
            if( v.label === "Confirm password" && val !== fdata["Password"] ) { err[v.label] = "Нууц үгээ давтаж оруулна уу" }
            if( !val.trim()) { (err[v.label] = "хоосон байна !") }
        })
        if( Object.keys(err).length > 0 ){
            setError(err)
        }else{
            a();
        }
     }

    return ( 
        <div className="flex flex-col h-full" >
           <img src=" pinecone-logo.svg " className=" h-[60px] w-[60px] " alt="" />
           <h2 className="text-[26px] font-semibold text-foreground my-2 " > Join Us! 😎 </h2>
           <p className="text-[18px] text-[#8E8E8E] whitespace-nowrap mb-4 " >Please provide all current information accurately.</p>
           { inputData.map((v,i) => {
                return (
                    <div key={i} >
                        <p className=" mt-2 leading-4 text-[#334155] font-semibold text-sm" > {v.label}<span className="text-red-500 ml-[5px]" >*</span> </p>
                        <input type={v.type}
                         name={v.label}
                         value={ fdata[v.label] || "" }
                         onChange={inputChange}
                         placeholder={v.placeholder}
                         className={` text-[#121316] outline-none  placeholder-[#CBD5E1]  p-3  mt-2 w-full leading-5 rounded-md 
                             ${ error[v.label] ? "  border border-red-500 focus:border focus:border-[#0CA5E9] "
                             :  "border border-[#CBD5E1] focus:border-[#0CA5E9] focus:border " } `}/>

                         { error[v.label] && 
                             <p className="text-red-500  text-xs mb-2" >{error[v.label]}</p>
                         }
                    </div>
                )
            })}
            <div className=" mt-auto flex gap-2 h-[44px] " >
               <button onClick={b} className=" border border-[#CBD5E1] w-[30%] hover:bg-gray-100 h-full rounded-md  " >
                  &lt; Back
               </button>
               <button onClick={nextButton} className="bg-[#121316] text-white w-[70%] hover:opacity-80 rounded-md h-full " >
                  Continue 2/3 &gt;
               </button>
            </div>
        </div>
    )
}