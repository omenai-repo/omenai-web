type ArtistInformationTypes = {
  name: string;
  year: string;
  location: string;
};
export default function ArtistInformation({
  name,
  year,
  location,
}: ArtistInformationTypes) {
  return (
    <div className=" my-5 w-fit md:w-[600px] border border-dark/10 m-4">
      <div className="p-4 bg-[#FAFAFA] border-dark/10 w-full">
        <h3 className="text-dark/80 font-normal text-[14px]">
          Artist Information
        </h3>
      </div>

      <div className="w-full grid grid-cols-12 p-4 gap-x-8">
        <div className="col-span-6 md:col-span-4 text-xs">
          <ul className="w-full flex flex-col text-dark/80 justify-center gap-y-3 py-4 font-normal">
            <li>Artist name</li>
            <li>Artist birth year</li>
            <li>Artist country of origin</li>
          </ul>
        </div>
        <div className="col-span-6 md:col-span-8 text-xs">
          <ul className=" flex flex-col text-dark/70 justify-center gap-y-3 py-4">
            <li>{name}</li>
            <li>{year}</li>
            <li>{location}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
