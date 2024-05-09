type FullArtworkDetailsType = {
  data: ArtworkResultTypes;
};
export default function FullArtworkDetails({ data }: FullArtworkDetailsType) {
  return (
    <div className=" my-5 w-fit md:w-[600px] border border-dark/10 m-4">
      <div className="p-4 bg-[#FAFAFA] border-dark/10 w-full">
        <h3 className="text-dark/80 font-normal text-[14px]">
          Additional details about this artwork
        </h3>
      </div>

      <div className="w-full grid grid-cols-12 p-4 gap-x-8">
        <div className="col-span-6 md:col-span-4 text-xs">
          <ul className="w-full flex flex-col text-dark/80 justify-center gap-y-3 py-4 font-normal">
            <li>Materials</li>
            <li>Description</li>
            <li>Artwork packaging</li>
            <li>Signature</li>
            <li>Certificate of Authenticity</li>
            <li>Year</li>
          </ul>
        </div>
        <div className="col-span-6 md:col-span-8 text-xs">
          <ul className=" flex flex-col text-dark/70 justify-center gap-y-3 py-4">
            <li>{data.materials}</li>
            <li>{data.artwork_description || "N/A"}</li>
            <li>{data.framing}</li>
            <li>{data.signature}</li>
            <li>
              {data.certificate_of_authenticity === "Yes"
                ? "Included (Issued by Gallery)"
                : "Not available"}
            </li>
            <li>{data.year}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
