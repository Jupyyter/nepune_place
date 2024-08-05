"use client";
import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from 'next/image';
import { combineAndDownload } from "./fileUtils";
import jhonny from  "/imgs/jhonny.png";
import baddApple from "/imgs/badApple.png";
import GabrielIsHungry from "/imgs/GabrielIsHungry.png";
import bingChilling from "/imgs/bingChilling.png"
import shadowGang from "/imgs/shadowGang.png"
import cppGame from "/imgs/cppGame.png"
import checkers from "/imgs/checkers.png"

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
      "created using greenfoot 'engine' (its disrespectful for the other engines to call this a real game engine)",
    color: "bg-cyan-500",
  },
  SDL2: {
    name: "SDL2",
    description: "created  using the SDL2 graphics library",
    color: "bg-yellow-500",
  },
  LARGE_FILE: {
    name: "100MB+",
    description:
      "the size of the file is greater than 100 MB so github forced me to separate it into 2 files and combine them into 1 so i can continue abusing their servers. even after it downloaded, wait until the button on which you pressed to download it stops showing 'combining files'",
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

function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({
    isAbove: false,
    alignRight: false,
  });
  const tagRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (hoveredTag) {
      const tagElement = tagRefs.current[hoveredTag];
      if (tagElement) {
        const rect = tagElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        // Calculate space above and below
        const spaceAbove = rect.top;
        const spaceBelow = viewportHeight - rect.bottom;

        // Check if there's more space above than below
        const isAbove = spaceBelow < spaceAbove;

        // Check if aligning right is necessary
        const alignRight = rect.left + 200 > viewportWidth; // 200px is the tooltip width

        setTooltipPosition({ isAbove, alignRight });
      }
    }
  }, [hoveredTag]);
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project.id === selectedProject?.id ? null : project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  const [isLoading, setIsLoading] = useState(false);

  const projects: Project[] = [
    {
      id: 0,
      title: "jhonny",
      thumbnail: "./imgs/jhonny.png",
      description:
        "you play as jhonny and you shoot gangsters. i made possible for a multiplayer game, but since i dont have servers for this, you will have to use hamachi if you dont play multiplayer locally. i also dont recomand shooting until all the players are connected :)",
      downloadUrls: ["jhonnyGame.zip"],
      tags: ["UNITY", "C#"],
    },
    {
      id: 1,
      title: "video in ascii",
      thumbnail: "./imgs/badApple.png",
      description:
        "this thing plays any video in ascii, but the default video is bad apple",
      downloadUrls: ["asciiVideo.zip", "badApple.zip"],
      tags: ["CPP", "LARGE_FILE"],
    },
    {
      id: 2,
      title: "gabriel the hungry",
      thumbnail: "./imgs/GabrielIsHungry.png",
      description: "this is the story of gabriel",
      downloadUrls: [`GabrielIsHungry.zip`, "GabrielIsHungry0.zip"],
      tags: ["GODOT", "GDSCRIPT", "LARGE_FILE"],
    },
    {
      id: 3,
      title: "fight Jhon Cena",
      thumbnail: "./imgs/bingChilling.png",
      description:
        "i liked undertale. because of that, i made a game in which you fight john cena in an undertale-style fight",
      downloadUrls: [`bingChilling.zip`],
      tags: ["UNITY", "C#"],
    },
    {
      id: 4,
      title: "shadow wizzard money gang",
      thumbnail: "./imgs/shadowGang.png",
      description:
        "i made this with a classmate (code: 95% me, art: 1% me ) for a contest. unfortunately the contest required the usage of 'greenfoot'",
      downloadUrls: [`shadowGang.zip`],
      tags: ["GREENFOOT", "JAVA"],
    },
    {
      id: 5,
      title: "the 3 room adventure",
      thumbnail: "./imgs/cppGame.png",
      description:
        "this looks too simple for a game, and it is, except the fact that it was made in c++ using sdl2 instead of a game engine",
      downloadUrls: [`cppGame.zip`, "cppGame0.zip"],
      tags: ["CPP", "SDL2", "LARGE_FILE"],
    },
    {
      id: 6,
      title: "checkers",
      thumbnail: "./imgs/checkers.png",
      description: "checkers",
      downloadUrls: [`worldOfTanks.zip`],
      tags: ["JAVA"],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 py-4">My Projects</h1>
        <p className="text-lg mb-4">
          projects here and there and here and everywhere
        </p>
      </header>
      <div className="w-full max-w-6xl flex">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${
            selectedProject ? "w-2/3" : "w-full"
          }`}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all
                          /*${
                            selectedProject?.id === project.id
                              ? "ring-2 ring-blue-500"
                              : ""
                          }*/
                          hover:scale-105`}
              onClick={() => handleProjectClick(project)}
            >
              <Image
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-48 object-cover"
                width={7777}
              height={200}
              priority
              />
              <div
                className={`p-3 ${
                  selectedProject?.id === project.id ? "bg-blue-700" : ""
                }`}
              >
                <h3 className="text-xl font-semibold text-white">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        {selectedProject && (
          <div className="w-1/3 ml-6 bg-gray-800 rounded-lg shadow-lg relative">
            <button
              onClick={closeProjectDetails}
              className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full w-6 h-6 flex items-center justify-center"
            >
              ×
            </button>
            <Image
              src={selectedProject.thumbnail}
              alt={selectedProject.title}
              className="w-full h-48 object-cover"
              width={777}
              height={200}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white mb-2">
                {selectedProject.title}
              </h3>
              <div className="flex flex-wrap mb-2">
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
                    <span
                      className={`${TAGS[tagKey].color} text-white text-xs px-2 py-1 rounded cursor-help`}
                    >
                      {TAGS[tagKey].name}
                    </span>
                    {hoveredTag === tagKey && (
                      <span
                        className={`
              absolute bg-gray-900 text-white text-xs p-2 rounded z-50 break-words
              w-48 
              ${tooltipPosition.isAbove ? "bottom-full mb-1" : "top-full mt-1"}
              ${tooltipPosition.alignRight ? "right-0" : "left-0"}
            `}
                      >
                        {TAGS[tagKey].description}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-gray-300 mb-4">
                {selectedProject.description}
              </p>
              <button
      onClick={() => combineAndDownload(selectedProject, setIsLoading)}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      disabled={isLoading}
    >
      {isLoading ? "Combining files..." : "Windows"}
    </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
