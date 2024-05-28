import Loader from "@/components/loader/Loader";
import React from "react";

export default function loading() {
  return (
    <div className="h-screen grid place-items-center">
      <Loader />
    </div>
  );
}
