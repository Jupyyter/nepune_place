"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image"; // Ensure NextImage is imported as Image
import { Maximize2 } from "lucide-react";
import { combineAndDownload, downloadSingleFile } from "./fileUtils";

// --- Interfaces, TAGS, Projects Data, API fetch remain the same ---
interface Tag { name: string; description: string; color: string; }
const TAGS: { [key: string]: Tag } = { UNITY: { name: "Unity", description: "created using Unity engine", color: "bg-green-500" }, GODOT: { name: "Godot", description: "created using Godot engine", color: "bg-blue-700" }, GREENFOOT: { name: "Greenfoot", description: "created using greenfoot 'engine'. since this thing will not let me export any jar or exe file, the only way for you to play this, is directly in greenfoot, so you should download that too if you wanna run this (its disrespectful for the other engines to call this a real game engine)", color: "bg-cyan-900" }, SDL2: { name: "SDL2", description: "created using the SDL2 graphics library", color: "bg-yellow-500" }, SFML: { name: "SFML", description: "created using the SFML graphics library", color: "bg-purple-700" }, LARGE_FILE: { name: "100MB+", description: "the size of the file is greater than 100 MB so github forced my hand to separate it into multiple files and combine them into 1 so i can continue abusing their servers. even after it downloaded, wait until the button on which you pressed to download it stops showing 'processing'", color: "bg-red-500" }, CPP: { name: "C++", description: "developed using C++", color: "bg-blue-900" }, "C#": { name: "C#", description: "developed using C#", color: "bg-purple-900" }, GDSCRIPT: { name: "Gdscript", description: "developed using Gdscript", color: "bg-green-900" }, JAVA: { name: "Java", description: "developed using Java", color: "bg-yellow-900" }, JAVASCRIPT: { name: "JavaScript", description: "developed using JavaScript", color: "bg-yellow-300" }, REACT: { name: "React", description: "Built with React framework (or library or whatever this is)", color: "bg-cyan-500" }, JAR: { name: "Jar", description: "there will be a jar instead of an executable. clicking on a jar file while in the zip file will only show you the source code, which is ok, but if you want to run the app without compiling it, you should extract it from the zip file", color: "bg-cyan-500" }, };
interface Project { id: number; title: string; thumbnail: string; description: string; downloadUrls: string[]; tags: (keyof typeof TAGS)[]; createdAt: Date; relevance: number; repoName?: string; images: string[]; videoUrl?: string; }
import jhonnyImg from "/public/imgs/jhonny.png"; import badAppleImg from "/public/imgs/badApple.png"; import gabrielImg from "/public/imgs/GabrielIsHungry.png"; import bingChillingImg from "/public/imgs/bingChilling.png"; import shadowGangImg from "/public/imgs/shadowGang.png"; import cppGameImg from "/public/imgs/cppGame.png"; import checkersImg from "/public/imgs/checkers.png"; import endi from "/public/imgs/endi.png";
const projects: Project[] = [ { id: 0, title: "jhonny", thumbnail: "/imgs/jhonny.png", description: "you play as jhonny and you shoot gangsters. i made possible for a multiplayer game, but since i dont have servers for this, you will have to use hamachi if you dont play multiplayer locally. i also dont recomand shooting until all the players are connected :)", downloadUrls: ["jhonnyGang.zip"], tags: ["UNITY", "C#"], createdAt: new Date(), relevance: 7, repoName: "jhonny", images: Array.from({ length: 4 }, (_, i) => `/imgs/jhonny${i}.png`), }, { id: 1, title: "video in ascii", thumbnail: "/imgs/badApple.png", description: "this thing plays any video in ascii, but the default video is bad apple. yes, now this can be done by an average AI, but i've done this project when AI was like cardboard at coding so i consider this project a decent achievement", downloadUrls: ["asciiVideo.zip", "badApple.zip"], tags: ["CPP", "LARGE_FILE"], createdAt: new Date(), relevance: 8, repoName: "BADAPPLE", images: Array.from({ length: 2 }, (_, i) => `/imgs/BADAPPLE${i}.png`), videoUrl: "https://www.youtube.com/watch?v=qeyVAu1uZMM", }, { id: 2, title: "gabriel the hungry", thumbnail: "/imgs/GabrielIsHungry.png", description: "this is the story of gabriel", downloadUrls: [`gabrielIsHungry.zip`, "gabrielIsHungry0.zip"], tags: ["GODOT", "GDSCRIPT", "LARGE_FILE"], createdAt: new Date(), relevance: 6, repoName: "I-am-hungry-and-my-name-is-Gabriel", images: Array.from( { length: 6 }, (_, i) => `/imgs/GabrielIsHungry${i}.png` ), }, { id: 3, title: "fight Jhon Cena", thumbnail: bingChillingImg.src, description: "i like undertale. because of that, i made a game in which you fight john cena in an undertale-style fight", downloadUrls: [`bingChilling.zip`], tags: ["UNITY", "C#"], createdAt: new Date(), relevance: 2, repoName: "fightJohnCena", images: Array.from({ length: 4 }, (_, i) => `/imgs/bingChilling${i}.png`), videoUrl: "https://www.youtube.com/watch?v=iry5H_MSQkA", }, { id: 4, title: "shadow wizzard money gang", thumbnail: shadowGangImg.src, description: "i made this with a classmate (code: 95% me, art: 1% me ) for a contest. unfortunately the contest required the usage of 'greenfoot'. the creation date shown here is wrong (the github api shows the date on which the repository was created, and i had to fork this project from my classmate for the api to work, so it shows the date on which i forked the project, true date: i dont remember, but it was 2024 :) )", downloadUrls: [`shadowGang.zip`], tags: ["GREENFOOT", "JAVA"], createdAt: new Date(), relevance: 4, repoName: "WizardGang", images: Array.from({ length: 7 }, (_, i) => `/imgs/WizardGang${i}.png`), videoUrl: "https://www.youtube.com/watch?v=5HtLpXKm7Uc", }, { id: 5, title: "the 3 room adventure", thumbnail: cppGameImg.src, description: "a simple project made in c++ using sdl2 instead of a game engine", downloadUrls: [`cppGame2.zip`, "cppGame3.zip"], tags: ["CPP", "SDL2", "LARGE_FILE"], createdAt: new Date(), relevance: 1, repoName: "project-rpg", images: Array.from({ length: 4 }, (_, i) => `/imgs/3roomAdventure${i}.png`), }, { id: 6, title: "checkers", thumbnail: checkersImg.src, description: "checkers", downloadUrls: [`worldOfTanks.jar`], tags: ["JAVA", "JAR"], createdAt: new Date(), relevance: 5, repoName: "checkers", images: Array.from({ length: 5 }, (_, i) => `/imgs/checkers${i}.png`), }, { id: 7, title: "i dont wanna be a bunny anymore", thumbnail: endi.src, description: "you fight ikeaMan. i recomand you extract the files from the zip file if you wanna use the leveleditor properly", downloadUrls: ["ikeaBattle0.zip", "ikeaBattle1.zip"], tags: ["CPP", "SFML", "LARGE_FILE"], createdAt: new Date(), relevance: 9, repoName: "99layers", images: [ "/imgs/jhonny0.png", "/imgs/jhonny1.png", "/imgs/jhonny2.png", "/imgs/jhonny3.png", ], }, { id: 8, title: "the road", thumbnail: "/imgs/THEROAD.jpg", description: "just a parallax effect", downloadUrls: ['road.zip'], tags: ["GODOT", "GDSCRIPT"], createdAt: new Date(), relevance: 0, /*repoName: "99layers",*/ images: [ "/imgs/the road0.png", "/imgs/the road1.png", ], }, ];
type SortOption = "relevance" | "date";
const sortButtonOptions: { value: SortOption; label: string }[] = [{ value: "relevance", label: "Relevance" },{ value: "date", label: "The Latest" }, ];
const GITHUB_USERNAME = "Jupyyter"; const GITHUB_API_BASE = "https://api.github.com";
async function fetchRepoCreationDate(repoName: string): Promise<Date | null> { try { const response = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}`, { headers: { Accept: "application/vnd.github.v3+json" } }); if (!response.ok) { console.error(`Failed to fetch repo data for ${repoName}: ${response.status}`); return null; } const data = await response.json(); return new Date(data.created_at); } catch (error) { console.error(`Error fetching repo data for ${repoName}:`, error); return null; } }

function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredTag, setHoveredTag] = useState<keyof typeof TAGS | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, alignTop: false });
  const [isMobile, setIsMobile] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("relevance");
  const [projectsWithDates, setProjectsWithDates] = useState(projects);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);

  const detailsPlayerRef = useRef<any>(null);
  const fullscreenPlayerRef = useRef<any>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const detailsPanelRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const navbarHeight = 64;

  // --- Helper functions remain the same ---
  const getTotalMediaCount = (project: Project) => project.images.length + (project.videoUrl ? 1 : 0);
  const isCurrentMediaVideo = (project: Project, index: number) => project.videoUrl && index === 0;

  // --- Fetching, Sorting, Media Nav, Project Change Effects remain the same ---
  useEffect(() => { const fetchDates = async () => { const updatedProjects = await Promise.all( projects.map(async (project) => { if (project.repoName) { const createdAt = await fetchRepoCreationDate(project.repoName); return createdAt ? { ...project, createdAt } : project; } return project; }) ); setProjectsWithDates(updatedProjects); }; fetchDates(); }, []);
  const sortedProjects = [...projectsWithDates].sort((a, b) => { switch (sortOption) { case "date": return b.createdAt.getTime() - a.createdAt.getTime(); case "relevance": return b.relevance - a.relevance; default: return 0; } });
  const handleNextMedia = () => { if (selectedProject) { const totalCount = getTotalMediaCount(selectedProject); setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % totalCount); } };
  const handlePreviousMedia = () => { if (selectedProject) { const totalCount = getTotalMediaCount(selectedProject); setCurrentMediaIndex((prevIndex) => (prevIndex === 0 ? totalCount - 1 : prevIndex - 1)); } };
  useEffect(() => { setCurrentMediaIndex(0); if (detailsPlayerRef.current?.destroy) { detailsPlayerRef.current.destroy(); detailsPlayerRef.current = null; } if (fullscreenPlayerRef.current?.destroy) { fullscreenPlayerRef.current.destroy(); fullscreenPlayerRef.current = null; } if (playerReady && selectedProject && selectedProject.videoUrl && currentMediaIndex === 0) { createPlayer(`youtube-iframe-details-${selectedProject.id}`, detailsPlayerRef); } }, [selectedProject, playerReady]);

  // --- Mobile Responsiveness & Grid Layout Effect remain the same ---
   useEffect(() => { const checkMobile = () => setIsMobile(window.innerWidth < 768); const handleResize = () => { checkMobile(); if (projectsContainerRef.current) { const containerWidth = projectsContainerRef.current.offsetWidth; const columns = Math.max(1, Math.floor(containerWidth / 300)); projectsContainerRef.current.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`; } }; checkMobile(); handleResize(); window.addEventListener("resize", handleResize); return () => window.removeEventListener("resize", handleResize); }, []);

  // --- Wheel Event Effect remains the same ---
  useEffect(() => { const detailsPanel = detailsPanelRef.current; if (!detailsPanel) return; const handleWheel = (e: WheelEvent) => { const panel = e.currentTarget as HTMLDivElement; if (panel.scrollHeight > panel.clientHeight) { if ((e.deltaY < 0 && panel.scrollTop > 0) || (e.deltaY > 0 && panel.scrollTop < panel.scrollHeight - panel.clientHeight)) { e.stopPropagation(); } else { e.preventDefault(); } } }; detailsPanel.addEventListener("wheel", handleWheel, { passive: false }); return () => detailsPanel.removeEventListener("wheel", handleWheel); }, [selectedProject]);

  // --- Click Handlers remain the same ---
  const handleProjectClick = (project: Project) => { if (project.id !== selectedProject?.id) { setSelectedProject(project); setIsFullscreen(false); } };
  const closeProjectDetails = () => { setSelectedProject(null); setIsFullscreen(false); };
  const handleDownload = (project: Project) => { setIsLoading(true); if (project.downloadUrls.length === 1) { const fileName = project.downloadUrls[0].split("/").pop() || `${project.title}.zip`; downloadSingleFile(project.downloadUrls[0], fileName, setIsLoading); } else { combineAndDownload(project, setIsLoading); } };
  const handleTagHover = (tagKey: keyof typeof TAGS, event: React.MouseEvent<HTMLDivElement>) => { setHoveredTag(tagKey); const tagRect = event.currentTarget.getBoundingClientRect(); const tooltipWidth = 160; const windowHeight = window.innerHeight; let x = tagRect.left; let y = tagRect.bottom + 5; let alignTop = false; if (y + (tooltipRef.current?.offsetHeight || 100) > windowHeight && tagRect.top > tagRect.bottom) { y = tagRect.top - 5; alignTop = true; } if (x + tooltipWidth > window.innerWidth) { x = window.innerWidth - tooltipWidth - 10; } if (x < 0) { x = 10; } setTooltipPosition({ x, y, alignTop }); };
  const handleSortChange = (option: SortOption) => { setSortOption(option); setSelectedProject(null); };

 // --- YouTube API Loading Effect remains the same ---
 useEffect(() => { if (!(window as any).YT || !(window as any).YT.Player) { const tag = document.createElement('script'); tag.src = 'https://www.youtube.com/iframe_api'; document.body.appendChild(tag); (window as any).onYouTubeIframeAPIReady = () => { setPlayerReady(true); }; } else { setPlayerReady(true); } return () => { if (typeof (window as any).onYouTubeIframeAPIReady === 'function') { delete (window as any).onYouTubeIframeAPIReady; }}; }, []);

  // --- Player Creation Function remains the same ---
  const createPlayer = (elementId: string, playerRef: React.MutableRefObject<any>, onReadyCallback?: (event: any) => void) => { if (!playerReady || !document.getElementById(elementId)) return; if (playerRef.current?.destroy) { try { playerRef.current.destroy(); } catch (e) { console.error(e); } playerRef.current = null; } playerRef.current = new (window as any).YT.Player(elementId, { events: { 'onReady': (event: any) => { if (onReadyCallback) onReadyCallback(event); }, 'onError': (event: any) => { console.error(`YT Error ${elementId}:`, event.data); }, } }); };

  // --- Details Player Init Effect remains the same ---
  useEffect(() => { if (playerReady && selectedProject && selectedProject.videoUrl && currentMediaIndex === 0 && !isFullscreen) { const detailsElementId = `youtube-iframe-details-${selectedProject.id}`; if (document.getElementById(detailsElementId) && (!detailsPlayerRef.current || detailsPlayerRef.current.getIframe()?.id !== detailsElementId)) { createPlayer(detailsElementId, detailsPlayerRef); } } return () => { if (detailsPlayerRef.current && (!selectedProject || currentMediaIndex !== 0)) { if (detailsPlayerRef.current?.destroy) detailsPlayerRef.current.destroy(); detailsPlayerRef.current = null; } }; }, [playerReady, selectedProject, currentMediaIndex, isFullscreen]);

  // --- Fullscreen Player Management Effect remains the same ---
  useEffect(() => { if (isFullscreen && playerReady && selectedProject && selectedProject.videoUrl && currentMediaIndex === 0) { const fullscreenElementId = `youtube-iframe-fullscreen-${selectedProject.id}`; const checkAndCreate = () => { if (document.getElementById(fullscreenElementId)) { createPlayer(fullscreenElementId, fullscreenPlayerRef, (event) => { event.target.seekTo(videoCurrentTime, true); event.target.playVideo(); }); } else { setTimeout(checkAndCreate, 100); } }; checkAndCreate(); } return () => { if (fullscreenPlayerRef.current?.destroy) { fullscreenPlayerRef.current.destroy(); fullscreenPlayerRef.current = null; } }; }, [isFullscreen, playerReady, selectedProject, videoCurrentTime]);

 // --- handleMediaClick for entering fullscreen remains the same ---
 const handleMediaClick = () => { if (!selectedProject) return; if (isCurrentMediaVideo(selectedProject, currentMediaIndex)) { const player = detailsPlayerRef.current; if (player && typeof player.getCurrentTime === 'function' && typeof player.pauseVideo === 'function') { const currentTime = player.getCurrentTime(); setVideoCurrentTime(currentTime); player.pauseVideo(); setIsFullscreen(true); } else { setVideoCurrentTime(0); setIsFullscreen(true); } } else { setIsFullscreen(true); } };

// --- handleCloseFullscreen for exiting fullscreen remains the same ---
const handleCloseFullscreen = () => { let lastFullscreenTime = videoCurrentTime; if (fullscreenPlayerRef.current && typeof fullscreenPlayerRef.current.getCurrentTime === 'function') { try { lastFullscreenTime = fullscreenPlayerRef.current.getCurrentTime(); if (typeof fullscreenPlayerRef.current.pauseVideo === 'function') { fullscreenPlayerRef.current.pauseVideo(); } } catch (e) { console.error("Error getting/pausing fullscreen player time:", e); } } else { console.warn("Fullscreen player not available to get time on close."); } setVideoCurrentTime(lastFullscreenTime); setIsFullscreen(false); setTimeout(() => { const detailsPlayer = detailsPlayerRef.current; if (detailsPlayer && typeof detailsPlayer.seekTo === 'function' && typeof detailsPlayer.playVideo === 'function' && selectedProject && isCurrentMediaVideo(selectedProject, currentMediaIndex) ) { const detailsElementId = `youtube-iframe-details-${selectedProject.id}`; if(detailsPlayer.getIframe()?.id === detailsElementId) { detailsPlayer.seekTo(lastFullscreenTime, true); detailsPlayer.playVideo(); } else { console.warn("Details player ref mismatch after closing fullscreen."); } } else { console.log("Details player not available or not a video after closing fullscreen, or playVideo not ready."); } }, 100); };

  // *** NEW: useEffect to preload images for the selected project ***
  useEffect(() => {
    if (selectedProject && selectedProject.images && selectedProject.images.length > 0) {
      selectedProject.images.forEach(imageUrl => {
        if (imageUrl && typeof imageUrl === 'string') {
          const img = new window.Image(); // Use window.Image to avoid conflict with NextImage
          img.src = imageUrl;
        }
      });
    }
  }, [selectedProject]); // Re-run when selectedProject changes

// --- Render Media Function ---
const renderMedia = (project: Project, index: number, inFullscreen: boolean = false) => {
    const isVideo = isCurrentMediaVideo(project, index);
    const baseId = inFullscreen ? `youtube-iframe-fullscreen-${project.id}` : `youtube-iframe-details-${project.id}`;
    const commonClasses = inFullscreen ? "object-contain rounded-lg max-w-full max-h-full" : "object-cover rounded-lg";

    if (isVideo && project.videoUrl) {
      const videoId = project.videoUrl.split("v=")[1]?.split("&")[0];
      if (!videoId) return <div>Error: Invalid Video URL</div>;
      const iframeKey = `${baseId}-${project.id}`;

      return (
        <div className={`relative w-full h-full ${!inFullscreen ? 'aspect-video' : ''}`}>
          <iframe key={iframeKey} id={baseId} src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&modestbranding=1&fs=0&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`} title={project.title} className={`${commonClasses} w-full h-full`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={false} />
          {!inFullscreen && ( <button onClick={handleMediaClick} className="absolute bottom-2 right-2 bg-black bg-opacity-50 p-2 rounded-lg hover:bg-opacity-70 transition-opacity" title="Enter fullscreen" aria-label="Enter fullscreen for video" > <Maximize2 className="w-5 h-5 text-white" /> </button> )}
        </div>
      );
    } else {
      const imageIndex = project.videoUrl ? index - 1 : index;
      if (imageIndex < 0 || imageIndex >= project.images.length) { return <div>Error: Image not found</div>; }
      const imageUrl = project.images[imageIndex];

      // *** MODIFIED: Determine if this image should be prioritized ***
      // 'index' here is currentMediaIndex.
      // It should be prioritized if it's an image being shown (i.e., not a video)
      // OR if it's in fullscreen.
      const shouldPrioritize = inFullscreen || !isCurrentMediaVideo(project, index);

      return (
        <div className={`relative ${inFullscreen ? 'w-full h-full flex items-center justify-center' : 'w-full h-56'} ${!inFullscreen ? 'cursor-pointer' : ''}`} onClick={!inFullscreen ? handleMediaClick : undefined} role={!inFullscreen ? 'button' : undefined} aria-label={!inFullscreen ? 'View image fullscreen' : undefined} >
          <Image // Using Next.js Image component
            src={imageUrl}
            alt={`${project.title} - Image ${imageIndex + 1}`}
            fill={!inFullscreen}
            width={inFullscreen ? 1200 : undefined}
            height={inFullscreen ? 900 : undefined}
            className={`${commonClasses} ${inFullscreen ? 'relative w-auto h-auto max-w-full max-h-full' : ''}`}
            sizes={inFullscreen ? "95vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            quality={inFullscreen ? 95 : 85}
            priority={shouldPrioritize} // *** MODIFIED LINE ***
            unoptimized={false}
          />
        </div>
      );
    }
  };


  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-2 pt-8">
      <div className="w-full max-w-7xl px-4 flex flex-col items-center">
        {/* Header */}
        <header className="text-center mb-8 w-full">
           <h1 className="text-4xl font-bold mb-4 break-words">My Projects</h1>
           <p className="text-lg mb-4 break-words whitespace-pre-wrap max-w-full"> projects here and there and here and everywhere </p>
           <div className="flex justify-center items-center gap-4 mb-4 flex-wrap"> <span className="text-gray-300">Sorting by:</span> <div className="flex gap-4 flex-wrap"> {sortButtonOptions.map(({ value, label }) => ( <button key={value} onClick={() => handleSortChange(value)} className={`px-4 py-2 rounded-lg ease-in-out ${ sortOption === value ? "bg-purple-900 text-white hover:bg-purple-700" : "bg-gray-700 text-gray-300 hover:bg-gray-600" }`} > {label} </button> ))} </div> </div>
        </header>

        {/* Main Content */}
        <div className="flex justify-between w-full relative gap-8" ref={projectsContainerRef} >
          {/* Projects Grid */}
          <div className={`grid gap-8 ${ selectedProject && !isMobile ? "w-[calc(70%-1rem)]" : "w-full" }`} style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", }} >
             {sortedProjects.map((project) => ( <div key={project.id} className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer select-none hover:scale-105 ${ selectedProject?.id === project.id ? "ring-2 ring-blue-500 scale-105" : "" }`} onClick={() => handleProjectClick(project)} onDragStart={(e) => e.preventDefault()} style={{ maxHeight: "400px" }} > <div className="relative w-full h-48"> <Image src={project.thumbnail} alt={project.title} fill className="object-cover pointer-events-none" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" quality={85} priority={project.relevance > 5} loading="eager" /> </div> <div className={`p-3 ${selectedProject?.id === project.id ? "bg-blue-900" : "bg-gray-800"}`}> <h3 className="text-lg font-semibold text-white truncate" title={project.title}> {project.title} </h3> <div className="flex flex-wrap mt-2 mb-1"> {project.tags.slice(0, 3).map((tagKey) => ( <span key={tagKey} className={`${TAGS[tagKey].color} text-white text-xs px-2 py-1 rounded mr-2 mb-1`} > {TAGS[tagKey].name} </span> ))} {project.tags.length > 3 && ( <span className="text-gray-400 text-xs py-1 mb-1">...</span> )} </div> <div className="text-sm text-gray-400 mt-1"> Created: {project.createdAt.toLocaleDateString()} </div> </div> </div> ))}
          </div>

          {/* Details Panel */}
          {selectedProject && (
            <div
              className={`bg-gray-800 shadow-lg overflow-y-auto overflow-x-hidden relative ${
                isMobile ? "fixed inset-0 top-[64px] z-40" : "w-[calc(30%-1rem)] sticky"
              }`}
              ref={detailsPanelRef}
              style={{
                top: isMobile ? undefined : `${navbarHeight + 20}px`,
                ...(isMobile
                  ? { height: `calc(100vh - ${navbarHeight}px)` } // For mobile, keep existing height behavior
                  : { maxHeight: `calc(100vh - ${navbarHeight + 40}px)` } // For desktop, use maxHeight
                )
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
                <div className="relative w-full h-56 mb-4 bg-black rounded-lg overflow-hidden">
                  {renderMedia(selectedProject, currentMediaIndex, false)}

                   {getTotalMediaCount(selectedProject) > 1 && (
                     <>
                        <button
                            onClick={handlePreviousMedia}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-yellow-600 bg-opacity-70 text-white hover:bg-white hover:bg-opacity-80 hover:text-black p-2 rounded-r-lg z-10"
                            aria-label="Previous media"
                            >
                            ‹
                        </button>
                        <button
                            onClick={handleNextMedia}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-yellow-600 bg-opacity-70 text-white hover:bg-white hover:bg-opacity-80 hover:text-black p-2 rounded-l-lg z-10"
                            aria-label="Next media"
                            >
                            ›
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded z-10 pointer-events-none">
                            {currentMediaIndex + 1} / {getTotalMediaCount(selectedProject)}
                        </div>
                     </>
                   )}
                   {isCurrentMediaVideo(selectedProject, currentMediaIndex) && !isFullscreen && (
                       <button onClick={handleMediaClick} className="absolute bottom-2 right-2 bg-black bg-opacity-50 p-2 rounded-lg hover:bg-opacity-70 transition-opacity z-20" title="Enter fullscreen" aria-label="Enter fullscreen for video" >
                           <Maximize2 className="w-5 h-5 text-white" />
                       </button>
                   )}
                </div>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4 break-words"> {selectedProject.title} </h3>
                <div className="flex flex-wrap mb-3"> {selectedProject.tags.map((tagKey) => ( <div key={tagKey} className="relative inline-block mr-2 mb-2" onMouseEnter={(e) => handleTagHover(tagKey, e)} onMouseLeave={() => setHoveredTag(null)} > <span className={`${TAGS[tagKey].color} text-white text-xs px-2 py-1 rounded cursor-help`} > {TAGS[tagKey].name} </span> </div> ))} </div>
                <p className="text-gray-300 text-sm mb-2 break-words whitespace-pre-wrap"> {selectedProject.description} </p>
                <p className="text-gray-400 text-sm mb-5"> Created: {selectedProject.createdAt.toLocaleDateString()} </p>
                <button onClick={() => handleDownload(selectedProject)} className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm w-full transition-opacity ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isLoading} > {isLoading ? "Processing..." : "Download"} </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isFullscreen && selectedProject && ( <div className="fixed inset-0 bg-black bg-opacity-95 z-[100] flex items-center justify-center p-4 animate-fade-in"> <style jsx global>{` @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } } .animate-fade-in { animation: fade-in 0.3s ease-out forwards; } `}</style> <button onClick={handleCloseFullscreen} className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-700 w-10 h-10 flex items-center justify-center text-2xl font-bold rounded-full z-[110] " aria-label="Close fullscreen" > × </button> <div className="relative w-[95vw] h-[95vh] flex items-center justify-center"> <div className="relative w-full h-full flex items-center justify-center"> {renderMedia(selectedProject, currentMediaIndex, true)} </div> {getTotalMediaCount(selectedProject) > 1 && ( <> <button onClick={handlePreviousMedia} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-yellow-500 bg-opacity-40 hover:bg-opacity-60 text-white p-4 rounded-full z-[110] text-3xl transition-opacity" aria-label="Previous media" > ‹ </button> <button onClick={handleNextMedia} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-yellow-500 bg-opacity-40 hover:bg-opacity-60 text-white p-4 rounded-full z-[110] text-3xl transition-opacity" aria-label="Next media" > › </button> </> )} </div> </div> )}

      {hoveredTag && ( <div ref={tooltipRef} className="fixed bg-gray-900 text-white text-xs p-2 rounded z-[120] break-words w-40 shadow-lg pointer-events-none" style={{ left: `${tooltipPosition.x}px`, top: `${tooltipPosition.y}px`, transform: tooltipPosition.alignTop ? 'translateY(calc(-100% - 5px))' : 'translateY(5px)', transition: 'top 0.1s ease-out, left 0.1s ease-out', }} > {TAGS[hoveredTag].description} </div> )}
    </div>
  );
}

export default Projects;