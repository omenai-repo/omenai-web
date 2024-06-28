"use client";
import Link from "next/link";
import EditorialsGrid from "./components/EditorialsGrid";
import { useQuery } from "@tanstack/react-query";
import { listEditorials } from "@/app/secure/editorial/admin/lib/getAllBlogArticles";
import Load from "@/components/loader/Load";
import { MdArrowRightAlt } from "react-icons/md";

export default function Editorials() {
  const { data: editorials, isLoading } = useQuery({
    queryKey: ["editorials"],
    queryFn: async () => {
      const data = await listEditorials();
      return data;
    },
  });

  if (isLoading)
    return (
      <div className="h-[500px] w-full place-items-center grid">
        <Load />
      </div>
    );

  return (
    <>
      {editorials?.length === 0 ? null : (
        <div className="p-1 sm:px-4 py-16 mb-12 relative bg-[#FAFAFA]">
          <div className="flex justify-between items-center p-2">
            <h1 className="text-dark font-normal text-[20px] sm:text-sm">
              Editorial articles for you
            </h1>
            <Link
              href={"/articles"}
              className="text-dark flex items-center gap-x-2 font-normal text-[14px] break-words"
            >
              View all editorials
              <MdArrowRightAlt />
            </Link>
          </div>
          <EditorialsGrid editorials={editorials} />
        </div>
      )}
    </>
  );
}
