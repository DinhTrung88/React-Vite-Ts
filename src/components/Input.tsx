// import React, { ChangeEvent, DetailedHTMLProps, HtmlHTMLAttributes, InputHTMLAttributes, RefObject } from 'react'

// interface InputProps
//   extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'> {
//   onChange: (param: string) => void
// }

// const Input = ({ onChange, ...props }: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     onChange(e.target.value)
//   }

//   return <input ref={ref} {...props} onChange={handleInputChange} placeholder="Nhập Thông Tin" />
// }
// export default Input
// import React, { ChangeEvent, Dispatch, SetStateAction, RefObject } from 'react'
import { Dispatch, RefObject, SetStateAction, ChangeEvent } from 'react'
interface InputProps {
  job: string
  handleSetJob: (job: string) => void
  inputRef: RefObject<HTMLInputElement>
}

const Input: React.FC<InputProps> = ({ job, handleSetJob, inputRef }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSetJob(e.target.value)
    if (!inputRef.current) return
    inputRef.current.focus()
  }

  return <input ref={inputRef} onChange={handleInputChange} value={job} placeholder="Nhập Thông Tin" type="text" />
}

export default Input
