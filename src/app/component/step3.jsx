import { useRef, useState } from "react";

export const Step3 = ({a,b,fdata, c}) => {
    const [zurag, setzurag] = useState(null)
    const inputrefee = useRef(null)
    const [err, seterr] = useState({});
    const handleImage = (e) => {
        const file = e.target.files[0]
        if(file){
            setzurag(file)
            seterr({...err, zurag : null } )
        }
    }

    const handleClick = () => {
        inputrefee.current.click();
    }
    const remove = () => {
        setzurag(null)
        inputrefee.current.value = null;
    }
    const testAge = (v) => {
        const born = new Date(v);
        const today = new Date();
        const age = today.getFullYear() - born.getFullYear();
        const month = today.getMonth() - born.getMonth();
        return age > 18 || (age === 18 && month >= 0 )
    }
    const next = () => {
        const error = {};        
        if(!fdata.birthdata){
           error.birthdata = "Төрсөн өдрөө оруулна уу";
        }else if( !testAge(fdata.birthdata) ){
            error.birthdata = "Та 18 ба түүнээс дээш настай байх ёстой.";
        }
        if(!zurag){
            error.zurag = "Профайл зурагаа оруулна уу";
        }
        seterr(error);
        if( Object.keys(error).length === 0 ){
           console.log(fdata);
            localStorage.removeItem("formdata")
            a();
        }
    }
    return (
        <div className="flex flex-col h-full" >
           <img src="pinecone-logo.svg" className="h-[60px] w-[60px] " alt="" />
           <h2 className="text-[26px] font-semibold text-foreground my-2 " >Join Us! 😎 </h2>
           <p className="text-[18px] text-[#8E8E8E] whitespace-nowrap mb-4 " >Please provide all current information accurately.</p>
           <p className=" mt-2 leading-4 text-[#334155] font-semibold text-sm" >Date of birth <span className="text-red-500 ml-[5px]" >*</span> </p>
           <input type="date" 
              value={ fdata.birthdata || "" }
              className=" border-3 border-[#CBD5E1] text-[#121316]  placeholder-[#CBD5E1]  p-3 focus:outline-[#0CA5E9] mt-2 w-full leading-5 rounded-md"
              onChange={ (e) =>{ 
                c("birthdata", e.target.value);
                seterr( { ...err, birthdata: null } )
              }}
            /> 
             { err.birthdata && 
                <p className="text-red-500 text-xs  " > {err.birthdata} </p>
             }

           <p className="  mt-2 leading-4 text-[#334155] font-semibold text-sm" > Profile image <span className="text-red-500 ml-[5px]" >*</span> </p>
            <div onClick={handleClick} className=" mt-2 border rounded-md w-[100%] h-[200px] bg-gray-100 
                flex flex-col justify-center items-center border-[#CBD5E1] cursor-pointer gap-2 " >
                <div className=" bg-white w-7 h-7 rounded-full flex justify-center items-center" >
                   <img src="img.svg" alt="" />
                </div>
               <input type="file" onChange={handleImage} ref={inputrefee} className="hidden" />

                { zurag ? (
                    <img src={URL.createObjectURL(zurag)} alt="" className="h-full w-full" />
                ) : (
                    <p className="text-sm" > Browse or Drop Image </p>
                )
                }
                { zurag && 
                   <button onClick={ (e) => { e.stopPropagation(); remove(); } } > remove </button>
                }
             </div>
                { err.zurag && 
                    <p className="text-red-500 text-xs " > {err.zurag} </p>
                }
            <div className=" mt-auto flex gap-2  h-[44px] " >
              <button onClick={b} className=" border border-[#CBD5E1] w-[30%] hover:bg-gray-100 h-full rounded-md  " >
                  &lt; Back
               </button>
               <button onClick={next} className="bg-[#121316] text-white w-[70%] hover:opacity-80 rounded-md h-full " >
                   Continue 3/3 &gt;
               </button>

            </div>
          
        </div>
    )
}