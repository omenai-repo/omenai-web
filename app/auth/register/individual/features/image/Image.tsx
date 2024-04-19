import Image from "next/image";

export default function ImageBlock() {
  return (
    <aside className="h-full w-full relative flex-1 hidden md:block">
      <Image
        src={"/dark_bg_1.jpg"}
        alt="Individual sign up image block"
        width={500}
        height={500}
        className="absolute inset-0 w-full h-full object-center object-cover rounded-tr-xl rounded-br-xl"
      />
      <div className="absolute bottom-14 left-6 z-20 text-white">
        <h1 className="text-2xl font-semibold mb-2">
          Your easy access to artworks
        </h1>
        <p className="font-medium">
          If you are really interested in getting artworks for reasonable
          prices, then sign up
        </p>
      </div>
      <div className="absolute inset-0 bg-dark opacity-80 z-10" />
    </aside>
  );
}
