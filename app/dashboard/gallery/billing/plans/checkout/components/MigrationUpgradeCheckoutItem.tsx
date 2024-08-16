import { daysElapsedSince } from "@/utils/daysElapsedSince";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import { formatPrice } from "@/utils/priceFormatter";
import CheckoutBillingCard from "./CheckoutBillingCard";
import { ObjectId } from "mongoose";
import { getDaysLeft } from "@/utils/getDaysLeft";
import {
  differenceInDays,
  startOfYear,
  endOfYear,
  endOfMonth,
  getDaysInMonth,
} from "date-fns";
import { determinePlanChange } from "@/utils/determinePlanChange";

export default function MigrationUpgradeCheckoutItem({
  plan,
  interval,
  sub_data,
}: {
  plan: SubscriptionPlanDataTypes & {
    createdAt: string;
    updatedAt: string;
    _id: string;
  };
  interval: "yearly" | "monthly";
  sub_data: SubscriptionModelSchemaTypes & {
    created: string;
    updatedAt: string;
  };
}) {
  const days_used = daysElapsedSince(sub_data.start_date);

  const startDate = new Date(sub_data.start_date);

  const daysInYear = differenceInDays(
    endOfYear(startDate),
    startOfYear(startDate)
  );

  const daysInMonth = getDaysInMonth(startDate);

  const days_left = getDaysLeft(startDate, sub_data.plan_details.interval);

  const dailyRate =
    +sub_data.payment.value /
    (sub_data.plan_details.interval === "yearly" ? daysInYear : daysInMonth);

  const proratedPrice = days_left * dailyRate;

  const prorated_cost = days_used > 0 ? proratedPrice : 0;

  const upgrade_cost =
    interval === "monthly"
      ? +plan.pricing.monthly_price
      : +plan.pricing.annual_price;

  const currency = getCurrencySymbol(plan.currency);

  const total = upgrade_cost - prorated_cost;

  const grand_total = Math.round((total + Number.EPSILON) * 100) / 100;

  let plan_change_params: { action: string; shouldCharge: boolean } = {
    action: "",
    shouldCharge: false,
  };

  if (sub_data !== null) {
    const { action, shouldCharge } = determinePlanChange(
      sub_data.plan_details.type.toLowerCase(),
      sub_data.plan_details.interval.toLowerCase() as "yearly" | "monthly",
      interval === "yearly"
        ? +plan.pricing.annual_price
        : +plan.pricing.monthly_price,
      interval
    );
    plan_change_params = { action, shouldCharge };
  }

  return (
    <>
      <div className="bg-white shadow-md rounded-sm">
        <div className="w-full p-5 bg-dark text-white">
          <p className="text-[13px] font-normal">Subscription upgrade</p>
          <h1 className="text-base font-medium ">
            Omenai {plan.name} subscription
          </h1>
          <p className="mt-1 flex items-baseline text-xs font-bold tracking-tight">
            Billed {interval}
          </p>
        </div>

        <div className="p-5 flex-flex-col space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-xs font-bold">Current plan duration</p>
            <p className="text-xs font-bold">{days_used} days elapsed</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs font-bold">Plan upgrade cost</p>
            <p className="text-xs font-bold">
              {formatPrice(upgrade_cost, currency)}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs font-bold">Prorated cost</p>

            <p className="text-xs font-bold">
              {!plan_change_params.shouldCharge
                ? formatPrice(0, currency)
                : `-${formatPrice(prorated_cost, currency)}`}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs font-bold">Due today</p>

            <p className="text-xs font-bold">
              {!plan_change_params.shouldCharge
                ? formatPrice(0, currency)
                : `${formatPrice(grand_total, currency)}`}
            </p>
          </div>
          {!plan_change_params.shouldCharge && (
            <p className="text-[13px] font-bold text-red-600 mt-5">
              NOTE: Your plan change will take effect at the end of your current
              billing cycle.
            </p>
          )}
        </div>
        {/* Card info */}
      </div>
      <CheckoutBillingCard
        sub_data={sub_data}
        interval={interval}
        plan={plan}
        amount={grand_total}
        shouldCharge={plan_change_params.shouldCharge}
      />
    </>
  );
}
