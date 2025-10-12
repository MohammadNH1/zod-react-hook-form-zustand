import { FormFieldProps } from "@/types/userTypes";

import React from 'react'

const FormField = ({type,error,register,valueAsNumber,placeholder,name}:FormFieldProps) => {
  return (
   <>
   <input 
   type={type}
   placeholder={placeholder} 
   {...register(name,{valueAsNumber})}
   />
   {error&& <span className="error-message">{error.message}</span>}
   </>
  )
}

export default FormField
