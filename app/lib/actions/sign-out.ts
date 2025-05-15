"use server";

import { signOut } from "@/auth";

export const signOut_A = async (_: null, __: FormData) => {
  await signOut({ redirectTo: "/" });
  return null;
};
