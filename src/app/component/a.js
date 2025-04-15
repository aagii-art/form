import { useState } from "react";

export const Step1 = ({ a }) => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  const inputData = [
    { name: "firstName", label: "First Name", type: "text", placeholder: "Your first name" },
    { name: "lastName", label: "Last Name", type: "text", placeholder: "Your last name" },
    { name: "username", label: "Username", type: "text", placeholder: "Your username" },
  ];

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

   console.log(inputs);
   
  const handleNext = () => {
    const newErrors = {};
    inputData.forEach((field) => {
      if (!inputs[field.name]?.trim()) {
        newErrors[field.name] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      a(); // дараагийн алхам руу шилжинэ
    } 
  };

  return (
    <div className="p-4 bg-white">
      <h2 className="text-xl font-bold mb-2">Join Us!</h2>
      <p className="mb-4">Please provide all current information accurately.</p>
      {inputData.map((v, i) => (
        <div key={i} className="mb-4">
          <p className="mb-1">{v.label}</p>
          <input
            name={v.name}
            type={v.type}
            placeholder={v.placeholder}
            className="border p-2 w-full"
            value={inputs[v.name] || ""}
            onChange={handleChange}
          />
          {errors[v.name] && (
            <p className="text-red-500 text-sm">{errors[v.name]}</p>
          )}
        </div>
      ))}
      <button
        onClick={handleNext}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </div>
  );
};
