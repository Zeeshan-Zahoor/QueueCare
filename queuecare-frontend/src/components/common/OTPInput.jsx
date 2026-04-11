import React from 'react'
import { useRef, useState, useEffect } from 'react';

export default function OTPInput({
    length = 6,
    onChange,
    onComplete,
    className = "",
    inputClassName = "",
}) {
    const [otp, setOtp] = useState(Array(length).fill(""));
    const inputsRef = useRef([]);

    //notify parent on change
    useEffect(() => {
        const value = otp.join("");
        onChange && onChange(value);

        if(value.length === length && !otp.includes("")) {
            onComplete && onComplete(value);
        }
    }, [otp])

    const handleChange = (value, index) => {
        if(!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if(value && index < length - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if(e.key === "Backspace") {
            if(!otp[index] && index > 0) {
                inputsRef.current[index - 1].focus();
            }
        }
    };

    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);

        if(!pasteData) return;

        const newOtp = pasteData.split("");
        const filledOtp = [...newOtp, ...Array(length).fill("")].slice(0, length);

        setOtp(filledOtp);

        inputsRef.current[Math.min(pasteData.length - 1, length - 1)]?.focus();
    };


  return (
    <div className={`flex gap-1 ${className}`} onPaste={handlePaste}>
        {otp.map((digit, index) => (
            <input 
                key={index}
                type='text'
                inputMode='numeric'
                maxLength={1}
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg bg-gray-50 focus:border-[#1a2744] outline-none ${inputClassName}`}
            />
        ))}
    </div>
  )
}
