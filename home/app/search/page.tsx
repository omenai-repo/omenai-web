import DesktopNavbar from "@shared/components/navbar/desktop/DesktopNavbar";
import SearchResultWrapper from "./components/SearchResultWrapper";
import Footer from "@shared/components/footer/Footer";

export default function page() {
  return (
    <div>
      <DesktopNavbar />
      <SearchResultWrapper />
      <Footer />
    </div>
  );
}
