import Link from "next/link";
import React from "react";
import { IoIosStats } from "react-icons/io";
import { RiOpenaiFill } from "react-icons/ri";
import { FaWpforms } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";

let links = [
  { link: '/Chatbot', title: 'ChatBot',logo:<RiOpenaiFill/> },
  { link: '/Addjob', title: 'AddJob',logo:<FaWpforms/>},
  { link: '/Jobs', title: 'Jobs',logo:<CiBoxList></CiBoxList> },
  { link: '/Stats', title: 'Stats',logo:<IoIosStats/>},
]

function Navlink() {

  return (
    <div className="flex flex-col gap-6 my-20">
      {
        links.map((link, index) => {
          return (
            <div className="flex flex-row items-center gap-3 btn  btn-ghost w-full text-xl capitalize">
            <Link href={link.link} key={index} className="flex flex-row items-center gap-3">
              <h1 className="text-xl">{link.logo}</h1>
              <button>{link.title}</button>
            </Link>
            </div>
          );
        })
      }


    </div>
  );
};

export { Navlink };