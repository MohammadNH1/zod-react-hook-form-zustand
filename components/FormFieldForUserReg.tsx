import { FormFieldProps } from "@/types/userTypes";
import {userRegistrationFormDataProps} from "@/types/userRegistrationTypes"
import React from 'react'

const FormFieldForUserReg = ({type,error,register,valueAsNumber,placeholder,name}:userRegistrationFormDataProps) => {
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

export default FormFieldForUserReg