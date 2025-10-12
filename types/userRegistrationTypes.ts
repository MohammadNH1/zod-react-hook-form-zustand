import {z} from 'zod'
import {FieldError,UseFormRegister} from 'react-hook-form'


export const userRegistrationSchema = z.object({
    firstName:z.string().min(2,{message:'too short!'}).max(20,{message:'too long!'}),
    lastName:z.string().min(2,{message:'too short!'}).max(20,{message:"too long"}),
    age:z.number({error:'age is reqired!'}).min(16,{message:'too young'}).max(80,{message:'too old!'}),
    email:z.email({error:'provide valid email address!'}),
    phoneNumber:z.string().startsWith('+880',{message:'phone number must be start +880'}),
    siteUrl:z.httpUrl({error:'Give valid url!'}),
    password:z.string().min(6,{message:'too short'}).max(20,{message:'too long!'}),
    confirmPassword:z.string()
}).refine((data)=>data.password===data.confirmPassword,{
    message:'password do not match!',
    path:["confirmPassword"]
})

export type userRegistrationFormData = z.infer<typeof userRegistrationSchema>

export type userRegistrationFormDataProps = {
    type: string;
      placeholder: string;
      name: validFieldnames;
      register: UseFormRegister<userRegistrationFormData>;
      error: FieldError | undefined;
      valueAsNumber?: boolean;
}


export type validFieldnames =
  | "firstName"
  | "lastName"
  | "age"
  | "password"
  | "confirmPassword"
  | "email"
  | "phoneNumber"
  | "siteUrl";