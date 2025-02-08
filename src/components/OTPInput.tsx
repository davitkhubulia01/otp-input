import React, { useRef, useState } from 'react'

interface OTPInputProps {
  length: number
}

const OTPInput = (props: OTPInputProps) => {
  const [otp, setOtp] = useState(Array(props.length).fill(''))
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const inputRef = useRef<Array<HTMLInputElement>>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value
    if (value.match(/[^0-9]/)) {
      return
    }
    const newOtp = [...otp]
    
    // If user tries to fill other than the first input, this code automatically fills in the first empty input
    const firstEmptyIndex = newOtp.findIndex((el) => el === "")
    newOtp[firstEmptyIndex] = value

    setOtp(newOtp)
    if ((index < otp.length - 1 && newOtp[index] !== "")) {
      inputRef.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp]
      newOtp[index] = ''
      if (otp[index] === "") newOtp[index-1] = ''
      setOtp(newOtp)
      if (index > 0) {
        inputRef.current[index - 1].focus()
      }
    }
  }

  const handleFocus = (index: number) => {
    setFocusedIndex(index)
  }

  const handleBlur = () => {
    setFocusedIndex(null)
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {otp.map((el, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={el}
          placeholder='-'
          onChange={(e) => handleChange(e, index)}
          onBlur={handleBlur}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={() => handleFocus(index)}
          ref={(el) => (inputRef.current[index] = el as HTMLInputElement)}
          style={{
            outline: 'none',
            width: "40px",
            height: "40px",
            boxShadow: focusedIndex === index ? '0px 0px 3px 1px grey' : '',
            margin: "0 5px",
            borderRadius: 10,
            border: '1px solid lightgray',
            textAlign: "center",
            fontSize: "20px"
          }}
        />
      ))}
    </div>
  )
}

export default OTPInput
