// Assuming this is pages/index.tsx or app/page.tsx
import Head from 'next/head';

// Define the list of images from ALL other pages you want to preload
const imagesToPreload = [
  // From About page (assuming you still want these)
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

  // From Projects page (Project Images - dynamically generated paths)
  '/imgs/jhonny0.png', '/imgs/jhonny1.png', '/imgs/jhonny2.png', '/imgs/jhonny3.png',
  '/imgs/BADAPPLE0.png', '/imgs/BADAPPLE1.png',
  '/imgs/GabrielIsHungry0.png', '/imgs/GabrielIsHungry1.png', '/imgs/GabrielIsHungry2.png', '/imgs/GabrielIsHungry3.png', '/imgs/GabrielIsHungry4.png', '/imgs/GabrielIsHungry5.png',
  '/imgs/bingChilling0.png', '/imgs/bingChilling1.png', '/imgs/bingChilling2.png', '/imgs/bingChilling3.png',
  '/imgs/WizardGang0.png', '/imgs/WizardGang1.png', '/imgs/WizardGang2.png', '/imgs/WizardGang3.png', '/imgs/WizardGang4.png', '/imgs/WizardGang5.png', '/imgs/WizardGang6.png',
  '/imgs/3roomAdventure0.png', '/imgs/3roomAdventure1.png', '/imgs/3roomAdventure2.png', '/imgs/3roomAdventure3.png',
  '/imgs/checkers0.png', '/imgs/checkers1.png', '/imgs/checkers2.png', '/imgs/checkers3.png', '/imgs/checkers4.png',
  // Ikea Man uses Jhonny images - already included above
  '/imgs/the road0.png', '/imgs/the road1.png',

  // Add any other images from other pages if needed
];

// Remove duplicates just in case (optional but good practice)
const uniqueImagesToPreload = Array.from(new Set(imagesToPreload));

export default function Home() {
  return (
    <>
      <Head>
        <title>nepune place</title>

        {/* Add preload links for each unique image */}
        {uniqueImagesToPreload.map((imageUrl) => (
          <link
            key={imageUrl}
            rel="preload"
            href={imageUrl}
            as="image"
          />
        ))}
      </Head>

      {/* Your original page content */}
      <div className="flex-grow flex items-center justify-center">
        <main className="text-center p-4">
          <h1 className="text-4xl font-bold mb-4 py-1">nepune place</h1>
          <p className="text-lg py-1">
            i use this site to represent myself on the internet and showcase my projects. nothing much
          </p>
          <p className="text-lg py-1">
            -this site doesnt have animations because i hate them
          </p>
        </main>
      </div>
    </>
  )
}