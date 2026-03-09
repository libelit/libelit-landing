/* eslint-disable @next/next/no-img-element */
import { TeamCard, type TeamPerson } from "@/components/teamCard";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/library/dictionaries";
import teamMember1 from "images/people/team-member-1.png";
import teamMember1Sm from "images/people/team-member-1-sm.png";

import teamMember2 from "images/people/team-member-2.png";
import teamMember2Sm from "images/people/team-member-2-sm.png";

import teamMember3 from "images/people/team-member-3.png";
import teamMember3Sm from "images/people/team-member-3-sm.png";

import teamMember4 from "images/people/team-member-4.png";
import teamMember4Sm from "images/people/team-member-4-sm.png";

import teamMember5 from "images/people/team-member-5.png";
import teamMember5Sm from "images/people/team-member-5-sm.png";

import teamMember6 from "images/people/team-member-6.png";
import teamMember6Sm from "images/people/team-member-6-sm.png";

import teamMember7 from "images/people/team-member-7.png";
import teamMember7Sm from "images/people/team-member-7-sm.png";

import teamMember8 from "images/people/team-member-8.png";
import teamMember8Sm from "images/people/team-member-8-sm.png";

import map from "images/map.png";
import mapTablet from "images/map-md.png";
import mapMobile from "images/map-sm.png";
import { Subscribe } from "@/components/subscribe";
import ContactForm from "@/components/UiComponents/Forms/ContactForm";
import ContactUsButton from "@/components/ContactUsButton";
import websiteLinkIcon from "@icons/arrows/link-external.svg?url";
import Image from "next/image";

const foundatingTeam: TeamPerson[] = [
  {
    name: "Krzysztof Kieżun",
    description: {
      pl: `prezes wrocławskiego oddziału SARP
Kierownik Katedry Ceramiki na Akademii Sztuk Pięknych im. E. Gepperta we Wrocławiu
Absolwentka Wydziału Architektury Politechniki Wrocławskiej oraz Podyplomowych Studiów Kuratorskich w Zakresie Sztuki Współczesnej na Uniwersytecie Jagiellońskim. Od 2002 roku prowadzi własną praktykę projektową, wykonując projekty w Polsce i zagranicą. Od 2010 r. pracuje na Wydziale Ceramiki i Szkła w Pracowni Ceramiki w Architekturze wrocławskiej ASP, współprowadząc interdyscyplinarne zajęcia i autorskie wykłady. Za działalność dydaktyczną dostała nagrodę Ministra Kultury i Dziedzictwa Narodowego. W latach 2012-2015 współrealizowała program Dolnośląskiej Sieci Wzornictwa Przemysłowego, którego głównym zadaniem było sieciowanie środowisk naukowych i przemysłu. Autorka publikacji oraz kurator projektów z dziedziny sztuki i architektury. Współtwórczyni i dyrektor programowy Dolnośląskiego Festiwalu Architektury, organizowanego corocznie przez wrocławski oddział SARP. W ramach działalności związanej z SARP była kuratorem wielu wydarzeń organizowanych w ramach Europejskiej Stolica Kultury Wrocław 2016. Członkini Rady Muzeum Architektury, Rady Muzeum Współczesnego Wrocławia oraz Miejskiej Komisji Urbanistyczno-Architektonicznej we Wrocławiu.`,
      en: `As a construction engineer and project manager, Krzysztof graduated from
Wrocław University of Science and Technology. He has gained valuable 
experience working in various countries such as Italy, Spain, Norway, and 
currently, Australia. He is the founder and originator of Libelit, where he is 
responsible for overseeing the business development as well as the 
implementation of blockchain technology which sets the platform apart 
from the global market.`,
    },
    role: "Founder & CEO | Australia",
    image: teamMember1,
    smImage: teamMember1Sm,

    socials: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/kiezun",
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2290_26615)">
              <path
                d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_2290_26615">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ),
      },
    ],
  },
  {
    name: "Arch. Daria Kieżun",
    description: {
      en: "Daria Kieżun is an architect with over 20 years of experience in Poland, Sweden, and Italy. She is the winner of many national and international competitions. Daria has been the president of the Association of Polish Architects since 2010 and the program director of the Polish Lower Silesian Architecture Festival since 2011. She provides consultations on Libelit’s architecture projects.",
      pl: `prezes wrocławskiego oddziału SARP
Kierownik Katedry Ceramiki na Akademii Sztuk Pięknych im. E. Gepperta we Wrocławiu
Absolwentka Wydziału Architektury Politechniki Wrocławskiej oraz Podyplomowych Studiów Kuratorskich w Zakresie Sztuki Współczesnej na Uniwersytecie Jagiellońskim. Od 2002 roku prowadzi własną praktykę projektową, wykonując projekty w Polsce i zagranicą. Od 2010 r. pracuje na Wydziale Ceramiki i Szkła w Pracowni Ceramiki w Architekturze wrocławskiej ASP, współprowadząc interdyscyplinarne zajęcia i autorskie wykłady. Za działalność dydaktyczną dostała nagrodę Ministra Kultury i Dziedzictwa Narodowego. W latach 2012-2015 współrealizowała program Dolnośląskiej Sieci Wzornictwa Przemysłowego, którego głównym zadaniem było sieciowanie środowisk naukowych i przemysłu. Autorka publikacji oraz kurator projektów z dziedziny sztuki i architektury. Współtwórczyni i dyrektor programowy Dolnośląskiego Festiwalu Architektury, organizowanego corocznie przez wrocławski oddział SARP. W ramach działalności związanej z SARP była kuratorem wielu wydarzeń organizowanych w ramach Europejskiej Stolica Kultury Wrocław 2016. Członkini Rady Muzeum Architektury, Rady Muzeum Współczesnego Wrocławia oraz Miejskiej Komisji Urbanistyczno-Architektonicznej we Wrocławiu.`,
    },
    role: "Consultant  | Poland ",
    image: teamMember2,
    smImage: teamMember2Sm,
    socials: [
      {
        name: "Web",
        url: "http://warsaw.iegis.eu/team/daria-kiezun/",
        icon: <Image src={websiteLinkIcon} alt="website icon" />,
      },
    ],
  },
];

const architectureConsultants: TeamPerson[] = [
  {
    name: "Józef Franczok",
    description: {
      en: `Józef completed Architecture and Urban Planning at Polish Wrocław University of Science and Technology. He has gained experience working in Poland, Spain, and Colombia. He is a PhD student at the Wrocław University of Science and Technology and a lecturer at the University of Opole. Józef is also a co-owner of the prestigious design office, PORT studio in Poland. At Libelit, he is the leading architect designing the first real estate project on the platform.`,
      pl: `prezes wrocławskiego oddziału SARP
Kierownik Katedry Ceramiki na Akademii Sztuk Pięknych im. E. Gepperta we Wrocławiu
Absolwentka Wydziału Architektury Politechniki Wrocławskiej oraz Podyplomowych Studiów Kuratorskich w Zakresie Sztuki Współczesnej na Uniwersytecie Jagiellońskim. Od 2002 roku prowadzi własną praktykę projektową, wykonując projekty w Polsce i zagranicą. Od 2010 r. pracuje na Wydziale Ceramiki i Szkła w Pracowni Ceramiki w Architekturze wrocławskiej ASP, współprowadząc interdyscyplinarne zajęcia i autorskie wykłady. Za działalność dydaktyczną dostała nagrodę Ministra Kultury i Dziedzictwa Narodowego. W latach 2012-2015 współrealizowała program Dolnośląskiej Sieci Wzornictwa Przemysłowego, którego głównym zadaniem było sieciowanie środowisk naukowych i przemysłu. Autorka publikacji oraz kurator projektów z dziedziny sztuki i architektury. Współtwórczyni i dyrektor programowy Dolnośląskiego Festiwalu Architektury, organizowanego corocznie przez wrocławski oddział SARP. W ramach działalności związanej z SARP była kuratorem wielu wydarzeń organizowanych w ramach Europejskiej Stolica Kultury Wrocław 2016. Członkini Rady Muzeum Architektury, Rady Muzeum Współczesnego Wrocławia oraz Miejskiej Komisji Urbanistyczno-Architektonicznej we Wrocławiu.`,
    },
    role: "Architect | Poland",
    image: teamMember3,
    smImage: teamMember3Sm,

    socials: [
      {
        name: "Web",
        url: " http://portinfo.pl/en/start/",
        icon: <Image src={websiteLinkIcon} alt="website icon" />,
      },
    ],
  },
  {
    name: "Aleksandra Jansen",
    description: {
      en: `Aleksandra is an architect who graduated from the Polish Wrocław University of Science and Technology and the prestigious German Dessau Institute of Architecture (DIA). With over eight years of experience, she specializes in providing cutting-edge technologies for the construction sector. Her interests lie in using ecological solutions in architecture and promoting construction practices that respect the natural environment. 
    At Libelit, she co-created the first real estate project on the platform alongside Józef Franczok.
    `,
      pl: `prezes wrocławskiego oddziału SARP
Kierownik Katedry Ceramiki na Akademii Sztuk Pięknych im. E. Gepperta we Wrocławiu
Absolwentka Wydziału Architektury Politechniki Wrocławskiej oraz Podyplomowych Studiów Kuratorskich w Zakresie Sztuki Współczesnej na Uniwersytecie Jagiellońskim. Od 2002 roku prowadzi własną praktykę projektową, wykonując projekty w Polsce i zagranicą. Od 2010 r. pracuje na Wydziale Ceramiki i Szkła w Pracowni Ceramiki w Architekturze wrocławskiej ASP, współprowadząc interdyscyplinarne zajęcia i autorskie wykłady. Za działalność dydaktyczną dostała nagrodę Ministra Kultury i Dziedzictwa Narodowego. W latach 2012-2015 współrealizowała program Dolnośląskiej Sieci Wzornictwa Przemysłowego, którego głównym zadaniem było sieciowanie środowisk naukowych i przemysłu. Autorka publikacji oraz kurator projektów z dziedziny sztuki i architektury. Współtwórczyni i dyrektor programowy Dolnośląskiego Festiwalu Architektury, organizowanego corocznie przez wrocławski oddział SARP. W ramach działalności związanej z SARP była kuratorem wielu wydarzeń organizowanych w ramach Europejskiej Stolica Kultury Wrocław 2016. Członkini Rady Muzeum Architektury, Rady Muzeum Współczesnego Wrocławia oraz Miejskiej Komisji Urbanistyczno-Architektonicznej we Wrocławiu.`,
    },
    role: "Architect | Poland",
    image: teamMember4,
    smImage: teamMember4Sm,

    socials: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/aleksandra-jensen-b6587373/",
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2290_26615)">
              <path
                d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_2290_26615">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ),
      },
    ],
  },
];

const coreTeam: TeamPerson[] = [
  {
    name: "Ashim",
    description: {
      en: `Ashim is a software engineer with a strong interest in blockchain development. He focuses on building scalable, high-performance applications and is driven by a passion for exploring innovative solutions in blockchain technology while delivering robust and efficient software systems.`,
      pl: `prezes wrocławskiego oddziału SARP
Kierownik Katedry Ceramiki na Akademii Sztuk Pięknych im. E. Gepperta we Wrocławiu
Absolwentka Wydziału Architektury Politechniki Wrocławskiej oraz Podyplomowych Studiów Kuratorskich w Zakresie Sztuki Współczesnej na Uniwersytecie Jagiellońskim. Od 2002 roku prowadzi własną praktykę projektową, wykonując projekty w Polsce i zagranicą. Od 2010 r. pracuje na Wydziale Ceramiki i Szkła w Pracowni Ceramiki w Architekturze wrocławskiej ASP, współprowadząc interdyscyplinarne zajęcia i autorskie wykłady. Za działalność dydaktyczną dostała nagrodę Ministra Kultury i Dziedzictwa Narodowego. W latach 2012-2015 współrealizowała program Dolnośląskiej Sieci Wzornictwa Przemysłowego, którego głównym zadaniem było sieciowanie środowisk naukowych i przemysłu. Autorka publikacji oraz kurator projektów z dziedziny sztuki i architektury. Współtwórczyni i dyrektor programowy Dolnośląskiego Festiwalu Architektury, organizowanego corocznie przez wrocławski oddział SARP. W ramach działalności związanej z SARP była kuratorem wielu wydarzeń organizowanych w ramach Europejskiej Stolica Kultury Wrocław 2016. Członkini Rady Muzeum Architektury, Rady Muzeum Współczesnego Wrocławia oraz Miejskiej Komisji Urbanistyczno-Architektonicznej we Wrocławiu.`,
    },
    role: "IT Developer | Nepal",
    image: teamMember5,
    smImage: teamMember5Sm,

    socials: [],
  },
  {
    name: "Paweł",
    description: {
      en: `As a real estate marketing specialist at Libelit, Paweł develops and 
    implements cutting-edge solutions for developers worldwide. He is 
    passionate about the global and local real estate market and is 
    responsible for communication strategy and copywriting.`,
      pl: `prezes wrocławskiego oddziału SARP
Kierownik Katedry Ceramiki na Akademii Sztuk Pięknych im. E. Gepperta we Wrocławiu
Absolwentka Wydziału Architektury Politechniki Wrocławskiej oraz Podyplomowych Studiów Kuratorskich w Zakresie Sztuki Współczesnej na Uniwersytecie Jagiellońskim. Od 2002 roku prowadzi własną praktykę projektową, wykonując projekty w Polsce i zagranicą. Od 2010 r. pracuje na Wydziale Ceramiki i Szkła w Pracowni Ceramiki w Architekturze wrocławskiej ASP, współprowadząc interdyscyplinarne zajęcia i autorskie wykłady. Za działalność dydaktyczną dostała nagrodę Ministra Kultury i Dziedzictwa Narodowego. W latach 2012-2015 współrealizowała program Dolnośląskiej Sieci Wzornictwa Przemysłowego, którego głównym zadaniem było sieciowanie środowisk naukowych i przemysłu. Autorka publikacji oraz kurator projektów z dziedziny sztuki i architektury. Współtwórczyni i dyrektor programowy Dolnośląskiego Festiwalu Architektury, organizowanego corocznie przez wrocławski oddział SARP. W ramach działalności związanej z SARP była kuratorem wielu wydarzeń organizowanych w ramach Europejskiej Stolica Kultury Wrocław 2016. Członkini Rady Muzeum Architektury, Rady Muzeum Współczesnego Wrocławia oraz Miejskiej Komisji Urbanistyczno-Architektonicznej we Wrocławiu.`,
    },
    role: "Copywriter | Poland",
    image: teamMember6,
    smImage: teamMember6Sm,

    socials: [],
  },
  {
    name: "Justyna",
    description: {
      en: `A graduate of the Lodz University of Technology and the Warsaw University of Technology in Poland. An architect by education, a computer graphic designer by profession and passion. She gained international experience, including in Australia, and uses her deep aesthetic sense in her everyday work. At Libelit, Justyna is responsible for the overall graphic design of the project and visual identification. Her task is to convey all the advantages and values of the platform using images and graphics`,
      pl: `prezes wrocławskiego oddziału SARP
Kierownik Katedry Ceramiki na Akademii Sztuk Pięknych im. E. Gepperta we Wrocławiu
Absolwentka Wydziału Architektury Politechniki Wrocławskiej oraz Podyplomowych Studiów Kuratorskich w Zakresie Sztuki Współczesnej na Uniwersytecie Jagiellońskim. Od 2002 roku prowadzi własną praktykę projektową, wykonując projekty w Polsce i zagranicą. Od 2010 r. pracuje na Wydziale Ceramiki i Szkła w Pracowni Ceramiki w Architekturze wrocławskiej ASP, współprowadząc interdyscyplinarne zajęcia i autorskie wykłady. Za działalność dydaktyczną dostała nagrodę Ministra Kultury i Dziedzictwa Narodowego. W latach 2012-2015 współrealizowała program Dolnośląskiej Sieci Wzornictwa Przemysłowego, którego głównym zadaniem było sieciowanie środowisk naukowych i przemysłu. Autorka publikacji oraz kurator projektów z dziedziny sztuki i architektury. Współtwórczyni i dyrektor programowy Dolnośląskiego Festiwalu Architektury, organizowanego corocznie przez wrocławski oddział SARP. W ramach działalności związanej z SARP była kuratorem wielu wydarzeń organizowanych w ramach Europejskiej Stolica Kultury Wrocław 2016. Członkini Rady Muzeum Architektury, Rady Muzeum Współczesnego Wrocławia oraz Miejskiej Komisji Urbanistyczno-Architektonicznej we Wrocławiu.`,
    },
    role: "Product Designer | Poland",
    image: teamMember7,
    smImage: teamMember7Sm,

    socials: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/justyna-kazmierczak",
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2290_26615)">
              <path
                d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_2290_26615">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ),
      },
    ],
  },
  {
    name: "Muzammil",
    description: {
      en: `Engineer and programmer. He is familiar with the world of modern technologies that he uses in his daily work. He is fascinated by the 3D world, to which he transfers his skills and creativity.
    At Libelit, Muzammil is a virtual reality specialist who can present even the most spectacular architectural designs.
    `,
      pl: `prezes wrocławskiego oddziału SARP
Kierownik Katedry Ceramiki na Akademii Sztuk Pięknych im. E. Gepperta we Wrocławiu
Absolwentka Wydziału Architektury Politechniki Wrocławskiej oraz Podyplomowych Studiów Kuratorskich w Zakresie Sztuki Współczesnej na Uniwersytecie Jagiellońskim. Od 2002 roku prowadzi własną praktykę projektową, wykonując projekty w Polsce i zagranicą. Od 2010 r. pracuje na Wydziale Ceramiki i Szkła w Pracowni Ceramiki w Architekturze wrocławskiej ASP, współprowadząc interdyscyplinarne zajęcia i autorskie wykłady. Za działalność dydaktyczną dostała nagrodę Ministra Kultury i Dziedzictwa Narodowego. W latach 2012-2015 współrealizowała program Dolnośląskiej Sieci Wzornictwa Przemysłowego, którego głównym zadaniem było sieciowanie środowisk naukowych i przemysłu. Autorka publikacji oraz kurator projektów z dziedziny sztuki i architektury. Współtwórczyni i dyrektor programowy Dolnośląskiego Festiwalu Architektury, organizowanego corocznie przez wrocławski oddział SARP. W ramach działalności związanej z SARP była kuratorem wielu wydarzeń organizowanych w ramach Europejskiej Stolica Kultury Wrocław 2016. Członkini Rady Muzeum Architektury, Rady Muzeum Współczesnego Wrocławia oraz Miejskiej Komisji Urbanistyczno-Architektonicznej we Wrocławiu.`,
    },
    role: "3D & VR Designer | Pakistan",
    image: teamMember8,
    smImage: teamMember8Sm,

    socials: [],
  },
];

export default async function MyComponent({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { translate } = await getDictionary(lang);

  return (
    <>
      <div className="items-center self-stretch bg-white flex w-full flex-col justify-center mt-16 py-12 lg:px-[112px] md:px-8 px-5">
        <div className="flex w-full max-w-[1216px] flex-col">
          <p className="text-accent-500 text-base font-semibold leading-6 self-start max-md:max-w-full">
            {translate.who_are_we}
          </p>
          <h1 className="text-neutral-950 text-4xl leading-[2.75rem] md:text-[2.75rem] md:leading-[3.25rem] lg:text-[3.5rem] lg:leading-[4.5rem] font-bold  tracking-tighter mt-3 self-start max-md:max-w-full ">
            {translate.meet_our_team}
          </h1>
          <div className="text-neutral-700 text-xl font-normal leading-8 w-[768px] max-w-full mt-5 self-start">
            <p>{translate.subheading1}</p>
            <br />
            <p>{translate.subheading2}</p>
          </div>

          <div className="items-stretch flex gap-2.5 mt-24 max-md:max-w-full max-md:flex-wrap relative z-1">
            <ContactUsButton text={translate.contact_us} />
          </div>
          <div className="flex mt-24 lg:mt-24 flex-col gap-[2.5rem]">
            <div className="flex flex-col gap-6">
              <h2 className=" text-neutral-950 font-bold text-2xl leading-8 md:text-3xl md:leading-[2.375rem] lg:text-4xl  lg:leading-10">
                {translate.founding_team}
              </h2>
              <div className="grid grid-cols-12 gap-6">
                {foundatingTeam.map((person) => (
                  <div key={person.name} className="col-span-12 md:col-span-6">
                    <TeamCard person={person} lang={lang} size="lg" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h2 className=" text-neutral-950 font-bold text-2xl leading-8 md:text-3xl md:leading-[2.375rem] lg:text-4xl  lg:leading-10">
                {translate.architecture_consultants}
              </h2>
              <div className="grid grid-cols-12 gap-6">
                {architectureConsultants.map((person) => (
                  <div key={person.name} className="col-span-12 md:col-span-6">
                    <TeamCard person={person} lang={lang} size="md" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h2 className=" text-neutral-950 font-bold text-2xl leading-8 md:text-3xl md:leading-[2.375rem] lg:text-4xl  lg:leading-10">
                {translate.coreTeam}
              </h2>
              <div className="grid grid-cols-12 gap-6">
                {coreTeam.map((person) => (
                  <div
                    key={person.name}
                    className="col-span-12  lg:col-span-3 md:col-span-3"
                  >
                    <TeamCard person={person} lang={lang} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="justify-center items-stretch self-stretch bg-white flex w-full flex-col max-md:max-w-full">
        <div className="flex-col overflow-hidden relative flex w-full justify-center items-center max-md:max-w-full max-md:px-4">
          <div className="relative flex w-full flex-col items-stretch mt-3.5 max-md:max-w-full">
            <h2 className="text-primary-900 heading text-center text-5xl font-bold leading-[52px] max-md:max-w-full z-0 md:mt-32 md:-mb-32 -mb-16 ">
              {translate.based_in}
            </h2>
            <img
              alt="map"
              loading="lazy"
              src={map.src}
              className="w-full aspect-auto lg:block hidden"
            />
            <img
              alt="map"
              loading="lazy"
              src={mapTablet.src}
              className="w-full aspect-auto lg:hidden md:block hidden"
            />
            <img
              alt="map"
              loading="lazy"
              src={mapMobile.src}
              className="w-full aspect-auto md:hidden block"
            />
          </div>
        </div>
      </div>

      <div className="items-center self-stretch bg-white flex w-full flex-col justify-center pt-[96px] lg:pb-[96px] md:pb-[64px] pb-[48px] lg:px-[112px] md:px-8 px-5">
        <Subscribe lang={lang}></Subscribe>
      </div>
    </>
  );
}
