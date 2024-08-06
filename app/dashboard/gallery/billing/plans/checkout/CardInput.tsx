import React from "react";

export default function CardInput({
  isFirstStep,
  handleClick,
}: {
  isFirstStep: boolean;
  handleClick: () => void;
}) {
  return (
    <form className="space-y-6">
      <h1 className="text-sm my-4">Enter your card information</h1>
      <div className="relative w-full ">
        <label className="text-[#858585] text-xs" htmlFor="card_name">
          Card name
        </label>
        <input
          name="card_name"
          type="text"
          required
          placeholder="Enter the name on your card"
          className="p-3 border border-[#E0E0E0] text-xs placeholder:text-[#858585] placeholder:text-xs bg-white w-full focus:border-none focus:ring-1 focus:ring-dark focus:outline-none"
        />
      </div>
      <div className="relative w-full ">
        <label className="text-[#858585] text-xs" htmlFor="card_number">
          Card number
        </label>
        <input
          name="card_number"
          type="text"
          required
          placeholder="Enter the card number"
          className="p-3 border border-[#E0E0E0] text-xs placeholder:text-[#858585] placeholder:text-xs bg-white  w-full focus:border-none focus:ring-1 focus:ring-dark focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-3 gap-x-2 justify-center">
        <div className="relative w-full ">
          <label className="text-[#858585] text-xs" htmlFor="expiry_month">
            Expiry month
          </label>
          <input
            name="card_month"
            type="text"
            required
            placeholder="MM"
            className="p-3 border border-[#E0E0E0] text-xs placeholder:text-[#858585] placeholder:text-xs bg-white  w-full focus:border-none focus:ring-1 focus:ring-dark focus:outline-none"
          />
        </div>{" "}
        <div className="relative w-full ">
          <label className="text-[#858585] text-xs" htmlFor="expiry_year">
            Exiry year
          </label>
          <input
            name="card_year"
            type="text"
            required
            placeholder="YYYY"
            className="p-3 border border-[#E0E0E0] text-xs placeholder:text-[#858585] placeholder:text-xs bg-white  w-full focus:border-none focus:ring-1 focus:ring-dark focus:outline-none"
          />
        </div>{" "}
        <div className="relative w-full ">
          <label className="text-[#858585] text-xs" htmlFor="card_name">
            CVV
          </label>
          <input
            name="cvv"
            type="text"
            required
            placeholder="Enter the CVV number"
            className="p-3 border border-[#E0E0E0] text-xs placeholder:text-[#858585] placeholder:text-xs bg-white  w-full focus:border-none focus:ring-1 focus:ring-dark focus:outline-none"
          />
        </div>
      </div>
      <div className="w-full mt-10">
        <button
          onClick={handleClick}
          type="button"
          className="h-[35px] px-4 w-full text-white disabled:cursor-not-allowed disabled:bg-[#E0E0E0] hover:bg-dark/80 text-xs bg-dark duration-200 grid place-items-center"
        >
          Proceed
        </button>
      </div>
    </form>
  );
}
