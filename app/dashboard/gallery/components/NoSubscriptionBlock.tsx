import { BsShieldLock } from "react-icons/bs";
export default function NoSubscriptionBlock() {
  return (
    <div
      className={`w-full h-[85vh] grid place-items-center bg-dark  rounded-lg`}
    >
      <div className="flex flex-col gap-4 items-center">
        <BsShieldLock className="text-2xl text-white" />
        <div className="text-center">
          <p className=" text-white">
            Your need to have an active subscription to use this feature.
          </p>
        </div>
        <div className="">
          <button className=" h-[50px] px-4 bg-white text-dark rounded-sm ">
            Activate Subscription
          </button>
        </div>
      </div>
    </div>
  );
}
