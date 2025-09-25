// Assuming this is pages/index.tsx or app/page.tsx
import Head from 'next/head';

// Define the list of images from ALL other pages you want to preload
const imagesToPreload = [
  // From About page
  '/imgs/Greenfoot_Logo.jpg',
  '/imgs/gdscript.jpg',
  '/imgs/godot.png',
  '/imgs/sdl.svg',

  // From Contact page
  '/imgs/mail.jpg',
  '/imgs/github.jpg',

  // From Projects page (Thumbnails & Static)
  '/imgs/jhonny.png',
  '/imgs/badApple.png',
  '/imgs/GabrielIsHungry.png',
  '/imgs/bingChilling.png',
  '/imgs/shadowGang.png',
  '/imgs/cppGame.png',
  '/imgs/checkers.png',
  '/imgs/ikeaMan.jpg',
  '/imgs/THEROAD.jpg',

  '/imgs/jhonny0.png', '/imgs/jhonny1.png', '/imgs/jhonny2.png', '/imgs/jhonny3.png',
  '/imgs/BADAPPLE0.png', '/imgs/BADAPPLE1.png',
  '/imgs/GabrielIsHungry0.png', '/imgs/GabrielIsHungry1.png', '/imgs/GabrielIsHungry2.png', '/imgs/GabrielIsHungry3.png', '/imgs/GabrielIsHungry4.png', '/imgs/GabrielIsHungry5.png',
  '/imgs/bingChilling0.png', '/imgs/bingChilling1.png', '/imgs/bingChilling2.png', '/imgs/bingChilling3.png',
  '/imgs/WizardGang0.png', '/imgs/WizardGang1.png', '/imgs/WizardGang2.png', '/imgs/WizardGang3.png', '/imgs/WizardGang4.png', '/imgs/WizardGang5.png', '/imgs/WizardGang6.png',
  '/imgs/3roomAdventure0.png', '/imgs/3roomAdventure1.png', '/imgs/3roomAdventure2.png', '/imgs/3roomAdventure3.png',
  '/imgs/checkers0.png', '/imgs/checkers1.png', '/imgs/checkers2.png', '/imgs/checkers3.png', '/imgs/checkers4.png',
  '/imgs/the road0.png', '/imgs/the road1.png',
];

// Remove duplicates
const uniqueImagesToPreload = Array.from(new Set(imagesToPreload));

export default function Home() {
  return (
    <>
      <Head>
        <title>nepune place</title>

        {}
        {uniqueImagesToPreload.map((imageUrl) => (
          <link
            key={imageUrl}
            rel="preload"
            href={imageUrl}
            as="image"
          />
        ))}
      </Head>

      {}
      <div className="flex-grow flex items-center justify-center">
        <main className="text-center p-4">
          <h1 className="text-4xl font-bold mb-4 py-1">Neptune place</h1>
          <p className="text-lg py-1">
            I use this site to represent myself on the internet and showcase my projects. Nothing much.
          </p>
          <p className="text-lg py-1">
            -I prefer this site to have minimal animation so there isn&apos;t much of it.
          </p>
        </main>
      </div>
    </>
  )
}