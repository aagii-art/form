import { useState } from "react";

export const Step1 = ({next,a, fdata}) => {
  const inputData = [
    { label: "First name", type: "text", placeholder: " Your first name " },
    { label: "Last name", type: "text", placeholder: "Your last name" },
    { label: "Username", type: "text", placeholder: "Your username" },
  ];
  
  const errorMessages = {
    "First name": "Нэрээ оруулна уу.",
    "Last name" : "Овгоо оруулна уу.",
    "Username" : "Хэрэглэгчийн нэрээ оруулна уу "
  }

  const [error, setError] = useState({})
  const inputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    a(name,value)
    setError( {...error, [name] : "" } )
    
  }
 
   const handleChange = () => {

    const newErrors = {};
    inputData.forEach( (v) => {
      if( !fdata[v.label]?.trim() ){
        newErrors[v.label] = errorMessages[v.label]
      }
    })

    if(Object.keys(newErrors).length === 0 ) {
      next();
    }else{ 
      setError(newErrors)
    }
   }
    

  return (
    <div className=" flex flex-col  ">
        <img src="pinecone-logo.svg" className="h-[60px] w-[60px] " alt="" />
       <h2 className="text-[26px] font-semibold text-foreground " >Join Us! 😎 </h2>
       <p className="text-[18px] text-[#8E8E8E] whitespace-nowrap mb-7 " >Please provide all current information accurately.</p>
       {inputData.map((v, i) => {
         return (
           <div key={i} className="" >
             <p className=" block mt-2 leading-4 text-[#334155] font-semibold text-sm ">{v.label} <span className="text-red-500" >*</span> </p>
             <input
               name={v.label}
               type={v.type}
               value={ fdata[v.label] || "" }
               placeholder={v.placeholder}
               className="  border-3 border-[#CBD5E1] text-[#121316]  placeholder-[#CBD5E1]  p-3 focus:outline-[#0CA5E9] mt-2 w-full leading-5 rounded-md  "
               onChange={ inputChange }
             />

            { error[v.label] && 
                <p className="text-red-500 text-xs mb-2 " > {error[v.label] }  </p>
            }
           </div>
         );
       })}
      <button  onClick={handleChange} className=" mt-auto w-full bg-[#121316] text-white h-[44px] hover:opacity-80 duration-300 rounded-md " >Continue 1/3 <span className="ml-[10px]" >&gt;</span>  </button>

    </div>
  );
};
