import Load from "@shared/components/loader/Load";

export default function loading() {
  return (
    <div className="w-full h-screen grid place-items-center">
      <Load />
    </div>
  );
}
