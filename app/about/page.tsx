"use client";
// pages/about.tsx
import Image from 'next/image';

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

  return (
    <div className="flex-grow flex flex-col items-center justify-center">
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
        <Image
          src={"/imgs/things.png"}
          alt="Planets"
          className="mt-4 rounded-lg shadow-lg"
          priority
          width={1000}
          height={147}
          style={{ height: 'auto' }}
        />
      </main>
    </div>
  );
};

export default About;