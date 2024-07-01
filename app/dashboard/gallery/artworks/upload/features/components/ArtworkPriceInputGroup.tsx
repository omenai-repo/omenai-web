import { uploadArtworkPriceInputMocks } from "../mocks";
import ArtworkSelectInput from "./ArtworkSelectInput";
import ArtworkTextInput from "./ArtworkTextInput";
import { BsCurrencyDollar } from "react-icons/bs";

export default function ArtworkPriceInputGroup() {
  return (
    <div className="my-10">
      <h2 className="text-dark font-normal text-base my-4">Artwork Pricing</h2>
      <div className="grid grid-cols-2 gap-5 ">
        {uploadArtworkPriceInputMocks.map((input, index) => {
          if (input.type === "text") {
            return (
              <div key={index} className="relative">
                <ArtworkTextInput
                  label={input.label}
                  placeholder={input.placeholder}
                  name={input.name}
                  required={input.required}
                />
                <BsCurrencyDollar className="absolute right-2 top-9 text-[#858585]" />
              </div>
            );
          } else {
            return (
              <ArtworkSelectInput
                key={index}
                label={input.label}
                items={input.options}
                name={input.name}
                required={input.required}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
