// app/form/page.tsx
"use client";

import { useFormStore } from "@/store/useFormStore";
import { step1Schema, step2Schema, step3Schema } from "@/lib/validation";
import { useState } from "react";

export default function MultiStepForm() {
  const { step, setStep, data, updateData, reset } = useFormStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = () => {
    try {
      if (step === 1) step1Schema.parse(data);
      if (step === 2) step2Schema.parse(data);
      if (step === 3) step3Schema.parse(data);
      setErrors({});
      return true;
    } catch (err: any) {
      const formatted: Record<string, string> = {};
      err.errors.forEach((e: any) => {
        formatted[e.path[0]] = e.message;
      });
      setErrors(formatted);
      return false;
    }
  };

  const next = () => {
    if (validateStep()) setStep(step + 1);
  };

  const prev = () => setStep(step - 1);

  const submit = () => {
    if (validateStep()) {
      alert("Form Submitted ✅\n" + JSON.stringify(data, null, 2));
      reset();
    }
  };

  console.log('data',data)
  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h1 className="text-2xl font-bold mb-4">Multi-step Form</h1>

      {step === 1 && (
        <div>
          <input
            type="text"
            placeholder="Name"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}

          <input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
      )}

      {step === 2 && (
        <div>
          <input
            type="number"
            placeholder="Age"
            value={data.age ?? ""}
            onChange={(e) => updateData({ age: Number(e.target.value) })}
            className="w-full p-2 border rounded mb-2"
          />
          {errors.age && <p className="text-red-500">{errors.age}</p>}
        </div>
      )}

      {step === 3 && (
        <div>
          <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => updateData({ password: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-4">
        {step > 1 && (
          <button
            onClick={prev}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Back
          </button>
        )}
        {step < 3 && (
          <button
            onClick={next}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next
          </button>
        )}
        {step === 3 && (
          <button
            onClick={submit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
