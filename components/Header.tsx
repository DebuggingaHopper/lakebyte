// Import the link props
import Link from "next/link";
import {
  LinkedInLogoIcon,
  GitHubLogoIcon,
  EnvelopeClosedIcon,
  EnvelopeOpenIcon,
} from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
// add the React Header Element
const Header: React.FC = () => {
  return (
    // header value
    <div className="w-full flex-nowrap bg-transparent">
      <header className="py-2">
        <Link
          href="/"
          className="text-2xl font-bold text-HeaderText text-center hover:text-[#ffffff]"
        >
          @ECHO D@H
        </Link>
      </header>
    </div>
  );
};

// export Header module
export default Header;
