import {
    LinkedInLogoIcon,
    GitHubLogoIcon,
    EnvelopeClosedIcon,
    EnvelopeOpenIcon,
  } from "@radix-ui/react-icons";
  import { IconButton } from "@radix-ui/themes";
const Sidebar: React.FC = () => {
  return (
    <div className="h-screen px-4 pt-8 pb-0 bg-[#314d59] flex justify-between flex-col w-60 overflow-y-auto">
      <nav className="space-x-3 h-full flex items-center justify-center items-stretch fixed">
          <a href="https://www.linkedin.com/in/nelson-alvarez-62027b189">
            <IconButton>
              <LinkedInLogoIcon width="52" height="52" />
            </IconButton>
          </a>
          <a href="https://github.com/DebuggingaHopper">
            <IconButton>
              <GitHubLogoIcon width="52" height="52" />
            </IconButton>
          </a>
          <a href="mailto:“nelson.j.alvarez01@gmail.com">
            <IconButton>
              <EnvelopeOpenIcon width="52" height="52" />
            </IconButton>
          </a>
        </nav>
    </div>
  );
};
export default Sidebar;
