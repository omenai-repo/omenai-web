import { LoadSmall } from "@shared/components/loader/Load";

export default function Loader() {
  return (
    <div className="w-full h-full grid place-items-center">
      <LoadSmall />
    </div>
  );
}