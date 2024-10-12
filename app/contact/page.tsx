import Image, { StaticImageData } from 'next/image';


const ContactItem = ({ icon, text, link }: { icon: string, text: string, link?: string }) => (
  <div className="flex items-stretch mb-4">
    <div 
      className="flex-shrink-0 w-12 h-12 mr-4 relative" 
      style={{ userSelect: 'none' }} 
      draggable="false"
    >
      <Image src={icon} alt="" width={50} height={50} priority draggable="false" />
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
        <ContactItem icon="/imgs/mail.jpg" text="my email: raducea.matei2005@gmail.com" />
        <ContactItem icon="/imgs/github.jpg" text="my github" link="https://github.com/Jupyyter" />
      </main>
    </div>
  );
}
