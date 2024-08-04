"use client";
import Image, { StaticImageData } from 'next/image';
import phoneIcon from "../../public/imgs/phone.jpg";
import mailIcon from "../../public/imgs/mail.jpg";
import githubIcon from "../../public/imgs/github.jpg";

const ContactItem = ({ icon, text, link }: { icon: StaticImageData, text: string, link?: string }) => (
  <div className="flex items-stretch mb-4">
    <div 
      className="flex-shrink-0 w-12 h-12 mr-4 relative" 
      style={{ userSelect: 'none' }} 
      draggable="false"
    >
      <Image src={icon} alt="" priority draggable="false" />
    </div>
    <div className="flex-grow flex items-center min-h-[3rem]">
      {link ? (
        <a href={link} className="text-lg text-yellow-400 hover:text-yellow-300 underline" target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ) : (
        <p className="text-lg my-auto">{text}</p>
      )}
    </div>
  </div>
);

export default function Contact() {
  return (
    <div className="flex-grow flex items-center justify-center">
      <main className="text-center p-4">
        <h1 className="text-4xl font-bold mb-4">contacts</h1>
        <ContactItem icon={phoneIcon} text="my phone number: 0765823655" />
        <ContactItem icon={mailIcon} text="my email: raducea.matei2005@gmail.com" />
        <ContactItem icon={githubIcon} text="my github repositories" link="https://github.com/Jupyyter?tab=repositories" />
      </main>
    </div>
  );
}
