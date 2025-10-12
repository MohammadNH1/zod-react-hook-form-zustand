import { UserSchema } from "@/types/userTypes";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  // use zod to validate the received data against the userSchema

  const result = UserSchema.safeParse(body);

  // verify if the validation is successfull
  if (result.success) {
    return NextResponse.json({ success: true });
  }

  // if validation errors map them into an object

  const serverErrors = Object.fromEntries(
    result.error?.issues?.map((issue) => [issue.path[0], issue.message]) || []
  );

  // Response with a json object containing the validation errors
  return NextResponse.json({ errors: serverErrors });
}
