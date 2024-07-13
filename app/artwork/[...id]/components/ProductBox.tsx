import ArtworkDetail from "./ArtworkDetail";
import ImageBox from "./ImageBox";

type ProductBoxTypes = {
  data: ArtworkResultTypes;
  sessionId: string | undefined;
};

export default function ProductBox({ data, sessionId }: ProductBoxTypes) {
  return (
    <div className=" p-3 xl:p-[1.5rem] my-5">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="h-full grid place-items-center md:justify-self-end">
          <ImageBox
            url={data.url}
            title={data.title}
            availability={data.availability}
          />
        </div>

        {/* Data */}
        <div className="w-full lg:w-2/3 h-full">
          <ArtworkDetail data={data} sessionId={sessionId} />
        </div>
      </div>
    </div>
  );
}
