import EditorialGridItemLarge from "./EditorialGridItemLarge";

export default function EditorialsGrid({
  editorials,
}: {
  editorials: any[] | undefined;
}) {
  const sortedEditorials = editorials!.reverse().map((editorial) => {
    const sortedEditorial = {
      title: editorial.title,
      summary: editorial.summary,
      image: editorial.image,
      id: editorial.id,
      minutes: editorial.minutes,
      date: editorial.date,
    };
    return sortedEditorial;
  });


  return (
    <>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 lg:gap-x-4">
        {sortedEditorials.map((editorial) => {
          return <EditorialGridItemLarge editorial={editorial} />;
        })}
      </div>
    </>
  );
}
