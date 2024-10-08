export default function OverviewComponentCard({
  children,
  fullWidth,
  title,
  id,
}: {
  children: React.ReactNode;
  fullWidth: boolean;
  title: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={` ${
        fullWidth ? "px-1 py-2" : "p-6"
      } w-full min-h-[400px] rounded-lg ring-1 ring-[#eeeeee] mt-5 relative bg-white`}
    >
      <h4 className="text-dark text-base font-normal mb-5">{title}</h4>
      {children}
    </div>
  );
}
