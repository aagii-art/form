import { useState } from "react";

export const Step1 = ({next,a, fdata}) => {
  const inputData = [
    { label: "first name", type: "text", placeholder: " Your first name " },
    { label: "last name", type: "text", placeholder: "Your last name" },
    { label: "username", type: "text", placeholder: "Your username" },
  ];
  
  const errorMessages = {
    "first name": "neree oruul bandi min",
    "last name" : "ovgoo oruul",
    "username" : "herglchn neree oruul"
  }

  const [error, setError] = useState({})
  const inputChange = (e) => {
    a( e.target.name,e.target.value)
    setError( {...error, [e.target.name] : "" } )
    
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
    <div className="  ">

       <h2>Join Us!</h2>
       <p>Please provide all current information accurately.</p>
       {inputData.map((v, i) => {
         return (
           <div key={i}>
             <p className="">{v.label}</p>
             <input
               name={v.label}
               type={v.type}
               value={ fdata[v.label] || "" }
               placeholder={v.placeholder}
               className="border"
               onChange={ inputChange }
              
             />

            { error[v.label] && 
                <p className="text-red-500" > {error[v.label] }  </p>
            }
           </div>
         );
       })}
      <button onClick={handleChange} >next</button>

    </div>
  );
};
