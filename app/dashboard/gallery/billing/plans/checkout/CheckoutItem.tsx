import React from "react";

export default function CheckoutItem() {
  return (
    <div className="bg-white p-4">
      <h1 className="text-base font-medium text-[#858585]">
        Checkout Item Summary
      </h1>
      <p className="mt-4 flex items-baseline text-md font-bold tracking-tight text-gray-900">
        Omenai Gallery annual Premium Subscription
      </p>

      <hr className="mt-10 m-4 border-[#E0E0E0]" />
      <div className="flex justify-between items-center">
        <p className="text-base font-medium">Subtotal</p>
        <p className="text-base font-bold">$4000</p>
      </div>
      <hr className="my-4 border-[#E0E0E0]" />
      <div className="flex justify-between items-center">
        <p className="text-base font-medium">Grand total</p>
        <p className="text-base font-bold">$4000</p>
      </div>
    </div>
  );
}
