import { FormFieldForTodoProps } from '@/types/todoTypes'
import React from 'react'

const FormFieldForTodo = ({type,error,register,valueAsNumber,placeholder,name}:FormFieldForTodoProps) => {
  return (
   <div className="flex flex-col w-full">
   <input 
   className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${type === 'checkbox' ? 'w-auto' : ''}`}
   type={type}
   placeholder={placeholder} 
   {...register(name,{valueAsNumber})}
   />
   {error&& <span className="text-red-500 text-sm mt-1">{error.message}</span>}
   </div>
  )
}

export default FormFieldForTodo