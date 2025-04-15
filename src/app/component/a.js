"use client";
import { useState } from "react";

export const Step2 = ({ a, b }) => {
  const [inputValue, setInputValue] = useState({});
  const [error, setError] = useState({});

  const inputData = [
    { label: "Email", type: "email", placeholder: "Your email" },
    { label: "Phone number", type: "text", placeholder: "Your phone number" },
    { label: "Password", type: "password", placeholder: "Your password" },
    { label: "Confirm password", type: "password", placeholder: "Confirm password" },
  ];

  const errMessage = {
    "Email": "Зөв имэйл оруулна уу",
    "Phone number": "Дугаараа зөв оруулна уу",
    "Password": "Нууц үг оруулна уу",
    "Confirm password": "Нууц үг таарахгүй байна",
  };

  const inputChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: null });
  };

  const nextButton = () => {
    const err = {};

    inputData.forEach((v) => {
      const val = inputValue[v.label]?.trim();
      if (!val) {
        err[v.label] = errMessage[v.label];
      }
      if (v.label === "Confirm password" && val !== inputValue["Password"]) {
        err[v.label] = errMessage[v.label];
      }
    });

    if (Object.keys(err).length > 0) {
      setError(err);
    } else {
      setError({});
      a(); // Next
    }
  };

  return (
    <div>
      {inputData.map((v, i) => (
        <div key={i}>
          <p>{v.label}</p>
          <input
            type={v.type}
            name={v.label}
            placeholder={v.placeholder}
            value={inputValue[v.label] || ""}
            onChange={inputChange}
            className="border p-2"
          />
          {error[v.label] && <p className="text-red-500">{error[v.label]}</p>}
        </div>
      ))}
      <button onClick={nextButton}>Next</button>
      <button onClick={b}>Back</button>
    </div>
  );
};
