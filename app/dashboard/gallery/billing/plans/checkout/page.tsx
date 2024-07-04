import React from "react";
import PageTitle from "../../../components/PageTitle";
import { CheckoutStepper } from "./CheckoutStepper";
import CheckoutItem from "./CheckoutItem";

export default function SubscriptionCheckout() {
  return (
    <div>
      <PageTitle title="Checkout" />
      <div className="my-10 space-y-1">
        <p className="text-[#858585] text-xs">
          Please fill in all information below to fully activate your
          subscription
        </p>
      </div>
      <div className="grid lg:grid-cols-2 mt-10 gap-5 items-center justify-center">
        <CheckoutStepper />
        <CheckoutItem />
      </div>
    </div>
  );
}
