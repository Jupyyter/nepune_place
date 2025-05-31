"use client";
// pages/about.tsx
import Image from 'next/image';
import Head from 'next/head';
// UPDATED: Added FaJava
import { FaReact, FaHtml5, FaCss3Alt, FaUnity, FaGitAlt, FaPython, FaJava } from 'react-icons/fa';
import { SiCplusplus, SiJavascript, SiTypescript, SiSfml, SiNextdotjs, SiGodotengine, SiTailwindcss } from 'react-icons/si';
import React, { useRef, useLayoutEffect, useEffect, useCallback } from 'react'; // Import React and hooks

// --- Color Definitions ---
const preferenceColors = {
    darkGreen:  { bg: 'bg-green-700',  text: 'text-white', tooltip: 'Specialized & Preferred' },
    lightGreen: { bg: 'bg-lime-500',   text: 'text-black', tooltip: 'Highly Preferred' },
    lightBlue:  { bg: 'bg-sky-400',    text: 'text-black', tooltip: 'Generally Liked' },
    white:      { bg: 'bg-gray-200',   text: 'text-black', tooltip: 'Neutral / Competent' },
    yellow:     { bg: 'bg-yellow-400', text: 'text-black', tooltip: 'Use when needed' },
    orange:     { bg: 'bg-orange-500', text: 'text-black', tooltip: 'Used, but with reservations' },
    red:        { bg: 'bg-red-600',    text: 'text-white', tooltip: 'Disliked / Avoid if possible' },
    gray:       { bg: 'bg-gray-600',   text: 'text-white', tooltip: 'Version Control'}
};

// --- Types ---
interface Technology {
    icon: React.ReactNode | null;
    name: string;
    comment: string;
    preference: keyof typeof preferenceColors;
    isTitle?: boolean;
}

interface Category {
    title: string;
    titleComment: string;
    titlePreference: keyof typeof preferenceColors;
    technologies: Technology[];
}

// --- Constants ---
const BORDER_CLASS = "border-gray-400";
const BORDER_THICKNESS_CLASS = "border-2";
const BASE_PADDING = "p-6";
const EXTRA_PADDING_CLASS_VERTICAL = "py-12";
const EXTRA_PADDING_CLASS_HORIZONTAL = "px-12";


// --- Reusable Components ---

// Tooltip Component
// --- Reusable Components ---

// Tooltip Component
const Tooltip = ({ text, parentRef }: { text: string, parentRef: React.RefObject<HTMLElement> }) => {
    const tooltipRef = useRef<HTMLDivElement>(null);
    const isMountedRef = useRef(false); // To help avoid state updates on unmounted component

    useEffect(() => {
        isMountedRef.current = true;
        console.log(`[${text}] Tooltip MOUNTED`);
        return () => {
            isMountedRef.current = false;
            console.log(`[${text}] Tooltip UNMOUNTED`);
        };
    }, [text]);


    const adjustPosition = useCallback(() => {
        if (!tooltipRef.current || !parentRef.current || !isMountedRef.current) {
            console.warn(`[${text}] AdjustPosition: Refs or mount status not ready.`, {
                tooltipRef: !!tooltipRef.current,
                parentRef: !!parentRef.current,
                isMounted: isMountedRef.current
            });
            return;
        }

        const tooltipEl = tooltipRef.current;
        const parentEl = parentRef.current;

        console.log(`[${text}] --- AdjustPosition START ---`);

        // Reset styles to allow natural measurement based on Tailwind classes
        tooltipEl.style.left = '';
        tooltipEl.style.transform = '';
        // Temporarily ensure it's laid out for measurement, even if opacity is 0
        // We're relying on opacity for visibility, so display should be as per normal flow
        const originalDisplay = tooltipEl.style.display;
        tooltipEl.style.display = 'block'; // Ensure it's considered for layout
        tooltipEl.style.visibility = 'hidden'; // Keep it hidden during measurement

        // Force browser to recalculate layout - reading offsetWidth can help
        const preMeasureOffsetWidth = tooltipEl.offsetWidth;
        console.log(`[${text}] Pre-measure offsetWidth: ${preMeasureOffsetWidth}`);

        const tooltipRect = tooltipEl.getBoundingClientRect();
        const parentRect = parentEl.getBoundingClientRect();

        // Restore original display style if we changed it, and make visible if it was hidden by JS
        tooltipEl.style.display = originalDisplay;
        tooltipEl.style.visibility = '';


        console.log(`[${text}] TooltipRect:`, { width: tooltipRect.width, height: tooltipRect.height, left: tooltipRect.left, right: tooltipRect.right });
        console.log(`[${text}] ParentRect:`, { width: parentRect.width, height: parentRect.height, left: parentRect.left, right: parentRect.right });
        console.log(`[${text}] Window.innerWidth:`, window.innerWidth);

        if (tooltipRect.width === 0 && preMeasureOffsetWidth === 0) {
            console.warn(`[${text}] Tooltip width is 0 (both getBoundingClientRect and offsetWidth). Cannot adjust accurately. Content: "${text}"`);
            // If width is 0, it's pointless to proceed with adjustment based on it.
            // Set to default centered position as a fallback.
            tooltipEl.style.left = '50%';
            tooltipEl.style.transform = 'translateX(-50%)';
            console.log(`[${text}] --- AdjustPosition END (width 0, fallback to center) ---`);
            return;
        }
        // Use offsetWidth if getBoundingClientRect().width is 0 but offsetWidth isn't
        const effectiveTooltipWidth = tooltipRect.width > 0 ? tooltipRect.width : preMeasureOffsetWidth;
        if (tooltipRect.width === 0 && preMeasureOffsetWidth > 0) {
            console.log(`[${text}] Using offsetWidth (${preMeasureOffsetWidth}) as tooltipRect.width was 0.`);
        }


        const spaceFromEdge = 10; // Increased slightly
        let newLeftStyle = '50%';
        let newTransformStyle = 'translateX(-50%)';

        const parentViewportCenterX = parentRect.left + parentRect.width / 2;
        const tooltipHalfWidth = effectiveTooltipWidth / 2;

        console.log(`[${text}] effectiveTooltipWidth: ${effectiveTooltipWidth}, parentViewportCenterX: ${parentViewportCenterX}, tooltipHalfWidth: ${tooltipHalfWidth}`);

        // Check left overflow
        if (parentViewportCenterX - tooltipHalfWidth < spaceFromEdge) {
            newLeftStyle = `${spaceFromEdge - parentRect.left}px`;
            newTransformStyle = 'translateX(0%)';
            console.log(`[${text}] Overflow LEFT. New style: left=${newLeftStyle}, transform=${newTransformStyle}`);
        }
        // Check right overflow
        else if (parentViewportCenterX + tooltipHalfWidth > window.innerWidth - spaceFromEdge) {
            newLeftStyle = `${(window.innerWidth - spaceFromEdge - effectiveTooltipWidth) - parentRect.left}px`;
            newTransformStyle = 'translateX(0%)';
            console.log(`[${text}] Overflow RIGHT. New style: left=${newLeftStyle}, transform=${newTransformStyle}`);
        } else {
            console.log(`[${text}] No overflow. Using default centering.`);
        }

        tooltipEl.style.left = newLeftStyle;
        tooltipEl.style.transform = newTransformStyle;

        console.log(`[${text}] Applied styles: left=${tooltipEl.style.left}, transform=${tooltipEl.style.transform}`);
        console.log(`[${text}] --- AdjustPosition END ---`);

    }, [parentRef, text]); // Include `text` if used in logs or logic directly

    useLayoutEffect(() => {
        if (parentRef.current) {
            const parentElement = parentRef.current;
            const handleMouseEnter = () => {
                if (!isMountedRef.current) return;
                console.log(`[${text}] MouseEnter on parent. Will call adjustPosition via rAF.`);
                requestAnimationFrame(() => {
                    // Double check mount status due to async nature of rAF
                    if (isMountedRef.current && tooltipRef.current && parentRef.current) {
                         console.log(`[${text}] rAF callback: Calling adjustPosition.`);
                        adjustPosition();
                    } else {
                        console.log(`[${text}] rAF callback: Component unmounted or refs lost before adjustPosition could be called.`);
                    }
                });
            };
            parentElement.addEventListener('mouseenter', handleMouseEnter);
            console.log(`[${text}] Added mouseenter listener to parent.`);
            return () => {
                parentElement.removeEventListener('mouseenter', handleMouseEnter);
                console.log(`[${text}] Removed mouseenter listener from parent.`);
            };
        } else {
            console.warn(`[${text}] ParentRef not current in useLayoutEffect for mouseenter.`);
        }
    }, [parentRef, adjustPosition, text]); // Add text if used in logs

    useEffect(() => {
        const handleResize = () => {
            if (!isMountedRef.current) return;
            console.log(`[${text}] Window resize detected.`);
            if (tooltipRef.current && getComputedStyle(tooltipRef.current).opacity === '1') {
                console.log(`[${text}] Tooltip visible, calling adjustPosition on resize.`);
                adjustPosition();
            } else {
                console.log(`[${text}] Tooltip not visible on resize, not adjusting.`);
            }
        };
        window.addEventListener('resize', handleResize);
        console.log(`[${text}] Added resize listener.`);
        return () => {
            window.removeEventListener('resize', handleResize);
            console.log(`[${text}] Removed resize listener.`);
        };
    }, [adjustPosition, text]); // Add text if used in logs

    return (
        <div
            ref={tooltipRef}
            className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs
                        bg-purple-700 text-white text-xs sm:text-sm p-2 rounded z-30 shadow-lg
                        whitespace-normal text-center
                        opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto
                        transition-opacity duration-150`}
        >
            {text}
        </div>
    );
};


// Technology Item Component
const TechnologyItem = ({ tech, isOval = false }: { tech: Technology, isOval?: boolean }) => {
    const itemRef = useRef<HTMLDivElement>(null); // Ref for the parent div of the tooltip
    const colorInfo = preferenceColors[tech.preference];
    const bgColor = colorInfo ? colorInfo.bg : 'bg-gray-500';
    const textColor = ['lightGreen', 'lightBlue', 'white', 'yellow', 'orange'].includes(tech.preference) ? 'text-black' : 'text-white';
    const itemClasses = isOval
        ? `rounded-full p-2 flex flex-col justify-center items-center w-16 h-16`
        : 'rounded-lg p-2 shadow-md w-auto h-auto';
    const iconSize = isOval ? 'text-2xl' : 'text-3xl sm:text-4xl';
    const textSize = isOval ? 'text-xs' : 'text-xs sm:text-sm';

    return (
        <div ref={itemRef} className={`group relative flex flex-col items-center m-1 sm:m-2 transition-colors duration-200 ${bgColor} ${itemClasses}`}>
            <Tooltip text={tech.comment} parentRef={itemRef} />
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
    const titleRef = useRef<HTMLDivElement>(null); // Ref for the parent div of the tooltip
    const colorInfo = preferenceColors[preference];
    const bgColor = colorInfo ? colorInfo.bg : 'bg-gray-500';
    const textColor = ['lightGreen', 'lightBlue', 'white', 'yellow', 'orange'].includes(preference) ? 'text-black' : 'text-white';

    return (
        <div ref={titleRef} className="group relative inline-block mb-4">
            <div className={`rounded-lg p-2 shadow-md ${bgColor} cursor-default`}>
                <h3 className={`text-2xl font-medium text-center capitalize ${textColor}`}>{title}</h3>
            </div>
            <Tooltip text={comment} parentRef={titleRef} />
        </div>
    );
};


// Legend Color Square Component
const LegendColor = ({ colorKey }: { colorKey: keyof typeof preferenceColors }) => {
    const colorInfo = preferenceColors[colorKey];
    if (!colorInfo) return null;
    // For LegendColor, we'll use the original simple tooltip if needed, or assume it doesn't need edge detection
    // as it's small and centrally located. If it does, it would need similar ref passing.
    // For simplicity, keeping its original tooltip structure:
    const SimpleTooltip = ({ text }: { text: string }) => (
        <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs hidden group-hover:block bg-purple-700 text-white text-xs sm:text-sm p-2 rounded z-30 shadow-lg pointer-events-none whitespace-normal text-center`}>
            {text}
        </div>
    );
    return (
        <div className={`group relative w-5 h-5 sm:w-6 sm:h-6 m-0.5 cursor-default ${colorInfo.bg} border border-gray-700 flex-shrink-0`}>
            <SimpleTooltip text={colorInfo.tooltip} />
        </div>
    );
}

// --- Main About Page Component ---
const About = () => {
    // --- Data Definitions ---
    const aboutTexts = [
        '- im about 20 years old (more or less im too lazy to update that 7777)',
        '- my current location is Bucharest (the capital city of Romania, a country in Europe)',
    ];

    const CppTech: Technology = {
        icon: <SiCplusplus />, name: 'C/C++',
        comment: 'my favoryte programing language. can do anything with it. the program not efficient? skill issue',
        preference: 'darkGreen'
    };
    const GitTech: Technology = {
        icon: <FaGitAlt />, name: 'Git',
        comment: 'i like typing commands instead of using an ui for managing my projects with github',
        preference: 'darkGreen'
    };

    let categorizedTechnologies: Category[] = [
         {
            title: "Sites",
            titleComment: "this is the only site i have ever coded :) (i dont really like web developement)",
            titlePreference: 'yellow',
            technologies: [
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

                                let paddingClasses = BASE_PADDING;

                                if (isGamesCategory) {
                                    paddingClasses += ` pb-16 lg:pb-6 lg:pr-16`;
                                } else if (isOtherAppsCategory) {
                                    paddingClasses += ` pt-16 lg:pt-6 lg:pl-16`;
                                }

                                return (
                                    <div
                                        key={category.title}
                                        className={`flex-1 relative ${
                                            catIndex > 0 ? `lg:border-l ${BORDER_CLASS} ${BORDER_THICKNESS_CLASS}` : ''
                                        } ${
                                            !isLastCategory ? `border-b lg:border-b-0 ${BORDER_CLASS} ${BORDER_THICKNESS_CLASS}` : ''
                                        }`}
                                    >
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

                                        {isOtherAppsCategory && (
                                            <div className={`absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 lg:hidden z-10 border ${BORDER_CLASS} ${BORDER_THICKNESS_CLASS} rounded-full bg-black p-0.5`}>
                                                <TechnologyItem tech={CppTech} isOval={true} />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
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