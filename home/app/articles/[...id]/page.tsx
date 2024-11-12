import getEditorialDocument from "@shared/app/secure/editorial/admin/lib/getSingleEditorialPost";
import EditorialData from "./components/EditorialData";
import { IndividualLogo } from "@shared/components/logo/Logo";

export default async function page({ params }: { params: { id: string[] } }) {
  const editorialDocumentData = await getEditorialDocument(params.id[0]);

  return (
    <div className="sm:container mb-5">
      <div className="py-8 px-4">
        <IndividualLogo />
      </div>
      <EditorialData singleEditorialData={editorialDocumentData} />
    </div>
  );
}
