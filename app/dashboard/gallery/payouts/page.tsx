("");
import PageTitle from "../components/PageTitle";
import PayoutDashboard from "./components/PayoutDashboard";

export default function Payouts() {
  return (
    <div>
      <PageTitle title="Payout with Stripe" />
      <PayoutDashboard />
    </div>
  );
}
