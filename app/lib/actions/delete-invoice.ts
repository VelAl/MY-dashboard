"use server";

import { revalidatePath } from "next/cache";
import postgres from "postgres";

type T_State = { message: string };

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export const deleteInvoice_A = async (id: string, _: T_State, __: FormData) => {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath("/dashboard/invoices");
    return {
      message: "Invoice successfully deleted",
    };
  } catch (error) {
    return {
      message: "Something went wrong...",
    };
  }
};
