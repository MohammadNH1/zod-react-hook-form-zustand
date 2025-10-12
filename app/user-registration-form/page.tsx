"use client";
import FormFieldForUserReg from "@/components/FormFieldForUserReg";
import {
  userRegistrationSchema,
  userRegistrationFormData,
} from "@/types/userRegistrationTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<userRegistrationFormData>({
    resolver: zodResolver(userRegistrationSchema),
  });

  const onsubmit = async(data:userRegistrationFormData)=>{
    console.log(data)

  }
  return (
    <form action="" onSubmit={handleSubmit(onsubmit)}>
    <div  className="flex flex-col justify-center items-center">
      <FormFieldForUserReg
        type="text"
        name="firstName"
        placeholder="FirstName"
        register={register}
        error={errors.firstName}
      />
     <FormFieldForUserReg
        type="text"
        name="lastName"
        placeholder="LastName"
        register={register}
        error={errors.lastName}
      /><FormFieldForUserReg
        type="email"
        name="email"
        placeholder="email"
        register={register}
        error={errors.email}
      /><FormFieldForUserReg
        type="password"
        name="password"
        placeholder="password"
        register={register}
        error={errors.password}
      /><FormFieldForUserReg
        type="password"
        name="confirmPassword"
        placeholder="confirmPassword"
        register={register}
        error={errors.confirmPassword}
      /><FormFieldForUserReg
        type="text"
        name="siteUrl"
        placeholder="siteUrl"
        register={register}
        error={errors.siteUrl}
      /><FormFieldForUserReg
        type="number"
        name="age"
        placeholder="age"
        register={register}
        error={errors.age}
        valueAsNumber
      />
      <FormFieldForUserReg
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        register={register}
        error={errors.phoneNumber}
      />
      <button type="submit">Submit</button>
    </div>
    </form>
  );
};

export default page;
