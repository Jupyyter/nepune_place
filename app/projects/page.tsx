"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { combineAndDownload, downloadSingleFile } from "./fileUtils";

// --- Interfaces, TAGS, Projects Data ---
interface Tag {
  name: string;
  description: string;
  color: string;
}
const TAGS: { [key: string]: Tag } = {
  UNITY: {
    name: "Unity",
    description: `Created using Unity engine.`,
    color: "bg-green-500",
  },
  GODOT: {
    name: "Godot",
    description: `Created using Godot engine.`,
    color: "bg-blue-700",
  },
  GREENFOOT: {
    name: "Greenfoot",
    description: `Created using Greenfoot 'engine'.
Since Greenfoot doesn't allow exporting JAR or EXE files, the only way to play this is directly within Greenfoot.
You'll need to download Greenfoot to run this project.
(Calling it a 'real game engine' might be disrespectful to other engines).`,
    color: "bg-cyan-900",
  },
  SDL2: {
    name: "SDL2",
    description: `Created using the SDL2 graphics library.`,
    color: "bg-yellow-500",
  },
  SFML: {
    name: "SFML",
    description: `Created using the SFML graphics library.`,
    color: "bg-purple-700",
  },
  LARGE_FILE: {
    name: "100MB+",
    description: `The file size exceeds 100MB.
GitHub's limitations required splitting it into multiple parts that are combined upon download to continue hosting on their servers.
After downloading, please wait until the download button stops showing 'Processing' before assuming completion.`,
    color: "bg-red-500",
  },
  CPP: {
    name: "C++",
    description: `Developed using C++.`,
    color: "bg-blue-900",
  },
  "C#": {
    name: "C#",
    description: `Developed using C#.`,
    color: "bg-purple-900",
  },
  GDSCRIPT: {
    name: "Gdscript",
    description: `Developed using Gdscript.`,
    color: "bg-green-900",
  },
  JAVA: {
    name: "Java",
    description: `Developed using Java.`,
    color: "bg-yellow-900",
  },
  JAVASCRIPT: {
    name: "JavaScript",
    description: `Developed using JavaScript.`,
    color: "bg-yellow-300",
  },
  REACT: {
    name: "React",
    description: `Built with React framework (or library or whatever this is).`,
    color: "bg-cyan-500",
  },
  JAR: {
    name: "Jar",
    description: `This project provides a JAR file instead of an executable.
Clicking a JAR file directly within a ZIP archive might only show its source code.
To run the application without compiling, please extract the JAR file from the ZIP archive first.`,
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
  images: string[];
  videoUrls?: string[]; // Changed from videoUrl to videoUrls
}
import jhonnyImg from "/public/imgs/jhonny.png";
import badAppleImg from "/public/imgs/badApple.png";
import gabrielImg from "/public/imgs/GabrielIsHungry.png";
import bingChillingImg from "/public/imgs/bingChilling.png";
import shadowGangImg from "/public/imgs/shadowGang.png";
import cppGameImg from "/public/imgs/cppGame.png";
import checkersImg from "/public/imgs/checkers.png";
import endi from "/public/imgs/endi.png";

const projects: Project[] = [
  {
    id: 0,
    title: "jhonny",
    thumbnail: "/imgs/jhonny.png",
    description: `My first ever "game"
You play as Jhonny and you shoot gangsters.
I made it possible for a multiplayer game, but since I don't have servers for this, you will have to use Hamachi if you don't play multiplayer locally.
I also don't recommend shooting until all the players are connected :)`,
    downloadUrls: ["jhonnyGang.zip"],
    tags: ["UNITY", "C#"],
    createdAt: new Date(),
    relevance: 7,
    repoName: "jhonny",
    videoUrls: ["https://www.youtube.com/watch?v=pMxjJBKdl3Y&feature=youtu.be"],
    images: Array.from({ length: 3 }, (_, i) => `/imgs/jhonny${i}.png`),
  },
  {
    id: 1,
    title: "video in ascii",
    thumbnail: "/imgs/badApple.png",
    description: `This program plays any video in ASCII, with the default video being Bad Apple.
Yes, this can now be done by an average AI, but I developed this project when AI's coding capabilities were rudimentary, so I consider this a decent achievement.`,
    downloadUrls: ["asciiVideo.zip", "badApple.zip"],
    tags: ["CPP", "LARGE_FILE"],
    createdAt: new Date(),
    relevance: 8,
    repoName: "BADAPPLE",
    images: Array.from({ length: 2 }, (_, i) => `/imgs/BADAPPLE${i}.png`),
    videoUrls: ["https://www.youtube.com/watch?v=qeyVAu1uZMM"],
  },
  {
    id: 2,
    title: "gabriel the hungry",
    thumbnail: "/imgs/GabrielIsHungry.png",
    description: `This is the story of gabriel.
It's a short tale full of adventure :)`,
    downloadUrls: [`gabrielIsHungry.zip`, "gabrielIsHungry0.zip"],
    tags: ["GODOT", "GDSCRIPT", "LARGE_FILE"],
    createdAt: new Date(),
    relevance: 6,
    repoName: "I-am-hungry-and-my-name-is-Gabriel",
    images: Array.from(
      { length: 6 },
      (_, i) => `/imgs/GabrielIsHungry${i}.png`
    ),
  },
  {
    id: 3,
    title: "fight Jhon Cena",
    thumbnail: bingChillingImg.src,
    description: `I like Undertale.
Because of that, I made a game in which you fight john cena in an undertale-style fight.`,
    downloadUrls: [`bingChilling.zip`],
    tags: ["UNITY", "C#"],
    createdAt: new Date(),
    relevance: 2,
    repoName: "fightJohnCena",
    images: Array.from({ length: 4 }, (_, i) => `/imgs/bingChilling${i}.png`),
    videoUrls: ["https://www.youtube.com/watch?v=iry5H_MSQkA"],
  },
  {
    id: 4,
    title: "shadow wizzard money gang",
    thumbnail: shadowGangImg.src,
    description: `I made this with a classmate (code: 95% me, art: 1% me ) for a contest.
Unfortunately the contest required the usage of 'greenfoot'.
The creation date shown here is wrong (the github api shows the date on which the repository was created, and i had to fork this project from my classmate for the api to work, so it shows the date on which i forked the project, true date: i dont remember, but it was 2024 :) )`,
    downloadUrls: [`shadowGang.zip`],
    tags: ["GREENFOOT", "JAVA"],
    createdAt: new Date(),
    relevance: 4,
    repoName: "WizardGang",
    images: Array.from({ length: 6 }, (_, i) => `/imgs/WizardGang${i}.png`),
    videoUrls: ["https://www.youtube.com/watch?v=5HtLpXKm7Uc"],
  },
  {
    id: 5,
    title: "the 3 room adventure",
    thumbnail: cppGameImg.src,
    description: `A simple project made in c++ using sdl2 instead of a game engine.
It features three distinct rooms to explore.`,
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
    description: `Checkers.
A classic game implemented in Java.`,
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
    thumbnail: endi.src,
    description: `You fight ikeaMan.
%%PURPLE_START%%NO OTHER LIBS THAN SFML USED%%PURPLE_END%%
I recommend you extract the files from the zip file if you wanna use the leveleditor properly.
The level editor allows for custom map creation (obviously)`,
    downloadUrls: ["ikeaBattle.zip"],
    tags: ["CPP", "SFML", "LARGE_FILE"],
    createdAt: new Date(),
    relevance: 9,
    repoName: "99layers",
    // Example with multiple videos
    videoUrls: [
      "https://www.youtube.com/watch?v=MGMpnPsCnlM&feature=youtu.be",
    ],
    images: Array.from({ length: 4 }, (_, i) => `/imgs/ikea${i}.png`),
  },
  {
    id: 8,
    title: "the road",
    thumbnail: "/imgs/THEROAD.jpg",
    description: `Just a parallax effect.
"a sense of depth"`,
    downloadUrls: ["road.zip"],
    tags: ["GODOT", "GDSCRIPT"],
    createdAt: new Date(),
    relevance: 0,
    images: [
      "/imgs/the road0.png",
      "/imgs/the road1.png",
    ],
  },
  {
    id: 9,
    title: "fluid-sand",
    thumbnail: "/imgs/fluid-sand.png",
    description: `water behaving like water
    not finished yed
i might finish it someday`,
    downloadUrls: ["road.zip"],
    tags: ["SFML", "CPP"],
    createdAt: new Date(),
    videoUrls: ["https://www.youtube.com/watch?v=o3rVyOu2k-g&feature=youtu.be"],
    relevance: 11,
    images: [],
  },
  {
    id: 10,
    title: "pixels",
    thumbnail: "/imgs/pixels.png",
    description: `noita copy
    "every pixel is simulated"`,
    downloadUrls: ["road.zip"],
    tags: ["SFML", "CPP"],
    createdAt: new Date(),
    relevance: 12,
    videoUrls: ["https://www.youtube.com/watch?v=S83AUOvuE7I&feature=youtu.be",
      "https://www.youtube.com/watch?v=rCCa2yJmGNQ&feature=youtu.be"
    ],
    images: [],
  },
];
type SortOption = "relevance" | "date";
const sortButtonOptions: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "date", label: "The Latest" },
];
const GITHUB_USERNAME = "Jupyyter";
const GITHUB_API_BASE = "https://api.github.com";

async function fetchRepoCreationDate(repoName: string): Promise<Date | null> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}`,
      { headers }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch repo data for ${repoName}: ${response.status} ${response.statusText}`
      );
      return null;
    }
    const data = await response.json();
    return new Date(data.created_at);
  } catch (error) {
    console.error(`Error fetching repo data for ${repoName}:`, error);
    return null;
  }
}
// Helper function (can be defined inside your Projects component or outside if preferred)
const renderFormattedDescription = (description: string) => {
  const purpleStartMarker = "%%PURPLE_START%%";
  const purpleEndMarker = "%%PURPLE_END%%";
  const purpleClassName = "text-purple-500 font-semibold"; // Or any other purple class

  return description.split('\n').map((paragraph, index) => {
    // Check if the current paragraph contains both markers
    if (paragraph.includes(purpleStartMarker) && paragraph.includes(purpleEndMarker)) {
      // Split the paragraph by the markers.
      // This will result in an array like: [textBefore, textInside, textAfter]
      // If the markers are at the start/end of the line, textBefore/textAfter will be empty strings.
      const parts = paragraph.split(new RegExp(`${purpleStartMarker}|${purpleEndMarker}`));
      
      return (
        <p key={index} className="project-description-paragraph whitespace-pre-wrap">
          {parts[0]} {/* Text before the start marker */}
          <span className={purpleClassName}>{parts[1]}</span> {/* Text between markers */}
          {parts[2]} {/* Text after the end marker */}
        </p>
      );
    }
    
    // If no markers, render the paragraph as is
    return (
      <p key={index} className="project-description-paragraph whitespace-pre-wrap">
        {paragraph}
      </p>
    );
  });
};
function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredTag, setHoveredTag] = useState<keyof typeof TAGS | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({
    x: 0,
    y: 0,
    alignTop: false,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("relevance");
  const [projectsWithDates, setProjectsWithDates] = useState<Project[]>( // Initialize with an empty array or structured projects
    projects.map(p => ({ ...p, createdAt: p.repoName ? new Date(0) : p.createdAt })) // Initialize with placeholder for API or actual date
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const detailsPlayerRef = useRef<any>(null);
  const fullscreenPlayerRef = useRef<any>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const detailsPanelRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const mediaThumbnailsContainerRef = useRef<HTMLDivElement>(null);
  const fullscreenMediaThumbnailsContainerRef = useRef<HTMLDivElement>(null);
  const navbarHeight = 64;

  const getVideoCount = (project: Project) => project.videoUrls?.length || 0;
  const getTotalMediaCount = (project: Project) => (project.videoUrls?.length || 0) + project.images.length;
  const isCurrentMediaVideo = (project: Project | null, index: number) => {
    if (!project) return false;
    const numVideos = getVideoCount(project);
    return numVideos > 0 && index < numVideos;
  };

  // --- CORRECTED useEffect for fetching dates ---
  useEffect(() => {
    const initialProjectsWithPlaceholders = projects.map((p) => ({
      ...p,
      createdAt: p.repoName ? new Date(0) : p.createdAt,
    }));
    setProjectsWithDates(initialProjectsWithPlaceholders);

    const fetchAndSetAllDates = async () => {
      const projectsWithFetchedDates = await Promise.all(
        initialProjectsWithPlaceholders.map(async (project) => {
          if (project.repoName && project.createdAt.getTime() === new Date(0).getTime()) {
            const fetchedDate = await fetchRepoCreationDate(project.repoName);
            return fetchedDate ? { ...project, createdAt: fetchedDate } : project;
          }
          return project;
        })
      );
      setProjectsWithDates(projectsWithFetchedDates);
    };

    fetchAndSetAllDates();
  }, []);
  // --- END CORRECTED useEffect ---

  const sortedProjects = [...projectsWithDates].sort((a, b) => {
    const timeA = a.createdAt instanceof Date ? a.createdAt.getTime() : 0;
    const timeB = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;

    switch (sortOption) {
      case "date":
        return timeB - timeA;
      case "relevance":
        return b.relevance - a.relevance;
      default:
        return 0;
    }
  });

  useEffect(() => {
    setCurrentMediaIndex(0);
    setVideoCurrentTime(0);
    if (selectedProject && isCurrentMediaVideo(selectedProject, 0)) {
        setIsVideoPlaying(true);
    } else {
        setIsVideoPlaying(false);
    }

    if (selectedProject && mediaThumbnailsContainerRef.current) {
      requestAnimationFrame(() => {
        if (mediaThumbnailsContainerRef.current) {
          mediaThumbnailsContainerRef.current.scrollLeft = 0;
        }
      });
    }
  }, [selectedProject]); 

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const handleResize = () => {
      checkMobile();
      if (projectsContainerRef.current) {
        const containerWidth = projectsContainerRef.current.offsetWidth;
        const columns = Math.max(1, Math.floor(containerWidth / 300));
        projectsContainerRef.current.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
      }
    };
    checkMobile();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const detailsPanel = detailsPanelRef.current;
    if (!detailsPanel) return;
    const handleWheel = (e: WheelEvent) => {
      const panel = e.currentTarget as HTMLDivElement;
      if (panel.scrollHeight > panel.clientHeight) {
        if (
          (e.deltaY < 0 && panel.scrollTop > 0) ||
          (e.deltaY > 0 &&
            panel.scrollTop < panel.scrollHeight - panel.clientHeight)
        ) {
          e.stopPropagation();
        } else {
          e.preventDefault();
        }
      }
    };
    detailsPanel.addEventListener("wheel", handleWheel, { passive: false });
    return () => detailsPanel.removeEventListener("wheel", handleWheel);
  }, [selectedProject]);

  const handleProjectClick = (project: Project) => {
    if (project.id !== selectedProject?.id) {
      setSelectedProject(project);
      setIsFullscreen(false);
    }
  };
  const closeProjectDetails = () => {
    setSelectedProject(null);
    setIsFullscreen(false);
  };
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
  const handleTagHover = (
    tagKey: keyof typeof TAGS,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setHoveredTag(tagKey);
    const tagRect = event.currentTarget.getBoundingClientRect();
    const tooltipWidth = 160;
    const windowHeight = window.innerHeight;
    let x = tagRect.left;
    let y = tagRect.bottom + 5;
    let alignTop = false;

    const tooltipElement = tooltipRef.current;
    if (tooltipElement) {
        tooltipElement.style.opacity = '0';
        tooltipElement.style.display = 'block';
        const tooltipHeight = tooltipElement.offsetHeight;
        tooltipElement.style.opacity = '';
        tooltipElement.style.display = '';

        if (y + tooltipHeight > windowHeight && tagRect.top - tooltipHeight - 5 > 0) {
            y = tagRect.top - 5;
            alignTop = true;
        } else if (y + tooltipHeight > windowHeight) {
            y = windowHeight - tooltipHeight - 5;
            alignTop = false;
        }
    }

    if (x + tooltipWidth > window.innerWidth) {
      x = window.innerWidth - tooltipWidth - 10;
    }
    if (x < 0) {
      x = 10;
    }
    setTooltipPosition({ x, y, alignTop });
  };
  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    setSelectedProject(null);
  };

  useEffect(() => {
    if (!(window as any).YT || !(window as any).YT.Player) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      (window as any).onYouTubeIframeAPIReady = () => {
        setPlayerReady(true);
      };
    } else {
      setPlayerReady(true);
    }
    return () => {
      if (typeof (window as any).onYouTubeIframeAPIReady === "function") {
        delete (window as any).onYouTubeIframeAPIReady;
      }
    };
  }, []);

  const createPlayerInstance = (
    elementId: string,
    playerRef: React.MutableRefObject<any>,
    projectForPlayer: Project,
    videoIndex: number,
    initialTime: number,
    initialPlaying: boolean
  ) => {
      if (!playerReady || !document.getElementById(elementId) || !isCurrentMediaVideo(projectForPlayer, videoIndex)) return;

    if (playerRef.current && typeof playerRef.current.destroy === 'function') {
      try { playerRef.current.destroy(); }
      catch (e) { console.warn(`Error destroying existing player on ref for ${elementId}:`, e); }
    }
    playerRef.current = null;
    
    const videoUrl = projectForPlayer.videoUrls![videoIndex];
    const videoId = videoUrl.split("v=")[1]?.split("&")[0];
    if (!videoId) {
        console.error("Invalid videoId for player:", projectForPlayer.title, videoUrl);
        return;
    }

    playerRef.current = new (window as any).YT.Player(elementId, {
      videoId: videoId,
      playerVars: {
        modestbranding: 1, fs: 0,
        origin: typeof window !== "undefined" ? window.location.origin : "",
        autoplay: 0, controls: 1,
      },
      events: {
        onReady: (event: any) => {
          event.target.seekTo(initialTime, true);
          if (initialPlaying) {
            event.target.playVideo();
          } else {
            event.target.pauseVideo();
          }
        },
        onError: (event: any) => {
          console.error(`YT Error for ${elementId} (Video: ${projectForPlayer.title}):`, event.data);
        },
      },
    });
  };

  // --- Player Lifecycle & State Sync useEffects ---

  // Details Player Lifecycle & State
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    const shouldPlayerExist = playerReady && selectedProject && isCurrentMediaVideo(selectedProject, currentMediaIndex) && !isFullscreen;

    if (shouldPlayerExist) {
      const detailsContainerId = `youtube-player-container-details-${selectedProject!.id}-${currentMediaIndex}`;
      if (document.getElementById(detailsContainerId)) {
         createPlayerInstance(detailsContainerId, detailsPlayerRef, selectedProject!, currentMediaIndex, videoCurrentTime, isVideoPlaying);
      } else {
        timeoutId = setTimeout(() => {
            if (playerReady && selectedProject && isCurrentMediaVideo(selectedProject, currentMediaIndex) && !isFullscreen && document.getElementById(detailsContainerId)) {
                 createPlayerInstance(detailsContainerId, detailsPlayerRef, selectedProject, currentMediaIndex, videoCurrentTime, isVideoPlaying);
            }
        }, 50);
      }
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      const playerInstance = detailsPlayerRef.current;
      if (playerInstance && typeof playerInstance.destroy === 'function') {
        try { playerInstance.destroy(); }
        catch (e) { console.warn("Caught error during details player.destroy():", e); }
      }
      detailsPlayerRef.current = null;
    };
  }, [playerReady, selectedProject?.id, currentMediaIndex, isFullscreen, videoCurrentTime, isVideoPlaying]);


  // Fullscreen Player Lifecycle & State
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    const shouldPlayerExist = isFullscreen && playerReady && selectedProject && isCurrentMediaVideo(selectedProject, currentMediaIndex);

    if (shouldPlayerExist) {
      const fullscreenContainerId = `youtube-player-container-fullscreen-${selectedProject!.id}-${currentMediaIndex}`;
      if (document.getElementById(fullscreenContainerId)) {
        createPlayerInstance(fullscreenContainerId, fullscreenPlayerRef, selectedProject!, currentMediaIndex, videoCurrentTime, isVideoPlaying);
      } else {
        timeoutId = setTimeout(() => {
            if (isFullscreen && playerReady && selectedProject && isCurrentMediaVideo(selectedProject, currentMediaIndex) && document.getElementById(fullscreenContainerId)) {
                createPlayerInstance(fullscreenContainerId, fullscreenPlayerRef, selectedProject, currentMediaIndex, videoCurrentTime, isVideoPlaying);
            }
        }, 50);
      }
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      const playerInstance = fullscreenPlayerRef.current;
      if (playerInstance && typeof playerInstance.destroy === 'function') {
        try { playerInstance.destroy(); }
        catch (e) { console.warn("Caught error during fullscreen player.destroy():", e); }
      }
      fullscreenPlayerRef.current = null;
    };
  }, [isFullscreen, playerReady, selectedProject?.id, currentMediaIndex, videoCurrentTime, isVideoPlaying]);


  // --- Event Handlers ---
  const handleMediaClick = () => { // From details to fullscreen
    if (!selectedProject) return;
    if (isCurrentMediaVideo(selectedProject, currentMediaIndex)) {
      const player = detailsPlayerRef.current;
      let currentTime = 0;
      let playing = false;

      if (player?.getCurrentTime && player?.getPlayerState) {
        try {
          currentTime = player.getCurrentTime();
          const state = player.getPlayerState();
          playing = (state === 1 || state === 3);
        } catch (e) { console.error("Error getting details player state/time for fullscreen:", e); }
      } else {
        playing = isVideoPlaying;
      }
      setVideoCurrentTime(currentTime);
      setIsVideoPlaying(playing);
      setIsFullscreen(true);
    } else { // Image
      setIsFullscreen(true);
    }
  };

  const handleCloseFullscreen = () => {
    let lastKnownTime = videoCurrentTime;
    let wasPlayingInFullscreen = isVideoPlaying;

    if (fullscreenPlayerRef.current?.getCurrentTime && fullscreenPlayerRef.current?.getPlayerState) {
      try {
        lastKnownTime = fullscreenPlayerRef.current.getCurrentTime();
        const state = fullscreenPlayerRef.current.getPlayerState();
        wasPlayingInFullscreen = (state === 1 || state === 3);
      } catch (e) { console.error("Error getting fullscreen player state/time on close:", e); }
    }
    setVideoCurrentTime(lastKnownTime);
    setIsVideoPlaying(wasPlayingInFullscreen);
    setIsFullscreen(false);
  };

  const handleFullscreenThumbnailClick = (index: number) => {
    if (!selectedProject) return;

    if (isCurrentMediaVideo(selectedProject, index)) {
      setVideoCurrentTime(0);
      setIsVideoPlaying(true);
    }
    setCurrentMediaIndex(index);

    if (fullscreenMediaThumbnailsContainerRef.current) {
      const selectedThumb = fullscreenMediaThumbnailsContainerRef.current.children[index] as HTMLElement;
      if (selectedThumb?.scrollIntoView) {
        selectedThumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  };

  useEffect(() => {
    if (selectedProject?.images?.length) {
      selectedProject.images.forEach((imageUrl) => {
        if (imageUrl && typeof imageUrl === "string") {
          const img = new window.Image();
          img.src = imageUrl;
        }
      });
    }
  }, [selectedProject]);

  const renderMedia = (
    project: Project,
    index: number,
    inFullscreen: boolean = false
  ) => {
    const isVideo = isCurrentMediaVideo(project, index);
    const videoCount = getVideoCount(project);
    const imageIndex = index - videoCount;

    const mediaKey = isVideo
      ? `media-video-${project.id}-${index}-${inFullscreen ? 'fs' : 'dt'}`
      : `media-image-${project.id}-${imageIndex}-${inFullscreen ? 'fs' : 'dt'}`;

    if (isVideo) {
      const playerContainerId = inFullscreen
        ? `youtube-player-container-fullscreen-${project.id}-${index}`
        : `youtube-player-container-details-${project.id}-${index}`;
      return (
        <div key={mediaKey} className={`relative w-full h-full ${!inFullscreen ? "aspect-video" : ""}`}>
          <div
            id={playerContainerId}
            className="w-full h-full"
          >
          </div>
          {!inFullscreen && (
            <button
              onClick={handleMediaClick}
              className="absolute bottom-2 right-2 bg-black bg-opacity-50 p-2 rounded-lg hover:bg-opacity-70 transition-opacity"
              title="Enter fullscreen" aria-label="Enter fullscreen for video"
            >
              <Maximize2 className="w-5 h-5 text-white" />
            </button>
          )}
        </div>
      );
    } else { 
      if (imageIndex < 0 || imageIndex >= project.images.length) {
        return <div key={mediaKey}>Error: Image not found</div>;
      }
      const imageUrl = project.images[imageIndex];
      const commonImageClasses = inFullscreen ? "object-contain rounded-lg" : "object-cover rounded-lg";
      return (
        <div
          key={mediaKey}
          className={`relative w-full h-full ${!inFullscreen ? "cursor-pointer" : ""}`}
          onClick={!inFullscreen ? handleMediaClick : undefined}
          role={!inFullscreen ? "button" : undefined}
          aria-label={!inFullscreen ? "View image fullscreen" : undefined}
        >
          <Image
            src={imageUrl}
            alt={`${project.title} - Image ${imageIndex + 1}`}
            fill
            className={commonImageClasses}
            sizes={inFullscreen ? "90vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            quality={inFullscreen ? 90 : 85}
            priority={true}
            unoptimized={false}
          />
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-2 pt-8">
      <style jsx global>{`
        .thumbnail-scrollbar::-webkit-scrollbar { height: 16px; background-color: transparent; }
        .thumbnail-scrollbar::-webkit-scrollbar-track { background: #1a202c; border-radius: 16px; margin: 0 2px; }
        .thumbnail-scrollbar::-webkit-scrollbar-thumb { background: #4a5568; border-radius: 16px; border: 2px solid #1a202c; }
        .thumbnail-scrollbar::-webkit-scrollbar-thumb:hover { background: #718096; }
        .thumbnail-scrollbar { scrollbar-width: auto; scrollbar-color: #4a5568 #1a202c; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .project-description-paragraph, .tooltip-description-paragraph { text-indent: 4ch; margin-top: 0; margin-bottom: 0; }
        .project-description-paragraph:empty, .tooltip-description-paragraph:empty { min-height: 1em; }
      `}</style>

      <div className="w-full max-w-7xl px-4 flex flex-col items-center">
        <header className="text-center mb-8 w-full">
          <h1 className="text-4xl font-bold mb-4 break-words">My Projects</h1>
          <p className="text-lg mb-4 break-words whitespace-pre-wrap max-w-full">
            projects here and there and here and everywhere
          </p>
          <div className="flex justify-center items-center gap-4 mb-4 flex-wrap">
            <span className="text-gray-300">Sorting by:</span>
            <div className="flex gap-4 flex-wrap">
              {sortButtonOptions.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => handleSortChange(value)}
                  className={`px-4 py-2 rounded-lg ease-in-out ${
                    sortOption === value
                      ? "bg-purple-900 text-white hover:bg-purple-700"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div
          className="flex justify-between w-full relative gap-8"
          ref={projectsContainerRef}
        >
          <div
            className={`grid gap-8 ${
              selectedProject && !isMobile ? "w-[calc(70%-1rem)]" : "w-full"
            }`}
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            }}
          >
            {sortedProjects.map((project) => (
              <div
                key={project.id}
                className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer select-none hover:scale-105 ${
                  selectedProject?.id === project.id
                    ? "ring-2 ring-blue-500 scale-105"
                    : ""
                }`}
                onClick={() => handleProjectClick(project)}
                onDragStart={(e) => e.preventDefault()}
                style={{ maxHeight: "400px" }}
              >
                <div className="relative w-full h-48">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover pointer-events-none"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={85}
                    priority={project.relevance > 5}
                    loading="eager"
                  />
                </div>
                <div
                  className={`p-3 ${
                    selectedProject?.id === project.id
                      ? "bg-blue-900"
                      : "bg-gray-800"
                  }`}
                >
                  <h3
                    className="text-lg font-semibold text-white truncate"
                    title={project.title}
                  >
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap mt-2 mb-1">
                    {project.tags.slice(0, 3).map((tagKey) => (
                      <span
                        key={tagKey}
                        className={`${TAGS[tagKey].color} text-white text-xs px-2 py-1 rounded mr-2 mb-1`}
                      >
                        {TAGS[tagKey].name}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-gray-400 text-xs py-1 mb-1">
                        ...
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    Created:{" "}
                    {project.createdAt instanceof Date && project.createdAt.getTime() !== new Date(0).getTime()
                      ? project.createdAt.toLocaleDateString()
                      : "Loading date..."}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedProject && (
            <div
              className={`bg-gray-800 shadow-lg overflow-y-auto overflow-x-hidden relative ${
                isMobile
                  ? "fixed inset-0 top-[64px] z-40"
                  : "w-[calc(30%-1rem)] sticky"
              }`}
              ref={detailsPanelRef}
              style={{
                top: isMobile ? undefined : `${navbarHeight + 20}px`,
                ...(isMobile
                  ? { height: `calc(100vh - ${navbarHeight}px)` }
                  : { maxHeight: `calc(100vh - ${navbarHeight + 40}px)` }),
              }}
            >
              <button
                onClick={closeProjectDetails}
                className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-700 w-6 h-6 flex items-center justify-center text-sm font-bold z-50 "
                aria-label="Close project details"
              >
                ×
              </button>
              <div className="p-4">
                <div className="relative w-full h-56 bg-black rounded-lg overflow-hidden mb-2">
                  {renderMedia(selectedProject, currentMediaIndex, false)}
                </div>
                <div
                  ref={mediaThumbnailsContainerRef}
                  className="py-2 px-1 overflow-x-auto whitespace-nowrap thumbnail-scrollbar"
                >
                  {selectedProject.videoUrls?.map((videoUrl, videoIdx) => {
                      const videoId = videoUrl.split("v=")[1]?.split("&")[0];
                      return (
                        <div
                          key={`video-thumb-${selectedProject.id}-${videoIdx}`}
                          className={`inline-block align-top w-28 h-20 mr-1 cursor-pointer rounded-md overflow-hidden relative ${
                            currentMediaIndex === videoIdx ? "ring-2 ring-blue-500" : "ring-1 ring-gray-700 hover:ring-gray-500"
                          }`}
                          onClick={() => {
                            setVideoCurrentTime(0);
                            setIsVideoPlaying(true);
                            setCurrentMediaIndex(videoIdx);
                          }}
                          title={`${selectedProject.title} - Video ${videoIdx + 1}`}
                        >
                          {videoId ? (
                            <Image src={`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`} alt="Video thumbnail" fill className="object-cover pointer-events-none" quality={75} sizes="112px" />
                          ) : (
                            <div className="w-full h-full bg-gray-700 flex items-center justify-center pointer-events-none">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white"><path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.279 20.001c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" /></svg>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-10 transition-opacity pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white opacity-75"><path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.279 20.001c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" /></svg>
                          </div>
                        </div>
                      );
                    })}
                  {selectedProject.images.map((imageUrl, imgIdx) => {
                    const overallIndex = (selectedProject.videoUrls?.length || 0) + imgIdx;
                    return (
                      <div
                        key={`img-thumb-${selectedProject.id}-${imgIdx}`}
                        className={`inline-block align-top w-28 h-20 mr-1 cursor-pointer rounded-md overflow-hidden relative ${
                          currentMediaIndex === overallIndex ? "ring-2 ring-blue-500" : "ring-1 ring-gray-700 hover:ring-gray-500"
                        }`}
                        onClick={() => setCurrentMediaIndex(overallIndex)}
                        title={`${selectedProject.title} - Image ${imgIdx + 1}`}
                      >
                        <Image src={imageUrl} alt={`Thumbnail ${imgIdx + 1}`} fill className="object-cover pointer-events-none" sizes="112px" quality={70} />
                      </div>
                    );
                  })}
                </div>
                <h3 className="text-xl font-semibold text-white mt-1 mb-3 break-words">
                  {selectedProject.title}
                </h3>
                <div className="flex flex-wrap mb-3">
                  {selectedProject.tags.map((tagKey) => (
                    <div key={tagKey} className="relative inline-block mr-2 mb-2" onMouseEnter={(e) => handleTagHover(tagKey, e)} onMouseLeave={() => setHoveredTag(null)}>
                      <span className={`${TAGS[tagKey].color} text-white text-xs px-2 py-1 rounded cursor-help`}>{TAGS[tagKey].name}</span>
                    </div>
                  ))}
                </div>
                                <div className="text-gray-300 text-sm mb-2 break-words">
                  {renderFormattedDescription(selectedProject.description)}
                </div>
                <p className="text-gray-400 text-sm mb-5">
                  Created: {selectedProject.createdAt instanceof Date && selectedProject.createdAt.getTime() !== new Date(0).getTime() ? selectedProject.createdAt.toLocaleDateString() : "Loading date..."}
                </p>
                <button
                  onClick={() => handleDownload(selectedProject)}
                  className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm w-full transition-opacity ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
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
        <div className="fixed inset-0 bg-black bg-opacity-95 z-[100] flex flex-col items-center justify-center p-12 animate-fade-in">
          <button onClick={handleCloseFullscreen} className="absolute top-3 right-3 text-white bg-red-500 hover:bg-red-700 w-10 h-10 flex items-center justify-center text-2xl font-bold rounded-full z-[120]" aria-label="Close fullscreen">×</button>
          <div className="relative w-full flex-grow flex items-center justify-center overflow-hidden p-1">
            {renderMedia(selectedProject, currentMediaIndex, true)}
          </div>
          {getTotalMediaCount(selectedProject) > 1 && (
            <div ref={fullscreenMediaThumbnailsContainerRef} className="w-full h-24 bg-black bg-opacity-60 p-2 overflow-x-auto whitespace-nowrap thumbnail-scrollbar flex items-center justify-center shrink-0 space-x-2 z-[110]">
              {selectedProject.videoUrls?.map((videoUrl, videoIdx) => {
                const videoId = videoUrl.split("v=")[1]?.split("&")[0];
                return (
                  <div key={`fs-video-thumb-${selectedProject.id}-${videoIdx}`} className={`inline-block flex-shrink-0 w-24 h-20 cursor-pointer rounded-md overflow-hidden relative align-top ${currentMediaIndex === videoIdx ? "ring-2 ring-blue-400" : "ring-1 ring-gray-600 hover:ring-gray-400"}`} onClick={() => handleFullscreenThumbnailClick(videoIdx)} title={`${selectedProject.title} - Video ${videoIdx + 1}`}>
                    {videoId ? (<Image src={`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`} alt="Video thumbnail" fill className="object-cover pointer-events-none" quality={70} sizes="96px" />)
                     : (<div className="w-full h-full bg-gray-700 flex items-center justify-center pointer-events-none"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white"><path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.279 20.001c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" /></svg></div>)}
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center group-hover:bg-opacity-0 transition-opacity pointer-events-none"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white opacity-60"><path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.279 20.001c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" /></svg></div>
                  </div>);
              })}
              {selectedProject.images.map((imageUrl, imgIdx) => {
                const overallIndex = (selectedProject.videoUrls?.length || 0) + imgIdx;
                return (
                  <div key={`fs-img-thumb-${selectedProject.id}-${imgIdx}`} className={`inline-block flex-shrink-0 w-24 h-20 cursor-pointer rounded-md overflow-hidden relative align-top ${currentMediaIndex === overallIndex ? "ring-2 ring-blue-400" : "ring-1 ring-gray-600 hover:ring-gray-400"}`} onClick={() => handleFullscreenThumbnailClick(overallIndex)} title={`${selectedProject.title} - Image ${imgIdx + 1}`}>
                    <Image src={imageUrl} alt={`Thumbnail ${imgIdx + 1}`} fill className="object-cover pointer-events-none" sizes="96px" quality={70} />
                  </div>);
              })}
            </div>
          )}
        </div>
      )}

      {hoveredTag && (
        <div ref={tooltipRef} className="fixed bg-gray-900 text-white text-xs p-2 rounded z-[130] break-words w-40 shadow-lg pointer-events-none" style={{ left: `${tooltipPosition.x}px`, top: `${tooltipPosition.y}px`, transform: tooltipPosition.alignTop ? "translateY(calc(-100% - 5px))" : "translateY(5px)", transition: "top 0.1s ease-out, left 0.1s ease-out" }}>
          {TAGS[hoveredTag].description.split('\n').map((paragraph, index) => (
            <p key={index} className="tooltip-description-paragraph whitespace-pre-wrap">{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;