import Form from "@/app/ui/invoices/create-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomers } from "@/app/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Invoice",
};

const crumbs = [
  { label: "Invoices", href: "/dashboard/invoices" },
  {
    label: "Create Invoice",
    href: "/dashboard/invoices/create",
    active: true,
  },
];

const CreateInvoicePage = async () => {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs breadcrumbs={crumbs} />
      <Form customers={customers} />
    </main>
  );
};
export default CreateInvoicePage;
