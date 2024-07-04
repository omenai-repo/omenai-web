import React from "react";
import { PlanProps } from "./plan_details";
import Link from "next/link";

export default function Plan({
  name,
  monthly_price,
  yearly_price,
  benefits,
  tab,
}: PlanProps & { tab: "monthly" | "yearly" }) {
  return (
    <>
      <div className="relative z-10 w-fit my-12">
        <div className="mx-auto w-fit">
          <div className="flex flex-col rounded-3xl bg-white shadow-xl ring-1 ring-[#E0E0E0]">
            <div className="p-8">
              <h3
                className="text-sm font-semibold leading-4 tracking-tight text-dark"
                id="tier-hobby"
              >
                {name}
              </h3>
              <div className="mt-4 flex items-baseline text-xl font-bold tracking-tight text-gray-900">
                {tab === "monthly"
                  ? `${monthly_price.text}`
                  : `${yearly_price.text}`}

                <span className="text-lg font-semibold leading-8 tracking-normal text-gray-500">
                  {tab === "monthly" ? `/mo` : `/yr`}
                </span>
              </div>
              <p className="mt-6 text-[14px] text-gray-600">
                {name === "Basic" && "All basic features included."}
                {name === "Pro" && "Best deal for you"}
                {name === "Premium" && "For those who expect more"}
              </p>
            </div>
            <div className="flex flex-1 flex-col p-2">
              <div className="flex flex-1 flex-col justify-between rounded-2xl bg-gray-50 p-4">
                <ul role="list" className="space-y-4">
                  {benefits.map((benefit, index) => {
                    return (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-4 w-4 text-dark"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            ></path>
                          </svg>
                        </div>
                        <p className="ml-3 text-[14px] leading-6 text-[#858585]">
                          {benefit}
                        </p>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-8">
                  <Link
                    href="/dashboard/gallery/billing/plans/checkout"
                    className="h-[50px] px-4 w-full text-[14px] text-white disabled:cursor-not-allowed disabled:bg-[#E0E0E0] hover:bg-dark/80 bg-dark duration-300 grid place-items-center"
                    aria-describedby="tier-team"
                  >
                    Get started today
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
