"use client";
import { useForm } from "react-hook-form";
import FormField from "./FormField";
import { FormData, UserSchema, validFieldnames } from "@/types/userTypes";
import { zodResolver } from "@hookform/resolvers/zod";

import React from "react";
import axios from "axios";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({ resolver: zodResolver(UserSchema) });

  const onsubmit = async (data: FormData) => {
    const response = await axios.post("/api/form",data );
    const { errors = {} } = response.data;

    // Define a mapping between server-side field names and their corresponding client-side names
    const fieldErrorMapping: Record<string, validFieldnames> = {
      email: "email",
      githubUrl: "githubUrl",
      yearsOfExperience: "yearsOfExperience",
      password: "password",
      confirmPassword: "confirmPassword",
    };

    // find the first field with the errro in the response data
    const fieldWithError = Object.keys(fieldErrorMapping).find(
      (field) => errors[field]
    );
    // if a field an error is found , udpate the form error state using setError
    if (fieldWithError) {
      // use the validFieldNames type to ensure the correct field names
      setError(fieldErrorMapping[fieldWithError], {
        type: "server",
        message: errors[fieldWithError],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">React hook form and zod</h1>
        <FormField
          type="email"
          placeholder="email"
          name="email"
          register={register}
          error={errors.email}
        />
        <FormField
          type="text"
          placeholder="Github URL"
          name="githubUrl"
          register={register}
          error={errors.githubUrl}
        />
        <FormField
          type="number"
          placeholder="Years of Experience"
          name="yearsOfExperience"
          register={register}
          error={errors.yearsOfExperience}
          valueAsNumber
        />
        <FormField
          type="password"
          placeholder="password"
          name="password"
          register={register}
          error={errors.password}
        />
        <FormField
          type="password"
          placeholder="confirm password"
          name="confirmPassword"
          register={register}
          error={errors.confirmPassword}
        />
        <button type="submit" className="submit-button">
          submit
        </button>
      </div>
    </form>
  );
};

export default Form;
