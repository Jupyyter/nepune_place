"use client";
import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { combineAndDownload, downloadSingleFile } from "./fileUtils";

const TAGS = {
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
      "created using greenfoot 'engine'. since this thing will not let me export any jar or exe file, the only way for you is to play this, is directly in greenfoot, so you should download that too if you wanna run this (its disrespectful for the other engines to call this a real game engine)",
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
      "the size of the file is greater than 100 MB so github forced me to separate it into multiple files and combine them into 1 so i can continue abusing their servers. even after it downloaded, wait until the button on which you pressed to download it stops showing 'processing'",
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
  // Add more tags as needed
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
      "i liked undertale. because of that, i made a game in which you fight john cena in an undertale-style fight",
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
      "this looks too simple for a game, and it is, except the fact that it was made in c++ using sdl2 instead of a game engine",
    downloadUrls: [`cppGame.zip`, "cppGame0.zip"],
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
    description:
      "you fight ikeaMan",
    downloadUrls: ["ikeaBattle.zip"],
    tags: ["CPP", "SFML"],
  },
];


function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({
    isAbove: false,
    alignRight: false,
  });
  const tagRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const detailsPanelRef = useRef<HTMLDivElement>(null);
  const navbarHeight = 64;


  const handleProjectClick = (project: Project) => {
    setSelectedProject(project.id === selectedProject?.id ? null : project);
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

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 text-white">
      <header className="text-center mt-1 mb-8 w-full max-w-7xl px-4">
        <h1 className="text-4xl font-bold mb-4 py-4 break-words">My Projects</h1>
        <p className="text-lg mb-4 break-words">
          projects here and there and here and everywhere
        </p>
      </header>

      <div className="w-full max-w-screen-2xl px-4 flex">
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ${selectedProject ? 'w-2/3 pr-1' : 'w-full'}`}>
          {projects.map((project) => (
            <div
              key={project.id}
              className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all select-none
                        ${selectedProject?.id === project.id ? "ring-2 ring-blue-500" : ""}
                        hover:scale-105`}
              onClick={() => handleProjectClick(project)}
              onDragStart={(e) => e.preventDefault()}
            >
              <Image
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-64 object-cover pointer-events-none"
                width={5640}
                height={1920}
                quality={100}
                priority
              />
              <div className={`${selectedProject?.id === project.id ? "bg-blue-700" : "bg-gray-800"} w-full h-full`}>
                <h3 className="text-xl font-semibold text-white p-4">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {selectedProject && (
          <div 
            ref={detailsPanelRef}
            className="w-1/3 bg-gray-800 rounded-lg shadow-lg fixed right-0 overflow-y-auto"
            style={{ top: `${navbarHeight}px`, height: `calc(100vh - ${navbarHeight}px)` }}
          >
            <div className="p-6">
              <button
                onClick={closeProjectDetails}
                className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center text-xl"
              >
                ×
              </button>
              <Image
                src={selectedProject.thumbnail}
                alt={selectedProject.title}
                className="w-full h-72 object-cover rounded-lg pointer-events-none"
                quality={100}
                width={9640}
                height={1920}
                priority
              />
              <h3 className="text-2xl font-semibold text-white mb-4 mt-6">
                {selectedProject.title}
              </h3>
              <div className="flex flex-wrap mb-4">
                {selectedProject.tags.map((tagKey) => (
                  <div
                    key={tagKey}
                    className="relative inline-block mr-2 mb-2"
                    onMouseEnter={() => setHoveredTag(tagKey)}
                    onMouseLeave={() => setHoveredTag(null)}
                    ref={(el) => {
                      if (tagRefs.current) {
                        tagRefs.current[tagKey] = el;
                      }
                    }}
                  >
                    <span className={`${TAGS[tagKey].color} text-white text-sm px-3 py-1 rounded cursor-help`}>
                      {TAGS[tagKey].name}
                    </span>
                    {hoveredTag === tagKey && (
                      <span className={`
                        absolute bg-gray-900 text-white text-sm p-2 rounded z-50 break-words
                        w-48 
                        ${tooltipPosition.isAbove ? "bottom-full mb-1" : "top-full mt-1"}
                        ${tooltipPosition.alignRight ? "right-0" : "left-0"}
                      `}>
                        {TAGS[tagKey].description}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-gray-300 text-lg mb-6">
                {selectedProject.description}
              </p>
              <button
                onClick={() => handleDownload(selectedProject)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Download"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;