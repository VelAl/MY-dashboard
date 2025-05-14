import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";

const createCrumbs = (id: string) => [
  { label: "Invoices", href: "/dashboard/invoices" },
  {
    label: "Edit Invoice",
    href: `/dashboard/invoices/${id}/edit`,
    active: true,
  },
];

type T_Props = { params: Promise<{ id: string }> };

const EditInvoicePage = async ({ params }: T_Props) => {
  const { id } = await params;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  return (
    <main>
      <Breadcrumbs breadcrumbs={createCrumbs(id)} />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
};

export default EditInvoicePage;
