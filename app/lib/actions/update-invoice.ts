"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { z } from "zod";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const invoiceformSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number().min(1),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const updInvoiceSchema = invoiceformSchema.omit({ id: true, date: true });

export const updateInvoice_A = async (id: string, formData: FormData) => {
  const { customerId, amount, status } = updInvoiceSchema.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;

  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
};
