
import Image from "next/image";
import X from "logos/x-white.svg?url";
import LinkedIn from "logos/linkedin-white.svg?url";
import Discord from "logos/discord-white.svg?url";

export const Social = () => {
  return (
    <>
      <a href="https://twitter.com/LiBeLit" target="_blank">
        <button className="btn-accent-round w-12 h-12">
          <Image className="w-6 h-6" src={X} alt="x" />
        </button>
      </a>
      <a href="https://www.linkedin.com/company/libelit" target="_blank">
        <button className="btn-accent-round w-12 h-12">
          <Image className="w-6 h-6" src={LinkedIn} alt="LinkedIn" />
        </button>
      </a>
      <a href="https://twitter.com/LiBeLit" target="_blank">
        <button className="btn-accent-round w-12 h-12">
          <Image className="w-6 h-6" src={Discord} alt="Discord" />
        </button>
      </a>
    </>
  );
};
