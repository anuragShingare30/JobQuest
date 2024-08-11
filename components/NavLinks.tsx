import Link from "next/link";
import React from "react";


let links = [
  {link:'/Chatbot', title:'ChatBot'},
  {link:'/Addjob', title:'AddJob'},
  {link:'/Jobs', title:'Jobs'},
  {link:'/Stats', title:'Stats'},
]

function Navlink(){

    return (
        <div className="flex flex-col gap-6 my-20">
          {
            links.map((link,index)=>{
              return (
                <Link href={link.link} key={index}>
                <button className="btn  btn-ghost w-full text-xl capitalize">{link.title}</button>
            </Link>
              );
            })
          }
             

        </div>
    );
};

export {Navlink};