"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { combineAndDownload, downloadSingleFile } from "./fileUtils";

interface Tag {
  name: string;
  description: string;
  color: string;
}

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
    color: "bg-cyan-900",
  },
  SDL2: {
    name: "SDL2",
    description: "created using the SDL2 graphics library",
    color: "bg-yellow-500",
  },
  SFML: {
    name: "SFML",
    description: "created using the SFML graphics library",
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
  createdAt: Date;
  relevance: number;
  repoName?: string;
  images: string[]; // Array of image paths for the project
}
import jhonnyImg from "/public/imgs/jhonny.png";
import badAppleImg from "/public/imgs/badApple.png";
import gabrielImg from "/public/imgs/GabrielIsHungry.png";
import bingChillingImg from "/public/imgs/bingChilling.png";
import shadowGangImg from "/public/imgs/shadowGang.png";
import cppGameImg from "/public/imgs/cppGame.png";
import checkersImg from "/public/imgs/checkers.png";
import ikeaManImg from "/public/imgs/ikeaMan.jpg";
const projects: Project[] = [
  {
    id: 0,
    title: "jhonny",
    thumbnail: "/imgs/jhonny.png", // Thumbnail image
    description:
      "you play as jhonny and you shoot gangsters. i made possible for a multiplayer game, but since i dont have servers for this, you will have to use hamachi if you dont play multiplayer locally. i also dont recomand shooting until all the players are connected :)",
    downloadUrls: ["jhonnyGang.zip"],
    tags: ["UNITY", "C#"],
    createdAt: new Date(),
    relevance: 7,
    repoName: "jhonny",
    images: Array.from({ length: 4 }, (_, i) => `/imgs/jhonny${i}.png`), // Dynamically generate image paths
  },
  {
    id: 1,
    title: "video in ascii",
    thumbnail: "/imgs/badApple.png", // Thumbnail image
    description:
      "this thing plays any video in ascii, but the default video is bad apple. yes, now this can be done by an average AI, but i've done this project when AI was like cardboard at coding so i consider this project a decent achievement",
    downloadUrls: ["asciiVideo.zip", "badApple.zip"],
    tags: ["CPP", "LARGE_FILE"],
    createdAt: new Date(),
    relevance: 8,
    repoName: "BADAPPLE",
    images: Array.from({ length: 2 }, (_, i) => `/imgs/BADAPPLE${i}.png`)
  },
  {
    id: 2,
    title: "gabriel the hungry",
    thumbnail: "/imgs/GabrielIsHungry.png", // Thumbnail image
    description: "this is the story of gabriel",
    downloadUrls: [`gabrielIsHungry.zip`, "gabrielIsHungry0.zip"],
    tags: ["GODOT", "GDSCRIPT", "LARGE_FILE"],
    createdAt: new Date(),
    relevance: 6,
    repoName: "I-am-hungry-and-my-name-is-Gabriel",
    images: Array.from({ length: 6 }, (_, i) => `/imgs/GabrielIsHungry${i}.png`),
  },
  {
    id: 3,
    title: "fight Jhon Cena",
    thumbnail: bingChillingImg.src,
    description:
      "i like undertale. because of that, i made a game in which you fight john cena in an undertale-style fight",
    downloadUrls: [`bingChilling.zip`],
    tags: ["UNITY", "C#"],
    createdAt: new Date(),
    relevance: 2,
    repoName: "fightJohnCena",
    images: Array.from({ length: 4 }, (_, i) => `/imgs/bingChilling${i}.png`),
  },
  {
    id: 4,
    title: "shadow wizzard money gang",
    thumbnail: shadowGangImg.src,
    description:
      "i made this with a classmate (code: 95% me, art: 1% me ) for a contest. unfortunately the contest required the usage of 'greenfoot'. the creation date shown here is wrong (the github api shows the date on which the repository was created, and i had to fork this project from my classmate for the api to work, so it shows the date on which i forked the project, true date: i dont remember, but it was 2024 :) )",
    downloadUrls: [`shadowGang.zip`],
    tags: ["GREENFOOT", "JAVA"],
    createdAt: new Date(),
    relevance: 4,
    repoName: "WizardGang",
    images: Array.from({ length: 7 }, (_, i) => `/imgs/WizardGang${i}.png`),
  },
  {
    id: 5,
    title: "the 3 room adventure",
    thumbnail: cppGameImg.src,
    description:
      "a simple project made in c++ using sdl2 instead of a game engine",
    downloadUrls: [`cppGame2.zip`, "cppGame3.zip"],
    tags: ["CPP", "SDL2", "LARGE_FILE"],
    createdAt: new Date(),
    relevance: 1,
    repoName: "project-rpg",
    images: Array.from({ length: 4 }, (_, i) => `/imgs/3roomAdventure${i}.png`),
  },
  {
    id: 6,
    title: "checkers",
    thumbnail: checkersImg.src,
    description: "checkers",
    downloadUrls: [`worldOfTanks.jar`],
    tags: ["JAVA", "JAR"],
    createdAt: new Date(),
    relevance: 5,
    repoName: "checkers",
    images: Array.from({ length: 5 }, (_, i) => `/imgs/checkers${i}.png`),
  },
  {
    id: 7,
    title: "i dont wanna be a bunny anymore",
    thumbnail: ikeaManImg.src,
    description:
      "you fight ikeaMan. i recomand you extract the files from the zip file if you wanna use the leveleditor properly",
    downloadUrls: ["ikeaBattle0.zip", "ikeaBattle1.zip"],
    tags: ["CPP", "SFML","LARGE_FILE"],
    createdAt: new Date(),
    relevance: 9,
    repoName: "99layers",
    images: [
      "/imgs/jhonny0.png",
      "/imgs/jhonny1.png",
      "/imgs/jhonny2.png",
      "/imgs/jhonny3.png",
    ]
  },
];
type SortOption = "relevance" | "date" | "none";

const sortButtonOptions: { value: SortOption; label: string }[] = [
  { value: "none", label: "Default" },
  { value: "date", label: "Latest First" },
  { value: "relevance", label: "Most Relevant First" },
];

// GitHub API configuration
const GITHUB_USERNAME = "Jupyyter"; //GitHub username
const GITHUB_API_BASE = "https://api.github.com";

async function fetchRepoCreationDate(repoName: string): Promise<Date | null> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch repo data for ${repoName}: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return new Date(data.created_at);
  } catch (error) {
    console.error(`Error fetching repo data for ${repoName}:`, error);
    return null;
  }
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredTag, setHoveredTag] = useState<keyof typeof TAGS | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({
    x: 0,
    y: 0,
    alignTop: false,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("none");
  const [projectsWithDates, setProjectsWithDates] = useState(projects);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const detailsPanelRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const navbarHeight = 64;

  // Function to preload images
  const preloadImages = (imageUrls: string[]) => {
    imageUrls.forEach((url) => {
      const img = new (Image as any)(); // Cast Image to 'any' to avoid TypeScript error
      img.src = url;
    });
  };

  // Preload images when a project is selected
  useEffect(() => {
    if (selectedProject) {
      preloadImages(selectedProject.images);
    }
  }, [selectedProject]);

  // Fetch repository creation dates
  useEffect(() => {
    const fetchDates = async () => {
      const updatedProjects = await Promise.all(
        projects.map(async (project) => {
          if (project.repoName) {
            const createdAt = await fetchRepoCreationDate(project.repoName);
            return createdAt ? { ...project, createdAt } : project;
          }
          return project;
        })
      );
      setProjectsWithDates(updatedProjects);
    };

    fetchDates();
  }, []);

  // Sort projects based on the selected sort option
  const sortedProjects = [...projectsWithDates].sort((a, b) => {
    switch (sortOption) {
      case "date":
        return b.createdAt.getTime() - a.createdAt.getTime();
      case "relevance":
        return b.relevance - a.relevance;
      default:
        return 0;
    }
  });

  // Handle image cycling
  const handleNextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % selectedProject.images.length
      );
    }
  };

  const handlePreviousImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1
      );
    }
  };

  // Reset the image index when a new project is selected
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProject]);

  // Handle mobile responsiveness
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

  // Handle wheel events for the details panel
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

  // Handle project click
  const handleProjectClick = (project: Project) => {
    if (project.id !== selectedProject?.id) {
      setSelectedProject(project);
    }
  };

  // Close project details
  const closeProjectDetails = () => {
    setSelectedProject(null);
    setIsFullscreen(false);
  };

  // Handle download
  const handleDownload = (project: Project) => {
    setIsLoading(true);
    if (project.downloadUrls.length === 1) {
      const fileName =
        project.downloadUrls[0].split("/").pop() || `${project.title}.zip`;
      downloadSingleFile(project.downloadUrls[0], fileName, setIsLoading);
    } else {
      combineAndDownload(project, setIsLoading);
    }
  };

  // Handle tag hover
  const handleTagHover = (
    tagKey: keyof typeof TAGS,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
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

  // Handle sort change
  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    setSelectedProject(null);
  };

  // Handle image click for fullscreen
  const handleImageClick = () => {
    setIsFullscreen(true);
  };

  // Handle fullscreen close
  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-2 pt-8">
      <div className="w-full max-w-7xl px-4 flex flex-col items-center">
        <header className="text-center mb-8 w-full">
          <h1 className="text-4xl font-bold mb-4 break-words">My Projects</h1>
          <p className="text-lg mb-4 break-words whitespace-pre-wrap max-w-full">
            projects here and there and here and everywhere
          </p>
          <div className="flex justify-center items-center gap-4 mb-4">
            <span className="text-gray-300">Sorting by:</span>
            <div className="flex gap-4">
              {sortButtonOptions.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => handleSortChange(value)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-0 ${
                    sortOption === value
                      ? "bg-purple-900 text-white hover:bg-white hover:text-black"
                      : "bg-gray-700 text-gray-300 hover:bg-white hover:text-black"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div
          className="flex justify-between w-full relative"
          ref={projectsContainerRef}
        >
          <div
            className={`grid gap-8 ${
              selectedProject && !isMobile ? "w-[70%]" : "w-full"
            }`}
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            }}
          >
            {sortedProjects.map((project) => (
              <div
                key={project.id}
                className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer select-none hover:scale-110
                          ${
                            selectedProject?.id === project.id
                              ? "ring-2 ring-blue-500"
                              : ""
                          }`}
                onClick={() => handleProjectClick(project)}
                onDragStart={(e) => e.preventDefault()}
                style={{ maxHeight: "400px" }} // Added max height for project cards
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
                    loading="eager"
                  />
                </div>
                <div
                  className={`${
                    selectedProject?.id === project.id
                      ? "bg-blue-700"
                      : "bg-gray-800"
                  } w-full h-full`}
                >
                  <h3 className="text-lg font-semibold text-white p-3">
                    {project.title}
                  </h3>
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
                  <div className="px-3 pb-3 text-sm text-gray-400">
                    Created: {project.createdAt.toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedProject && (
            <div
              className={`bg-gray-800 shadow-lg overflow-auto ${
                isMobile ? "fixed inset-0 top-[64px] z-50" : "w-[28%] sticky"
              }`}
              ref={detailsPanelRef}
              style={{
                top: isMobile ? undefined : `${navbarHeight + 56}px`,
                height: isMobile
                  ? undefined
                  : `calc(100vh - ${navbarHeight + 40}px)`,
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
                    src={selectedProject.images[currentImageIndex]}
                    alt={selectedProject.title}
                    fill
                    className="object-cover rounded-lg cursor-pointer" // Removed pointer-events-none
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={100}
                    priority
                    onClick={handleImageClick} // Ensure the click handler is applied
                  />
                  {/* Left Arrow */}
                  <button
                    onClick={handlePreviousImage}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r-lg hover:bg-gray-700"
                  >
                    ‹
                  </button>
                  {/* Right Arrow */}
                  <button
                    onClick={handleNextImage}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l-lg hover:bg-gray-700"
                  >
                    ›
                  </button>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 mt-4">
                  {selectedProject.title}
                </h3>
                <div className="flex flex-wrap mb-3">
                  {selectedProject.tags.map((tagKey) => (
                    <div
                      key={tagKey}
                      className="relative inline-block mr-2 mb-2"
                      onMouseEnter={(e) => handleTagHover(tagKey, e)}
                      onMouseLeave={() => setHoveredTag(null)}
                    >
                      <span
                        className={`${TAGS[tagKey].color} text-white text-xs px-2 py-1 rounded cursor-help`}
                      >
                        {TAGS[tagKey].name}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  {selectedProject.description}
                </p>
                <p className="text-gray-400 text-sm mb-5">
                  Created: {selectedProject.createdAt.toLocaleDateString()}
                </p>
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

      {isFullscreen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            onClick={handleCloseFullscreen}
            className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 w-8 h-8 flex items-center justify-center text-xl font-bold rounded-full"
          >
            ×
          </button>
          <div className="relative w-[75vw] h-[75vh]">
            <Image
              src={selectedProject.images[currentImageIndex]}
              alt={selectedProject.title}
              fill
              className="object-contain rounded-lg pointer-events-none"
              quality={100}
              priority
            />
            {/* Left Arrow */}
            <button
              onClick={handlePreviousImage}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r-lg hover:bg-gray-700"
            >
              ‹
            </button>
            {/* Right Arrow */}
            <button
              onClick={handleNextImage}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l-lg hover:bg-gray-700"
            >
              ›
            </button>
          </div>
        </div>
      )}

      {hoveredTag && (
        <div
          ref={tooltipRef}
          className="fixed bg-gray-900 text-white text-xs p-2 rounded z-50 break-words w-40"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            ...(tooltipPosition.alignTop && { transform: "translateY(-100%)" }),
          }}
        >
          {TAGS[hoveredTag].description}
        </div>
      )}
    </div>
  );
}

export default Projects;