"use client";
// pages/about.tsx
import Image from "next/image";
import Head from "next/head";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaUnity,
  FaGitAlt,
  FaPython,
  FaJava,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiSfml,
  SiNextdotjs,
  SiGodotengine,
  SiTailwindcss,
} from "react-icons/si";
import React, { useRef, useEffect, useCallback, useState } from "react";

// --- Color Definitions ---
const preferenceColors = {
  darkGreen: {
    bg: "bg-green-700",
    text: "text-white",
    tooltip: "Specialized & Preferred",
  },
  lightGreen: {
    bg: "bg-lime-500",
    text: "text-black",
    tooltip: "Highly Preferred",
  },
  lightBlue: {
    bg: "bg-sky-400",
    text: "text-black",
    tooltip: "Generally Liked",
  },
  white: {
    bg: "bg-gray-200",
    text: "text-black",
    tooltip: "Neutral / Competent",
  },
  yellow: {
    bg: "bg-yellow-400",
    text: "text-black",
    tooltip: "Use when needed",
  },
  orange: {
    bg: "bg-orange-500",
    text: "text-black",
    tooltip: "Used, but with reservations",
  },
  red: {
    bg: "bg-red-600",
    text: "text-white",
    tooltip: "Disliked / Avoid if possible",
  },
  gray: { bg: "bg-gray-600", text: "text-white", tooltip: "Version Control" },
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
const BORDER_THICKNESS_CLASS = "0px";
const BASE_PADDING = "p-6";

// --- Reusable Components ---

const Tooltip = ({
  text,
  parentRef,
  isParentHovered,
}: {
  text: string;
  parentRef: React.RefObject<HTMLElement>;
  isParentHovered: boolean;
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const adjustPosition = useCallback(() => {
    if (!isMountedRef.current || !tooltipRef.current || !parentRef.current) {
      return;
    }

    const tooltipEl = tooltipRef.current;
    const parentEl = parentRef.current;

    tooltipEl.style.left = "";
    tooltipEl.style.transform = "";
    const originalDisplay = tooltipEl.style.display;
    const originalVisibility = tooltipEl.style.visibility;
    tooltipEl.style.display = "block";
    tooltipEl.style.visibility = "hidden";

    const preMeasureOffsetWidth = tooltipEl.offsetWidth;
    const tooltipRect = tooltipEl.getBoundingClientRect(); // This might be 0 if visibility is hidden and not fully rendered
    const parentRect = parentEl.getBoundingClientRect();

    tooltipEl.style.display = originalDisplay;
    tooltipEl.style.visibility = originalVisibility;

    if (tooltipRect.width === 0 && preMeasureOffsetWidth === 0) {
      // Fallback if width cannot be determined
      tooltipEl.style.left = "50%";
      tooltipEl.style.transform = "translateX(-50%)";
      return;
    }

    const effectiveTooltipWidth =
      tooltipRect.width > 0 ? tooltipRect.width : preMeasureOffsetWidth;

    const spaceFromEdge = 10;
    let newLeftStyle = "50%";
    let newTransformStyle = "translateX(-50%)";
    const parentViewportCenterX = parentRect.left + parentRect.width / 2;
    const tooltipHalfWidth = effectiveTooltipWidth / 2;

    if (parentViewportCenterX - tooltipHalfWidth < spaceFromEdge) {
      // Tooltip goes off left edge
      newLeftStyle = `${spaceFromEdge - parentRect.left}px`;
      newTransformStyle = "translateX(0%)";
    } else if (
      parentViewportCenterX + tooltipHalfWidth >
      window.innerWidth - spaceFromEdge
    ) {
      // Tooltip goes off right edge
      newLeftStyle = `${
        window.innerWidth -
        spaceFromEdge -
        effectiveTooltipWidth -
        parentRect.left
      }px`;
      newTransformStyle = "translateX(0%)";
    }

    tooltipEl.style.left = newLeftStyle;
    tooltipEl.style.transform = newTransformStyle;
  }, [parentRef]);

  useEffect(() => {
    if (isParentHovered) {
      // Double requestAnimationFrame to ensure styles are applied and measured correctly after DOM updates
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (isMountedRef.current && tooltipRef.current && parentRef.current) {
            adjustPosition();
          }
        });
      });
    }
  }, [isParentHovered, adjustPosition, parentRef]);

  useEffect(() => {
    const handleResize = () => {
      if (
        isMountedRef.current &&
        isParentHovered &&
        tooltipRef.current &&
        getComputedStyle(tooltipRef.current).opacity === "1"
      ) {
        adjustPosition();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isParentHovered, adjustPosition]);

  return (
    <div
      ref={tooltipRef}
      className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs
                        bg-purple-700 text-white text-xs sm:text-sm p-2 rounded z-30 shadow-lg
                        whitespace-normal text-center
                        ${
                          isParentHovered
                            ? "opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none"
                        }
                        transition-opacity duration-150`}
    >
      {text}
    </div>
  );
};

const TechnologyItem = ({
  tech,
  isOval = false,
}: {
  tech: Technology;
  isOval?: boolean;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const colorInfo = preferenceColors[tech.preference];
  const bgColor = colorInfo ? colorInfo.bg : "bg-gray-500";
  const textColor = [
    "lightGreen",
    "lightBlue",
    "white",
    "yellow",
    "orange",
  ].includes(tech.preference)
    ? "text-black"
    : "text-white";
  const itemClasses = isOval
    ? `rounded-full p-2 flex flex-col justify-center items-center w-16 h-16` // Fixed size for oval
    : "rounded-lg p-2 shadow-md w-auto h-auto"; // Auto size for regular items
  const iconSize = isOval ? "text-2xl" : "text-3xl sm:text-4xl"; // Icon size
  const textSize = isOval ? "text-xs" : "text-xs sm:text-sm"; // Text size beneath icon

  return (
    <div
      ref={itemRef}
      className={`relative flex flex-col items-center m-1 sm:m-2 transition-colors duration-200 ${bgColor} ${itemClasses}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Tooltip
        text={tech.comment}
        parentRef={itemRef}
        isParentHovered={isHovered}
      />
      {tech.icon && (
        // Container for the icon itself
        <div
          className={`flex items-center justify-center ${
            isOval ? "h-6 w-6 mb-0.5" : "h-8 w-8 sm:h-10 sm:w-10 mb-1"
          } ${preferenceColors[tech.preference]?.text || "text-white"}`}
        >
          {React.isValidElement(tech.icon) && typeof tech.icon !== "string" ? (
            // If icon is a React element (like Next/Image or react-icons component)
            React.cloneElement(tech.icon as React.ReactElement<any>, {
              className: `${iconSize} ${
                preferenceColors[tech.preference]?.text || "text-white"
              } ${tech.icon.props.className || ""}`,
            })
          ) : (
            // If icon is a simple string (like '#')
            <span className={iconSize}>{tech.icon}</span>
          )}
        </div>
      )}
      <p className={`text-center font-medium ${textColor} ${textSize}`}>
        {tech.name}
      </p>
    </div>
  );
};

const CategoryTitleItem = ({
  title,
  comment,
  preference,
}: {
  title: string;
  comment: string;
  preference: keyof typeof preferenceColors;
}) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const colorInfo = preferenceColors[preference];
  const bgColor = colorInfo ? colorInfo.bg : "bg-gray-500";
  const textColor = [
    "lightGreen",
    "lightBlue",
    "white",
    "yellow",
    "orange",
  ].includes(preference)
    ? "text-black"
    : "text-white";

  return (
    <div
      ref={titleRef}
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`rounded-lg p-2 shadow-md ${bgColor} cursor-default`}>
        <h3
          className={`text-2xl font-medium text-center capitalize ${textColor}`}
        >
          {title}
        </h3>
      </div>
      <Tooltip
        text={comment}
        parentRef={titleRef}
        isParentHovered={isHovered}
      />
    </div>
  );
};

const LegendColor = ({
  colorKey,
}: {
  colorKey: keyof typeof preferenceColors;
}) => {
  const colorInfo = preferenceColors[colorKey];
  if (!colorInfo) return null;
  const SimpleTooltip = ({ text }: { text: string }) => (
    <div
      className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs hidden group-hover:block bg-purple-700 text-white text-xs sm:text-sm p-2 rounded z-30 shadow-lg pointer-events-none whitespace-normal text-center`}
    >
      {text}
    </div>
  );
  return (
    <div
      className={`group relative w-5 h-5 sm:w-6 sm:h-6 m-0.5 cursor-default ${colorInfo.bg} border border-gray-700 flex-shrink-0`}
    >
      <SimpleTooltip text={colorInfo.tooltip} />
    </div>
  );
};

const About = () => {
  const aboutTexts = [
    "- I'm 20 years old and ",
    "- My current location is Bucharest.",
  ];

  const CppTech: Technology = {
    icon: <SiCplusplus />,
    name: "C/C++",
    comment: "My favoryte programing language.",
    preference: "darkGreen",
  };
  const GitTech: Technology = {
    icon: <FaGitAlt />,
    name: "Git",
    comment:
      "I like typing commands instead of using an ui for managing my projects with github.",
    preference: "darkGreen",
  };

  let categorizedTechnologies: Category[] = [
    {
      title: "Sites",
      titleComment:
        "This is the only site I have ever coded (I don't really like web developement).",
      titlePreference: "yellow",
      technologies: [
        {
          icon: <SiNextdotjs />,
          name: "Next.js",
          comment:
            "Used it to make this site. It's great for making websites with React.",
          preference: "darkGreen",
        },
        {
          icon: <FaReact />,
          name: "React",
          comment:
            "I used NextJS which uses react for this site, so I prefer it over the other site-making-software.",
          preference: "lightGreen",
        },
        {
          icon: <SiTailwindcss />,
          name: "Tailwind",
          comment: "Great utility-first CSS framework. Used for this site.",
          preference: "lightBlue",
        },
        {
          icon: <FaCss3Alt />,
          name: "CSS",
          comment: "Can't do sites without it.",
          preference: "white",
        },
        {
          icon: <FaHtml5 />,
          name: "HTML",
          comment: "Can't do sites without it.",
          preference: "white",
        },
        {
          icon: <SiTypescript />,
          name: "TypeScript",
          comment: "JavaScript but better. I used it to make this site.",
          preference: "white",
        },
        {
          icon: <SiJavascript />,
          name: "JavaScript",
          comment: "TypeScript but worse. I'd avoid it whenever possible.",
          preference: "orange",
        },
      ],
    },
    {
      title: "Games",
      titleComment: "I like games. I wanna make games.",
      titlePreference: "darkGreen",
      technologies: [
        {
          icon: (
            <Image
              src="/imgs/godot.png"
              alt="Godot"
              width={32}
              height={32}
              className="rounded"
              priority={true}
            />
          ),
          name: "Godot",
          comment:
            "Great engine. I like it more than unity because it's more lightweight and it's open source (hooray).",
          preference: "darkGreen",
        },
        {
          icon: <SiSfml />,
          name: "SFML",
          comment:
            "Practical graphics library when you want to make things appear on the screen. I choose it over SDL2 altho thats just because it's more simple.",
          preference: "lightGreen",
        },
        {
          icon: <FaUnity />,
          name: "Unity",
          comment:
            "Too much UI for me, but it's really powerfull (can do a lot of things with it). Besides, it's not open source.",
          preference: "lightBlue",
        },
        {
          icon: <span className="font-mono font-bold">#</span>,
          name: "C#",
          comment:
            "The primary language for Unity. It's decent, but I prefer C++.",
          preference: "lightBlue",
        },
        {
          icon: (
            <Image
              src="/imgs/gdscript.jpg"
              alt="GDScript"
              width={32}
              height={32}
              className="rounded"
              priority={true}
            />
          ),
          name: "GDScript",
          comment:
            "The language used in godot. It's like python but for godot compatibility.",
          preference: "lightBlue",
        },
        {
          icon: (
            <Image
              src="/imgs/sdl.svg"
              alt="SDL2"
              width={32}
              height={32}
              className="rounded filter invert"
              priority={true}
            />
          ),
          name: "SDL2",
          comment:
            "It's ok. I had a good experience with SDL2, but I would only use it over SFML when developing Android or iOS apps. I don't really know why, but I think I simply dont like how the code looks.",
          preference: "lightBlue",
        },
        {
          icon: <FaJava />,
          name: "Java",
          comment:
            "I learned the basics by making checkers and some other game in greenfoot. I don't like the syntax.",
          preference: "yellow",
        },
        {
          icon: (
            <Image
              src="/imgs/Greenfoot_Logo.jpg"
              alt="Greenfoot Logo"
              width={32}
              height={32}
              className="rounded"
              priority={true}
            />
          ),
          name: "Greenfoot",
          comment:
            "Don't like it. The sound system simply doesn't work properly for some reason. I don't recommend using this game engine.",
          preference: "red",
        },
      ],
    },
    {
      title: "Other Windows Apps",
      titleComment: "I use windows (fear of change).",
      titlePreference: "lightBlue",
      technologies: [
        {
          icon: <FaPython />,
          name: "Python",
          comment: "The best choice for any non-performance oriented project.",
          preference: "lightGreen",
        },
      ],
    },
  ];

  const preferenceOrder: (keyof typeof preferenceColors)[] = [
    "darkGreen",
    "lightGreen",
    "lightBlue",
    "white",
    "yellow",
    "orange",
    "red",
    "gray",
  ];
  const preferenceOrderMap = preferenceOrder.reduce((acc, key, index) => {
    acc[key] = index;
    return acc;
  }, {} as Record<keyof typeof preferenceColors, number>);

  categorizedTechnologies.forEach((category) => {
    category.technologies.sort((a, b) => {
      const orderA = preferenceOrderMap[a.preference] ?? 99;
      const orderB = preferenceOrderMap[b.preference] ?? 99;
      return orderA - orderB;
    });
  });

  return (
    <div className="flex flex-col items-center justify-start pt-6 text-gray-200 w-full">
      <Head>
        <title>About Me</title>
        {}
        <link
          rel="preload"
          href="/imgs/godot.png"
          as="image"
          type="image/png"
        />
        <link
          rel="preload"
          href="/imgs/gdscript.jpg"
          as="image"
          type="image/jpeg"
        />
        <link
          rel="preload"
          href="/imgs/Greenfoot_Logo.jpg"
          as="image"
          type="image/jpeg"
        />
        <link
          rel="preload"
          href="/imgs/sdl.svg"
          as="image"
          type="image/svg+xml"
        />
      </Head>

      <main className="p-4 w-full flex flex-col items-center">
        <div className="w-full flex justify-center mb-10">
          <div className="w-max">
            <h1 className="text-4xl font-bold mb-6 text-center text-white">
              Information about me:
            </h1>
            {
              <p className="text-xl text-gray-300 py-1">
                {aboutTexts[0]}
                <span className="bg-green-500 text-black px-2 py-1 rounded">
                  I usually program games.
                </span>
                <p className="text-xl text-gray-300 py-1">{aboutTexts[1]}</p>
              </p>
            }
          </div>
        </div>

        <div className="w-full flex flex-col items-center">
          <div className="w-full flex flex-col items-center gap-y-4 mb-5 px-4 relative">
            <div className="flex flex-col items-center max-w-xs sm:max-w-xl">
              <div className="text-center mb-1">
                <p className="text-base sm:text-lg font-medium text-gray-200">
                  What I specialize in and what I prefer{" "}
                  <u className="decoration-purple-400 decoration-2">
                    based on colors:
                  </u>
                </p>
              </div>
              <div className="flex flex-wrap justify-center">
                {Object.keys(preferenceColors)
                  // Filter out 'gray' unless GitTech or CppTech specifically use it.
                  .filter(
                    (key) =>
                      key !== "gray" ||
                      [GitTech.preference, CppTech.preference].includes(
                        key as any
                      )
                  )
                  .map((key) => (
                    <LegendColor
                      key={key}
                      colorKey={key as keyof typeof preferenceColors}
                    />
                  ))}
              </div>
            </div>
            <h2 className="text-3xl font-semibold text-center text-white">
              Software I use for developing
            </h2>
          </div>

          <div className="">
            <div
              className={`flex border-b ${BORDER_CLASS} ${BORDER_THICKNESS_CLASS}`}
            >
              {categorizedTechnologies.map((category, catIndex) => (
                <div
                  key={`${category.title}-title-cell`}
                  className={`flex-1 ${BASE_PADDING} flex flex-col items-center justify-center
                                                ${
                                                  catIndex > 0
                                                    ? `border-l ${BORDER_CLASS} ${BORDER_THICKNESS_CLASS}`
                                                    : ""
                                                }`}
                >
                  <CategoryTitleItem
                    title={category.title}
                    comment={category.titleComment}
                    preference={category.titlePreference}
                  />
                </div>
              ))}
            </div>

            <div className="flex">
              {categorizedTechnologies.map((category, catIndex) => {
                const isThirdColumn = catIndex === 2; // "Other Windows Apps"
                const isSecondColumn = catIndex === 1; // "Games"
                const shouldRenderCppIconHere = isThirdColumn;

                return (
                  <div
                    key={`${category.title}-content-cell`}
                    className={`flex-1 ${BASE_PADDING} relative
                                                    ${
                                                      catIndex > 0
                                                        ? `border-l ${BORDER_CLASS} ${BORDER_THICKNESS_CLASS}`
                                                        : ""
                                                    }`}
                  >
                    <div className="flex flex-wrap justify-center items-start gap-1 sm:gap-2 min-h-[50px] w-full">
                      {category.technologies.map((tech) => (
                        <TechnologyItem key={tech.name} tech={tech} />
                      ))}
                    </div>

                    {shouldRenderCppIconHere && (
                      <div
                        className={`absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 z-10 
                                                            border ${BORDER_CLASS} ${BORDER_THICKNESS_CLASS} rounded-full bg-black p-0.5`}
                      >
                        {/* CppTech is already in "Other Windows Apps" list*/}
                        <TechnologyItem tech={CppTech} isOval={true} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 mb-0 flex items-center justify-center gap-2">
            <span className="text-lg text-gray-400">I use</span>
            <TechnologyItem tech={GitTech} />
            <span className="text-lg text-gray-400">
              with alll my projects.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
