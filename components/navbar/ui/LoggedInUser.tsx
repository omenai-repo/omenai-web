import LoggedInUserDropDown from "./LoggedInUserDropdown";
import { BiUser } from "react-icons/bi";

export default function LoggedInUser({ user }: { user: string | undefined }) {
  return (
    <div className="flex items-center">
      <LoggedInUserDropDown user={user} />
    </div>
  );
}
