import {
    LinkedInLogoIcon,
    GitHubLogoIcon,
    EnvelopeClosedIcon,
    EnvelopeOpenIcon,
  } from "@radix-ui/react-icons";
  import { IconButton } from "@radix-ui/themes";
const Sidebar: React.FC = () => {
  return (
    <div className="min-h-screen px-4 pt-8 pb-0 bg-[#003a51] flex justify-between flex-col w-60">

<div className="space-y-3 h-full flex items-center flex-col p-3 justify-center items-stretch fixed">
          <a href="https://www.linkedin.com/in/nelson-alvarez-62027b189" className="text-[#ffffff]">
            <IconButton>
              <LinkedInLogoIcon width="40" height="40" />
            </IconButton>
              LinkedIn
          </a>

          <a href="https://github.com/DebuggingaHopper" className="text-[#ffffff]">
            <IconButton>
              <GitHubLogoIcon width="40" height="40" />
            </IconButton>
              Github
          </a>

          <a href="mailto:“nelson.j.alvarez01@gmail.com" className="text-[#ffffff]">
            <IconButton>
              <EnvelopeOpenIcon width="40" height="40" />
            </IconButton>
              Email
          </a>
        </div>
    </div>




  );
};
export default Sidebar;
