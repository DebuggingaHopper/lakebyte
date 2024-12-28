import {
    LinkedInLogoIcon,
    GitHubLogoIcon,
    EnvelopeClosedIcon,
    EnvelopeOpenIcon,
  } from "@radix-ui/react-icons";
  import { IconButton } from "@radix-ui/themes";
const Sidebar: React.FC = () => {
  return (
    <div className="min-h-screen px-4 pt-8 pb-0 bg-[#003a51] flex justify-between flex-col w-60 hidden fixed lg:block">
<div className="min-h-screen space-y-3 h-full flex flex-col justify-center items-center w-30 text-wrap text-center text-base p-30">
<img src="/assets/pfp.jpg" className="w-40 h-40 rounded-full" alt="PFP picture"></img>
<p className="text-[#ffffff] font-semibold">
  Nelson Alvarez's DevOps Blog about optimization & development
</p>
          <a href="https://www.linkedin.com/in/nelson-alvarez-62027b189" className="text-[#ffffff] hover:text-[#fff6a2] font-bold">
            <IconButton>
              <LinkedInLogoIcon width="40" height="40" />
            </IconButton>
              LinkedIn
          </a>

          <a href="https://github.com/DebuggingaHopper" className="text-[#ffffff] hover:text-[#fff6a2] font-bold">
            <IconButton>
              <GitHubLogoIcon width="40" height="40" />
            </IconButton>
              Github
          </a>

          <a href="mailto:“nelson.j.alvarez01@gmail.com" className="text-[#ffffff] hover:text-[#fff6a2] font-bold">
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
