import { editorialData } from "../mocks/editorialMockData";
import EditorialGridItemLarge from "./EditorialGridItemLarge";
import EditorialGridItemsList from "./EditorialGridItemsList";

export default function EditorialsGrid() {
  return (
    <>
      <div className="grid md:grid-cols-12 lg:gap-x-4 w-full">
        <div className="col-span-12 md:col-span-6">
          <EditorialGridItemLarge
            key={editorialData[0].id}
            editorial={editorialData[0]}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <EditorialGridItemsList editorials={editorialData.slice(1, 7)} />
        </div>
      </div>
    </>
  );
}
