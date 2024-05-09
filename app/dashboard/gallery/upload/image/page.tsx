import UploadArtworkImage from "../features/UploadArtworkImage";

export default function page() {
  return (
    <div className="p-5">
      <h1 className="text-dark font-medium text-sm+">Upload artwork image</h1>
      <div className="my-12">
        <UploadArtworkImage />
      </div>
    </div>
  );
}
