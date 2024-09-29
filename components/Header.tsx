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
    <div className="w-full flex-nowrap bg-white sticky top-0">
      <header className="py-2">
        <Link
          href="/"
          className="text-2xl font-bold text-green-500 text-center"
        >
          LakeByte
        </Link>
        <div className="space-x-3">
          <a href="https://www.linkedin.com/in/nelson-alvarez-62027b189">
            <IconButton>
              <LinkedInLogoIcon width="26" height="26" />
            </IconButton>
          </a>
          <a href="https://github.com/DebuggingaHopper">
            <IconButton>
              <GitHubLogoIcon width="26" height="26" />
            </IconButton>
          </a>
          <a href="mailto:“nelson.j.alvarez01@gmail.com">
            <IconButton>
              <EnvelopeOpenIcon width="26" height="26" />
            </IconButton>
          </a>
        </div>
      </header>
    </div>
  );
};

// export Header module
export default Header;
