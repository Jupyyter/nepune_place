"use client";
// pages/about.tsx
import Image from 'next/image';
import Head from 'next/head';
import { FaJava, FaReact, FaHtml5, FaCss3Alt, FaUnity, FaNodeJs, FaGitAlt } from 'react-icons/fa';
import { SiCplusplus, SiJavascript, SiTypescript, SiSfml, SiNextdotjs } from 'react-icons/si';

const ListItem = ({ text }: { text: string }) => (
  <p className="text-xl text-white px-4 py-2">{text}</p>
);

const About = () => {
  const aboutTexts = [
    '-here i call myself "nepune" but on the internet I use names derived from the names of the planets',
    '-i am 19 years old',
    '-i code since i was 15 and started taking it more seriously when i was 16',
    '-i usually program games',
    '-i am best suited as a software developer'
  ];

  const technologies = [
    { icon: <FaJava />, name: 'Java', comment: 'I learned the basics by making checkers and some other game in greenfoot. i hate the syntax' },
    { icon: <SiCplusplus />, name: 'C/C++', comment: 'my favoryte programing language. can do anything with it. the program not efficient? skill issue' },
    { icon: <SiJavascript />, name: 'JavaScript', comment: '0 == [] (true); 0 == "0" (true); "0" == [] (false); do I need to say anything else?'},
    { icon: <SiTypescript />, name: 'TypeScript', comment: 'JavaScript but better. I used it to make this site' },
    { 
      icon: (
        <Image
          src="/imgs/Greenfoot_Logo.jpg"
          alt="Greenfoot"
          width={32}
          height={32}
          className="rounded"
          priority // Prioritize this image
        />
      ),
      name: 'Greenfoot', 
      comment: 'a joke of a game engine. the sound system simply doesnt work properly for some reason. worst experience that i ever had using any software' 
    },
    { icon: <SiSfml />, name: 'SFML', comment: 'practical graphics library when you want to make things appear on the screen. i choose it over sdl2 altho thats just because its more simple' },
    { 
      icon: (
        <Image
          src="/imgs/sdl.svg"
          alt="SDL2"
          width={32}
          height={32}
          className="rounded"
          priority // Prioritize this image
        />
      ), 
      name: 'SDL2', 
      comment: 'its ok. i had a good experience with sdl2, but i would only use it over sfml when developing android or ios apps. i dont really know why, but i think i simply dont like how the code looks' 
    },
    { icon: <FaUnity />, name: 'Unity', comment: 'unfortunately due to all the ui, making a game in unity doesnt compare to making a game without an engine. besides, its not open source' },
    { icon: <FaReact />, name: 'React', comment: 'i used nextjs which uses react for this site, so react=yes=i do indeed like it over the other site-making-software' },
    { icon: <FaHtml5 />, name: 'HTML', comment: 'umm...do i have to say that i do know some html since i made this site?'},
    { icon: <FaCss3Alt />, name: 'CSS', comment: 'yes, i can code some css since i made this site' },
    { 
      icon: (
        <Image
          src="/imgs/godot.png"
          alt="Godot"
          width={32}
          height={32}
          className="rounded"
          priority // Prioritize this image
        />
      ), 
      name: 'Godot', 
      comment: 'great engine. i like it more than unity because its more lightweight and its open source (hooray)' 
    },
    { 
      icon: (
        <Image
          src="/imgs/gdscript.jpg"
          alt="GDScript"
          width={32}
          height={32}
          className="rounded"
          priority // Prioritize this image
        />
      ), 
      name: 'GDScript', 
      comment: 'the language used in godot. its like python but better :)' 
    },
    { icon: <SiNextdotjs />, name: 'Next.js', comment: 'used it to make this site. its great for making websites with react' },
    { icon: <FaGitAlt />, name: 'Git', comment: 'i like typing commands instead of using an ui for managing my projects with github' }
  ];

  return (
    <div className="flex-grow flex flex-col items-center justify-center">
      <Head>
        {/* Preload all images */}
        <link rel="preload" href="/imgs/Greenfoot_Logo.jpg" as="image" />
        <link rel="preload" href="/imgs/sdl.svg" as="image" />
        <link rel="preload" href="/imgs/godot.png" as="image" />
        <link rel="preload" href="/imgs/gdscript.jpg" as="image" />
      </Head>
      <main className="p-4">
        <h1 className="text-4xl font-bold mb-4">
          things about me:
        </h1>
        {aboutTexts.map((text, index) => (
          <ListItem key={index} text={text} />
        ))}
        <p className="text-2xl py-2">
          these are the programming languages/software i have experience with:
        </p>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
          {technologies.map((tech, index) => (
            <div key={index} className="group relative flex flex-col items-center p-4 bg-gray-800 rounded-lg shadow-lg">
              <div className="text-4xl text-white">
                {tech.icon}
              </div>
              <p className="text-white mt-2">{tech.name}</p>
              <div className="absolute bottom-full mb-2 hidden group-hover:block bg-purple-600 text-white text-sm p-2 rounded">
                {tech.comment}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default About;