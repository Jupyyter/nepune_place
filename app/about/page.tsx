"use client";
// pages/about.tsx
import Image from 'next/image';
import Head from 'next/head';
// UPDATED: Added FaJava
import { FaReact, FaHtml5, FaCss3Alt, FaUnity, FaGitAlt, FaPython, FaJava } from 'react-icons/fa';
import { SiCplusplus, SiJavascript, SiTypescript, SiSfml, SiNextdotjs, SiGodotengine, SiTailwindcss } from 'react-icons/si';
import React from 'react'; // Import React

// --- Color Definitions ---
const preferenceColors = {
    darkGreen:  { bg: 'bg-green-700',  text: 'text-white', tooltip: 'Specialized & Preferred' },
    lightGreen: { bg: 'bg-lime-500',   text: 'text-black', tooltip: 'Highly Preferred' },
    lightBlue:  { bg: 'bg-sky-400',    text: 'text-black', tooltip: 'Generally Liked' },
    white:      { bg: 'bg-gray-200',   text: 'text-black', tooltip: 'Neutral / Competent' },
    yellow:     { bg: 'bg-yellow-400', text: 'text-black', tooltip: 'Use when needed' },
    orange:     { bg: 'bg-orange-500', text: 'text-black', tooltip: 'Used, but with reservations' },
    red:        { bg: 'bg-red-600',    text: 'text-white', tooltip: 'Disliked / Avoid if possible' },
    gray:       { bg: 'bg-gray-600',   text: 'text-white', tooltip: 'Version Control'} // Kept for potential future use, though Git is now darkGreen
};

// --- Types ---
interface Technology {
    icon: React.ReactNode | null; // Allow null for title "technologies"
    name: string;
    comment: string;
    preference: keyof typeof preferenceColors;
    isTitle?: boolean; // Flag to identify category titles if needed later
}

interface Category {
    title: string;
    titleComment: string; // Add comment specific to the category title
    titlePreference: keyof typeof preferenceColors; // Add preference for the category title background
    technologies: Technology[];
}

// --- Constants ---
const BORDER_CLASS = "border-gray-400";
const BORDER_THICKNESS_CLASS = "border-2";
// const HORIZONTAL_PADDING_VALUE = "24"; // No longer needed for direct class construction
// const VERTICAL_PADDING_VALUE = "24"; // No longer needed for direct class construction
const BASE_PADDING = "p-6"; // Standard padding around content
// Define extra padding amount to push content away from the C/C++ oval
const EXTRA_PADDING_CLASS_VERTICAL = "py-12"; // Extra top/bottom padding for small screens (adjust value as needed)
const EXTRA_PADDING_CLASS_HORIZONTAL = "px-12"; // Extra left/right padding for large screens (adjust value as needed)


// --- Reusable Components ---

// Tooltip Component
const Tooltip = ({ text }: { text: string }) => (
    <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs hidden group-hover:block bg-purple-700 text-white text-xs sm:text-sm p-2 rounded z-30 shadow-lg pointer-events-none whitespace-normal text-center`}>
        {text}
    </div>
);


// Technology Item Component
const TechnologyItem = ({ tech, isOval = false }: { tech: Technology, isOval?: boolean }) => {
    const colorInfo = preferenceColors[tech.preference];
    const bgColor = colorInfo ? colorInfo.bg : 'bg-gray-500';
    const textColor = ['lightGreen', 'lightBlue', 'white', 'yellow', 'orange'].includes(tech.preference) ? 'text-black' : 'text-white';
    const itemClasses = isOval
        ? `rounded-full p-2 flex flex-col justify-center items-center w-16 h-16`
        : 'rounded-lg p-2 shadow-md w-auto h-auto';
    const iconSize = isOval ? 'text-2xl' : 'text-3xl sm:text-4xl';
    const textSize = isOval ? 'text-xs' : 'text-xs sm:text-sm';

    return (
        <div className={`group relative flex flex-col items-center m-1 sm:m-2 transition-colors duration-200 ${bgColor} ${itemClasses}`}>
            <Tooltip text={tech.comment} />
            {tech.icon && (
                 <div className={`flex items-center justify-center ${isOval ? 'h-6 w-6 mb-0.5' : 'h-8 w-8 sm:h-10 sm:w-10 mb-1'} ${preferenceColors[tech.preference]?.text || 'text-white'}`}>
                    {React.isValidElement(tech.icon) && typeof tech.icon !== 'string'
                        ? React.cloneElement(tech.icon as React.ReactElement<any>, { className: `${iconSize} ${preferenceColors[tech.preference]?.text || 'text-white'}` })
                        : <span className={iconSize}>{tech.icon}</span>
                    }
                </div>
            )}
            <p className={`text-center font-medium ${textColor} ${textSize}`}>{tech.name}</p>
        </div>
    );
};

// Category Title Component
const CategoryTitleItem = ({ title, comment, preference }: { title: string, comment: string, preference: keyof typeof preferenceColors }) => {
    const colorInfo = preferenceColors[preference];
    const bgColor = colorInfo ? colorInfo.bg : 'bg-gray-500';
    const textColor = ['lightGreen', 'lightBlue', 'white', 'yellow', 'orange'].includes(preference) ? 'text-black' : 'text-white';

    return (
        <div className="group relative inline-block mb-4">
            <div className={`rounded-lg p-2 shadow-md ${bgColor} cursor-default`}>
                <h3 className={`text-2xl font-medium text-center capitalize ${textColor}`}>{title}</h3>
            </div>
            <Tooltip text={comment} />
        </div>
    );
};


// Legend Color Square Component
const LegendColor = ({ colorKey }: { colorKey: keyof typeof preferenceColors }) => {
    const colorInfo = preferenceColors[colorKey];
    if (!colorInfo) return null;
    return (
        <div className={`group relative w-5 h-5 sm:w-6 sm:h-6 m-0.5 cursor-default ${colorInfo.bg} border border-gray-700 flex-shrink-0`}>
            <Tooltip text={colorInfo.tooltip} />
        </div>
    );
}

// --- Main About Page Component ---
const About = () => {
    // --- Data Definitions ---
    const aboutTexts = [
        '- im about 20 years old (more or less im too lazy to update that)',
        '- my current location is Bucharest (the capital city of Romania, a country in Europe)',
        '- i hate humans if you are a human i hate you you better be a carpet or a bed i like beds (the ones which also have a pillow and a blanket so i can use it to hide from the humans)',
    ];

    const CppTech: Technology = {
        icon: <SiCplusplus />, name: 'C/C++',
        comment: 'my favoryte programing language. can do anything with it. the program not efficient? skill issue',
        preference: 'darkGreen'
    };
    const GitTech: Technology = {
        icon: <FaGitAlt />, name: 'Git',
        comment: 'i like typing commands instead of using an ui for managing my projects with github',
        preference: 'darkGreen' // Based on previous update
    };

    let categorizedTechnologies: Category[] = [
         {
            title: "Sites",
            titleComment: "this is the only site i have ever coded :) (i dont really like web developement)",
            titlePreference: 'yellow',
            technologies: [
                // Technologies will be sorted below
                { icon: <FaCss3Alt />, name: 'CSS', comment: ':)', preference: 'white' },
                { icon: <FaHtml5 />, name: 'HTML', comment: ':)', preference: 'white' },
                { icon: <FaReact />, name: 'React', comment: 'i used nextjs which uses react for this site, so react=yes=i do indeed like it over the other site-making-software', preference: 'lightGreen' },
                { icon: <SiNextdotjs />, name: 'Next.js', comment: 'used it to make this site. its great for making websites with react', preference: 'darkGreen' },
                { icon: <SiJavascript />, name: 'JavaScript', comment: '0 == [] (true); 0 == "0" (true); "0" == [] (false); do I need to say anything else?', preference: 'orange' },
                { icon: <SiTypescript />, name: 'TypeScript', comment: 'JavaScript but better. I used it to make this site', preference: 'white' },
                { icon: <SiTailwindcss />, name: 'Tailwind', comment: 'Great utility-first CSS framework. Used for this site.', preference: 'lightBlue' },
            ]
        },
        {
            title: "Games",
            titleComment: "i like games. i wanna make games",
            titlePreference: 'darkGreen',
            technologies: [
                 // Technologies will be sorted below
                { icon: <FaUnity />, name: 'Unity', comment: 'too much ui for me, but its really powerfull (can do a lot of things with it). besides, its not open source', preference: 'lightBlue' },
                { icon: <span className="font-mono font-bold">#</span>, name: 'C#', comment: 'The primary language for Unity. It\'s decent, but I prefer C++.', preference: 'lightBlue' },
                { icon: <FaJava />, name: 'Java', comment: 'I learned the basics by making checkers and some other game in greenfoot. i hate the syntax', preference: 'yellow'},
                { icon: ( <Image src="/imgs/Greenfoot_Logo.jpg" alt="Greenfoot Logo" width={32} height={32} className="rounded" priority /> ), name: 'Greenfoot', comment: 'a joke of a game engine. the sound system simply doesnt work properly for some reason. worst experience that i ever had using any software.', preference: 'red'},
                { icon: ( <Image src="/imgs/gdscript.jpg" alt="GDScript" width={32} height={32} className="rounded" priority /> ), name: 'GDScript', comment: 'the language used in godot. its like python but for godot compatibility :)', preference: 'lightBlue' },
                { icon: ( <Image src="/imgs/godot.png" alt="Godot" width={32} height={32} className="rounded" priority /> ), name: 'Godot', comment: 'great engine. i like it more than unity because its more lightweight and its open source (hooray)', preference: 'darkGreen' },
                { icon: <SiSfml />, name: 'SFML', comment: 'practical graphics library when you want to make things appear on the screen. i choose it over sdl2 altho thats just because its more simple', preference: 'lightGreen' },
                { icon: ( <Image src="/imgs/sdl.svg" alt="SDL2" width={32} height={32} className="rounded filter invert" priority /> ), name: 'SDL2', comment: 'its ok. i had a good experience with sdl2, but i would only use it over sfml when developing android or ios apps. i dont really know why, but i think i simply dont like how the code looks', preference: 'lightBlue' },
           ]
        },
        {
            title: "Other Windows Apps",
            titleComment: "i use windows (fear of change)",
            titlePreference: 'lightBlue',
            technologies: [
                 // Technologies will be sorted below
                { icon: <FaPython />, name: 'Python', comment: 'the best choice for any non-performance oriented project', preference: 'lightGreen' },
            ]
        }
    ];

    // --- Sorting Logic ---
    const preferenceOrder: (keyof typeof preferenceColors)[] = [
        'darkGreen', 'lightGreen', 'lightBlue', 'white', 'yellow', 'orange', 'red', 'gray'
    ];
    const preferenceOrderMap = preferenceOrder.reduce((acc, key, index) => {
        acc[key] = index;
        return acc;
    }, {} as Record<keyof typeof preferenceColors, number>);

    categorizedTechnologies.forEach(category => {
        category.technologies.sort((a, b) => {
            const orderA = preferenceOrderMap[a.preference] ?? 99;
            const orderB = preferenceOrderMap[b.preference] ?? 99;
            return orderA - orderB;
        });
    });
    // --- End Sorting Logic ---


    // --- Render Logic ---
    return (
        <div className="flex flex-col items-center justify-start pt-6 text-gray-200 w-full">
            <Head>
                <title>About Me</title>
                <link rel="preload" href="/imgs/sdl.svg" as="image" />
                <link rel="preload" href="/imgs/godot.png" as="image" />
                <link rel="preload" href="/imgs/gdscript.jpg" as="image" />
                <link rel="preload" href="/imgs/Greenfoot_Logo.jpg" as="image" />
            </Head>

            <main className="p-4 w-full flex flex-col items-center">
                {/* --- About Me Text --- */}
                <div className="w-full max-w-[60%] mx-auto mb-8 text-left">
                    <h1 className="text-4xl font-bold mb-6 text-center text-white">
                        things about me:
                    </h1>
                    {aboutTexts.map((text, index) => (
                         <p key={index} className="text-xl text-gray-300 py-1">{text}</p>
                    ))}
                </div>

                {/* --- Development Tools Section --- */}
                <div className='w-full flex flex-col items-center'>

                    {/* --- Title and Legend Row --- */}
                    <div className="w-full flex flex-col items-center gap-y-4 mb-5 px-4 relative">
                        <div className="flex flex-col items-center max-w-xs sm:max-w-xl">
                            <div className='text-center mb-1'>
                                <p className="text-base sm:text-lg font-medium text-gray-200">
                                    what i specialize in and what i prefer <u className="decoration-purple-400 decoration-2">based on colors</u>
                                </p>
                            </div>
                            <div className="flex flex-wrap justify-center">
                                {Object.keys(preferenceColors)
                                    .filter(key => key !== 'gray' || GitTech.preference === 'gray')
                                    .map(key => ( <LegendColor key={key} colorKey={key as keyof typeof preferenceColors} /> ))}
                            </div>
                        </div>
                        <h2 className="text-3xl font-semibold text-center text-white">
                            things i use for developing
                        </h2>
                    </div>


                    {/* --- Technology Categories Container --- */}
                    <div className={`w-full border-t ${BORDER_CLASS} ${BORDER_THICKNESS_CLASS} relative`}>
                        <div className="flex flex-col lg:flex-row justify-center">
                            {categorizedTechnologies.map((category, catIndex) => {
                                const isGamesCategory = category.title === "Games";
                                const isOtherAppsCategory = category.title === "Other Windows Apps";
                                const isLastCategory = catIndex === categorizedTechnologies.length - 1;

                                // --- START PADDING LOGIC MODIFICATION ---
                                let paddingClasses = BASE_PADDING; // Start with base padding for all

                                if (isGamesCategory) {
                                    // Add extra bottom padding for small screens (vertical layout)
                                    // Add extra right padding for large screens (horizontal layout)
                                    // Reset the other axis padding to base padding's default on large screens
                                    paddingClasses += ` pb-16 lg:pb-6 lg:pr-16`; // Adjust 16 as needed
                                } else if (isOtherAppsCategory) {
                                    // Add extra top padding for small screens (vertical layout)
                                    // Add extra left padding for large screens (horizontal layout)
                                    // Reset the other axis padding to base padding's default on large screens
                                    paddingClasses += ` pt-16 lg:pt-6 lg:pl-16`; // Adjust 16 as needed
                                }
                                // 'Sites' category just gets BASE_PADDING
                                // --- END PADDING LOGIC MODIFICATION ---


                                return (
                                    <div
                                        key={category.title}
                                        className={`flex-1 relative ${
                                            catIndex > 0 ? `lg:border-l ${BORDER_CLASS} ${BORDER_THICKNESS_CLASS}` : ''
                                        } ${
                                            !isLastCategory ? `border-b lg:border-b-0 ${BORDER_CLASS} ${BORDER_THICKNESS_CLASS}` : ''
                                        }`}
                                    >
                                        {/* Apply calculated paddingClasses here */}
                                        <div className={`flex flex-col items-center ${paddingClasses}`}>
                                            <CategoryTitleItem
                                                title={category.title}
                                                comment={category.titleComment}
                                                preference={category.titlePreference}
                                            />
                                            <div className="flex flex-wrap justify-center items-start gap-1 sm:gap-2 min-h-[50px] w-full">
                                                {category.technologies.map((tech) => (
                                                    <TechnologyItem key={tech.name} tech={tech} />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Small Screen C/C++ Placement (Positioned relative to this container) */}
                                        {isOtherAppsCategory && (
                                            <div className={`absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 lg:hidden z-10 border ${BORDER_CLASS} ${BORDER_THICKNESS_CLASS} rounded-full bg-black p-0.5`}>
                                                <TechnologyItem tech={CppTech} isOval={true} />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        {/* Large Screen C/C++ Placement (Positioned relative to the main container) */}
                        {/* Note: This is positioned relative to the parent `w-full border-t` div */}
                        <div className={`hidden lg:block absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 z-10 border ${BORDER_CLASS} ${BORDER_THICKNESS_CLASS} rounded-full bg-black p-0.5`}>
                             <TechnologyItem tech={CppTech} isOval={true} />
                        </div>
                    </div>

                    {/* --- Git Text --- */}
                    <div className="mt-5 mb-0 flex items-center justify-center gap-2">
                        <span className="text-lg text-gray-400">i obviously use</span>
                        <TechnologyItem tech={GitTech} />
                        <span className="text-lg text-gray-400">with alll my projects (duh)</span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default About;