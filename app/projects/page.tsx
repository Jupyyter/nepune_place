"use client";
import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { combineAndDownload, downloadSingleFile } from "./fileUtils";

// Define the structure of a tag
interface Tag {
  name: string;
  description: string;
  color: string;
}

// Define the TAGS object with proper typing
const TAGS: { [key: string]: Tag } = {
  UNITY: {
    name: "Unity",
    description: "created using Unity engine",
    color: "bg-green-500",
  },
  GODOT: {
    name: "Godot",
    description: "created using Godot engine",
    color: "bg-blue-700",
  },
  GREENFOOT: {
    name: "Greenfoot",
    description:
      "created using greenfoot 'engine'. since this thing will not let me export any jar or exe file, the only way for you to play this, is directly in greenfoot, so you should download that too if you wanna run this (its disrespectful for the other engines to call this a real game engine)",
    color: "bg-cyan-500",
  },
  SDL2: {
    name: "SDL2",
    description: "created  using the SDL2 graphics library",
    color: "bg-yellow-500",
  },
  SFML: {
    name: "SFML",
    description: "created  using the SFML graphics library",
    color: "bg-purple-700",
  },
  LARGE_FILE: {
    name: "100MB+",
    description:
      "the size of the file is greater than 100 MB so github forced my hand to separate it into multiple files and combine them into 1 so i can continue abusing their servers. even after it downloaded, wait until the button on which you pressed to download it stops showing 'processing'",
    color: "bg-red-500",
  },
  CPP: {
    name: "C++",
    description: "developed using C++",
    color: "bg-blue-900",
  },
  "C#": {
    name: "C#",
    description: "developed using C#",
    color: "bg-purple-900",
  },
  GDSCRIPT: {
    name: "Gdscript",
    description: "developed using Gdscript",
    color: "bg-green-900",
  },
  JAVA: {
    name: "Java",
    description: "developed using Java",
    color: "bg-yellow-900",
  },
  JAVASCRIPT: {
    name: "JavaScript",
    description: "developed using JavaScript",
    color: "bg-yellow-300",
  },
  REACT: {
    name: "React",
    description: "Built with React framework (or library or whatever this is)",
    color: "bg-cyan-500",
  },
  JAR: {
    name: "Jar",
    description:
      "there will be a jar instead of an executable. clicking on a jar file while in the zip file will only show you the source code, which is ok, but if you want to run the app without compiling it, you should extract it from the zip file",
    color: "bg-cyan-500",
  },
};
interface Project {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  downloadUrls: string[];
  tags: (keyof typeof TAGS)[];
}
const projects: Project[] = [
  {
    id: 0,
    title: "jhonny",
    thumbnail: "/imgs/jhonny.png",
    description:
      "you play as jhonny and you shoot gangsters. i made possible for a multiplayer game, but since i dont have servers for this, you will have to use hamachi if you dont play multiplayer locally. i also dont recomand shooting until all the players are connected :)",
    downloadUrls: ["jhonnyGang.zip"],
    tags: ["UNITY", "C#"],
  },
  {
    id: 1,
    title: "video in ascii",
    thumbnail: "/imgs/badApple.png",
    description:
      "this thing plays any video in ascii, but the default video is bad apple",
    downloadUrls: ["asciiVideo.zip", "badApple.zip"],
    tags: ["CPP", "LARGE_FILE"],
  },
  {
    id: 2,
    title: "gabriel the hungry",
    thumbnail: "/imgs/GabrielIsHungry.png",
    description: "this is the story of gabriel",
    downloadUrls: [`gabrielIsHungry.zip`, "gabrielIsHungry0.zip"],
    tags: ["GODOT", "GDSCRIPT", "LARGE_FILE"],
  },
  {
    id: 3,
    title: "fight Jhon Cena",
    thumbnail: "/imgs/bingChilling.png",
    description:
      "i like undertale. because of that, i made a game in which you fight john cena in an undertale-style fight",
    downloadUrls: [`bingChilling.zip`],
    tags: ["UNITY", "C#"],
  },
  {
    id: 4,
    title: "shadow wizzard money gang",
    thumbnail: "/imgs/shadowGang.png",
    description:
      "i made this with a classmate (code: 95% me, art: 1% me ) for a contest. unfortunately the contest required the usage of 'greenfoot'",
    downloadUrls: [`shadowGang.zip`],
    tags: ["GREENFOOT", "JAVA"],
  },
  {
    id: 5,
    title: "the 3 room adventure",
    thumbnail: "/imgs/cppGame.png",
    description:
      "a simple project made in c++ using sdl2 instead of a game engine",
    downloadUrls: [`cppGame2.zip`, "cppGame3.zip"],
    tags: ["CPP", "SDL2", "LARGE_FILE"],
  },
  {
    id: 6,
    title: "checkers",
    thumbnail: "/imgs/checkers.png",
    description: "checkers",
    downloadUrls: [`worldOfTanks.jar`],
    tags: ["JAVA", "JAR"],
  },
  {
    id: 7,
    title: "ikeaBattle",
    thumbnail: "/imgs/ikeaMan.jpg",
    description: "you fight ikeaMan. i recomand you extract the files from the zip file if you wanna use the leveleditor properly",
    downloadUrls: ["ikeaBattle0.zip","ikeaBattle1.zip"],
    tags: ["CPP", "SFML"],
  },
];

interface Project {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  downloadUrls: string[];
  tags: (keyof typeof TAGS)[];
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredTag, setHoveredTag] = useState<keyof typeof TAGS | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, alignTop: false });
  const [isMobile, setIsMobile] = useState(false);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const detailsPanelRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const navbarHeight = 64;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    const handleResize = () => {
      checkMobile();
      if (projectsContainerRef.current) {
        const containerWidth = projectsContainerRef.current.offsetWidth;
        const columns = Math.max(1, Math.floor(containerWidth / 300));
        projectsContainerRef.current.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const detailsPanel = detailsPanelRef.current;
    if (!detailsPanel) return;

    const handleWheel = (e: WheelEvent) => {
      const { deltaY, currentTarget } = e;
      const panel = currentTarget as HTMLDivElement;

      if (panel.scrollHeight > panel.clientHeight) {
        e.preventDefault();
        panel.scrollTop += deltaY;
      }
    };

    detailsPanel.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      detailsPanel.removeEventListener("wheel", handleWheel);
    };
  }, [selectedProject]);

  const handleProjectClick = (project: Project) => {
    if (project.id !== selectedProject?.id) {
      setSelectedProject(project);
    }
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  const handleDownload = (project: Project) => {
    setIsLoading(true);
    if (project.downloadUrls.length === 1) {
      const fileName = project.downloadUrls[0].split("/").pop() || `${project.title}.zip`;
      downloadSingleFile(project.downloadUrls[0], fileName, setIsLoading);
    } else {
      combineAndDownload(project, setIsLoading);
    }
  };

  const handleTagHover = (tagKey: keyof typeof TAGS, event: React.MouseEvent<HTMLDivElement>) => {
    setHoveredTag(tagKey);
    const tagRect = event.currentTarget.getBoundingClientRect();
    const tooltipWidth = 160;
    const tooltipHeight = 80;
    const windowHeight = window.innerHeight;

    let x = tagRect.left;
    let y = tagRect.bottom;
    let alignTop = false;

    if (tagRect.top > windowHeight - tagRect.bottom) {
      y = tagRect.top;
      alignTop = true;
    }

    if (x + tooltipWidth > window.innerWidth) {
      x = window.innerWidth - tooltipWidth;
    }

    setTooltipPosition({ x, y, alignTop });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-2 pt-8">
      <div className="w-full max-w-7xl px-4 flex flex-col items-center">
        <header className="text-center mb-8 w-full">
          <h1 className="text-4xl font-bold mb-4 break-words">My Projects</h1>
          <p className="text-lg mb-4 break-words whitespace-pre-wrap max-w-full">
            projects here and there and here and everywhere
          </p>
        </header>

        <div className="flex justify-between w-full relative" ref={projectsContainerRef}>
          <div
            className={`grid gap-8 ${
              selectedProject && !isMobile ? 'w-[70%]' : 'w-full'
            }`}
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer select-none hover:scale-110
                          ${selectedProject?.id === project.id ? "ring-2 ring-blue-500" : ""}`}
                onClick={() => handleProjectClick(project)}
                onDragStart={(e) => e.preventDefault()}
              >
                <div className="relative w-full h-48">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover pointer-events-none"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={100}
                    priority
                  />
                </div>
                <div className={`${selectedProject?.id === project.id ? "bg-blue-700" : "bg-gray-800"} w-full h-full`}>
                  <h3 className="text-lg font-semibold text-white p-3">{project.title}</h3>
                  <div className="flex flex-wrap px-2 pb-2">
                    {project.tags.map((tagKey) => (
                      <span
                        key={tagKey}
                        className={`${TAGS[tagKey].color} text-white text-xs px-2 py-1 rounded mr-2 mb-2`}
                      >
                        {TAGS[tagKey].name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedProject && (
            <div
              className={`bg-gray-800 shadow-lg overflow-auto ${
                isMobile
                  ? 'fixed inset-0 top-[64px] z-50'
                  : 'w-[28%] sticky'
              }`}
              ref={detailsPanelRef}
              style={{
                top: isMobile ? undefined : `${navbarHeight + 56}px`,
                height: isMobile ? undefined : `calc(100vh - ${navbarHeight + 40}px)`,
              }}
            >
              <button
                onClick={closeProjectDetails}
                className="absolute text-white bg-red-500 hover:bg-red-600 w-8 h-8 flex items-center justify-center text-xl font-bold z-10 top-0 right-0 rounded-tr-lg rounded-bl-lg"
              >
                ×
              </button>
              <div className="p-3">
                <div className="relative w-full h-56">
                  <Image
                    src={selectedProject.thumbnail}
                    alt={selectedProject.title}
                    fill
                    className="object-cover rounded-lg pointer-events-none"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={100}
                    priority
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 mt-4">{selectedProject.title}</h3>
                <div className="flex flex-wrap mb-3">
                  {selectedProject.tags.map((tagKey) => (
                    <div
                      key={tagKey}
                      className="relative inline-block mr-2 mb-2"
                      onMouseEnter={(e) => handleTagHover(tagKey, e)}
                      onMouseLeave={() => setHoveredTag(null)}
                    >
                      <span className={`${TAGS[tagKey].color} text-white text-xs px-2 py-1 rounded cursor-help`}>
                        {TAGS[tagKey].name}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-300 text-sm mb-5">{selectedProject.description}</p>
                <button
                  onClick={() => handleDownload(selectedProject)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg
                  text-sm w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Download"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {hoveredTag && (
        <div
          ref={tooltipRef}
          className="fixed bg-gray-900 text-white text-xs p-2 rounded z-50 break-words w-40"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            ...(tooltipPosition.alignTop && { transform: 'translateY(-100%)' })
          }}
        >
          {TAGS[hoveredTag].description}
        </div>
      )}
    </div>
  );
}

export default Projects;