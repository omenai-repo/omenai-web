"use client";
import Link from "next/link";
import EditorialsGrid from "./components/EditorialsGrid";
import { useQuery } from "@tanstack/react-query";
import Load from "@/components/loader/Load";
import { MdArrowRightAlt } from "react-icons/md";
import { editorialData } from "./mocks/editorialMockData";
import { editorial_database } from "@/appwrite";

export default function Editorials() {

  const { data: editorials, isLoading } = useQuery({
    queryKey: ["editorials"],
    queryFn: async () => {
      const response = await editorial_database.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_EDITORIAL_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_EDITORIAL_COLLECTION_ID!,
      );

      if (response?.documents) {
        return response.documents;
      } else throw new Error("Something went wrong");
    },
  });

  // if (isLoading)
  //   return (
  //     <div className="h-[500px] w-full place-items-center grid">
  //       <Load />
  //     </div>
  //   );

  return (
    <>
      {editorials && editorials?.length === 0 ? null : (
        <div className="p-5 sm:px-4 relative bg-[#FAFAFA]">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center p-2">
            <div className="space-y-1 my-10">
              <h1 className="text-md font-normal">Editorial articles</h1>
              <p className="text-sm text-[#858585] font-normal italic">
                Behind the Canvas: Stories and Perspectives from the Art World
              </p>
            </div>
            <Link
              href={"https://omenai.net"}
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
