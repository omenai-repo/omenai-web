import React from "react";

export default function TabSelector({
  tab,
  setTab,
}: {
  tab: any;
  setTab: any;
}) {
  return (
    <div className="p-2 rounded-lg flex gap-2 bg-white ring-1 ring-dark/20 w-fit max-w-full">
      {/* User */}
      <div
        className={`h-[40px] px-4 rounded-lg cursor-pointer w-fit flex justify-center text-xs ${
          tab === "pending" ? "bg-dark  text-white" : "bg-transparent text-dark"
        }  cursor-pointer rounded-lg `}
        onClick={() => setTab("pending")}
      >
        <p>Pending Gallery Verifications</p>
      </div>
      {/* Gallery */}
      <div
        className={`h-[40px] px-4 rounded-lg cursor-pointer w-fit flex text-xs justify-center ${
          tab === "verified"
            ? "bg-dark  text-white"
            : "bg-transparent text-dark"
        }  cursor-pointer rounded-lg `}
        onClick={() => setTab("verified")}
      >
        <p>Verified Galleries</p>
      </div>
    </div>
  );
}
