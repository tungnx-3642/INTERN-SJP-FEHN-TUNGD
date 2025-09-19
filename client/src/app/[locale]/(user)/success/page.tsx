import { redirect } from "next/navigation";
import { stripe } from "../../../../lib/stripe";
import SuccessPage from "./_components/SuccessPage";

export default async function Success({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const status = session.status;

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const clientSession = {
      customerEmail: session.customer_details?.email ?? "unknown@example.com",
      amount: session.amount_total!,
      createdAt: session.created,
      orderId: Number(session.metadata?.orderId!),
      name: session.metadata?.name!,
      address: session.metadata?.address!,
      city: session.metadata?.city!,
    };
    return <SuccessPage session={clientSession} />;
  }
}
