import {
    LinkedInLogoIcon,
    GitHubLogoIcon,
    EnvelopeClosedIcon,
    EnvelopeOpenIcon,
  } from "@radix-ui/react-icons";
  import { IconButton } from "@radix-ui/themes";
const Sidebar: React.FC = () => {
  return (
    <div className="min-h-screen px-4 pt-8 pb-0 bg-[#003a51] flex justify-between flex-col w-60 hidden lg:block">
<div className="space-y-1 h-full flex flex-col w-30 text-wrap text-base p-30 fixed items-stretch font-bold divide-y">
<p className="text-[#ffffff] text-wrap">
  Nelson Alvarez's DevOps Blog
</p>
          <a href="https://www.linkedin.com/in/nelson-alvarez-62027b189" className="text-[#ffffff] hover:text-[#fff6a2]">
            <IconButton>
              <LinkedInLogoIcon width="40" height="40" />
            </IconButton>
              LinkedIn
          </a>

          <a href="https://github.com/DebuggingaHopper" className="text-[#ffffff] hover:text-[#fff6a2]">
            <IconButton>
              <GitHubLogoIcon width="40" height="40" />
            </IconButton>
              Github
          </a>

          <a href="mailto:“nelson.j.alvarez01@gmail.com" className="text-[#ffffff] hover:text-[#fff6a2]">
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
