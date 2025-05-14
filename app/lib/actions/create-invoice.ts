"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const invoiceformSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number().min(1),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const createInvoiceSchema = invoiceformSchema.omit({ id: true, date: true });

export const createInvoice_A = async (formData: FormData) => {
  const { customerId, amount, status } = createInvoiceSchema.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
};
