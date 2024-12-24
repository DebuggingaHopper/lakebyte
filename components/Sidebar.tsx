import {
    LinkedInLogoIcon,
    GitHubLogoIcon,
    EnvelopeClosedIcon,
    EnvelopeOpenIcon,
  } from "@radix-ui/react-icons";
  import { IconButton } from "@radix-ui/themes";
const Sidebar: React.FC = () => {
  return (
    <div className="min-h-screen px-4 pt-8 pb-0 bg-[#003a51] flex justify-between flex-col w-32">

<div className="space-x-3 h-full flex items-center justify-center items-stretch fixed">
          <a href="https://www.linkedin.com/in/nelson-alvarez-62027b189">
            <IconButton>
              <LinkedInLogoIcon width="16" height="16" />
            </IconButton>
          </a>

          <a href="https://github.com/DebuggingaHopper">
            <IconButton>
              <GitHubLogoIcon width="16" height="16" />
            </IconButton>
          </a>

          <a href="mailto:“nelson.j.alvarez01@gmail.com">
            <IconButton>
              <EnvelopeOpenIcon width="16" height="16" />
            </IconButton>
          </a>
        </div>
    </div>




  );
};
export default Sidebar;
