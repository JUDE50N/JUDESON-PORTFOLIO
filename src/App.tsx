import { Hexagon, Target, Zap, Instagram, Linkedin, X, MessageCircle, ArrowRight, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef, useCallback } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Hls from "hls.js";

function VideoBackground({ src, onReady }: { src: string; onReady?: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          if (error.name !== 'AbortError') {
            console.error("Video play failed:", error);
          }
        });
      }
    };

    if (Hls.isSupported()) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }

      const hls = new Hls({
        capLevelToPlayerSize: true,
        autoStartLoad: true,
      });
      hlsRef.current = hls;
      
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        handlePlay();
        if (onReadyRef.current) onReadyRef.current();
      });

      return () => {
        hls.destroy();
        hlsRef.current = null;
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      const onMetadata = () => {
        handlePlay();
        if (onReadyRef.current) onReadyRef.current();
      };
      video.addEventListener("loadedmetadata", onMetadata);
      return () => {
        video.removeEventListener("loadedmetadata", onMetadata);
      };
    }
  }, [src]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
      animate={{ opacity: 0.5, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <video
        ref={videoRef}
        muted
        autoPlay
        playsInline
        loop
        className="w-full h-full object-cover"
      />
      {/* Overlay to ensure text readability and cinematic feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80" />
      <div className="absolute inset-0 bg-black/40" />
    </motion.div>
  );
}

export default function App() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const handleVideoReady = useCallback(() => {
    setIsVideoReady(true);
  }, []);

  return (
    <div className="bg-black min-h-screen overflow-hidden relative">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen 
            key="loader" 
            ready={isVideoReady} 
            onComplete={() => setIsLoading(false)} 
          />
        )}
      </AnimatePresence>

      <div 
        className="text-[#D4D4D4] font-sans selection:bg-[#D4D4D4] selection:text-black"
        style={{ 
          opacity: isLoading ? 0 : 1, 
          transition: "opacity 0.5s ease-out",
          pointerEvents: isLoading ? "none" : "auto"
        }}
      >
        <AnimatePresence mode="wait">
        {page === 1 ? (
          <motion.div
            key="page1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="min-h-screen p-6 md:p-12 lg:p-20 flex flex-col justify-between relative"
          >
            <VideoBackground 
              src="https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8" 
              onReady={handleVideoReady}
            />
            
            {/* Top Section */}
            <div className="flex justify-between items-start gap-4 z-10">
              <div className="max-w-[75%] md:max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter uppercase mb-6 md:mb-8">
                    JUDESON // <br />
                    WEB & APP <br />
                    DEVELOPER
                  </h1>
                  
                  <p className="text-base md:text-xl text-gray-400 max-w-md leading-relaxed mb-8 md:mb-10">
                    Skilled web and application developer with expertise in Next.js and React Native. 
                    Building high-performance digital experiences that push the boundaries of the web and mobile.
                  </p>
                  
                  <div className="flex gap-4">
                    {[Hexagon, Target, Zap].map((Icon, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-800 flex items-center justify-center hover:border-gray-500 transition-colors cursor-pointer group"
                      >
                        <Icon size={18} className="text-gray-500 group-hover:text-white transition-colors" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Top Right Navigation */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center gap-2 md:gap-4 font-display text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.3em] z-20 shrink-0"
              >
                <button 
                  onClick={() => setPage(2)}
                  className="flex gap-2 md:gap-4 group cursor-pointer py-2"
                >
                  <span className="text-gray-500 uppercase group-hover:text-gray-300 transition-colors">Next</span>
                  <span className="text-[#D4D4D4] uppercase group-hover:text-white transition-colors">Page</span>
                </button>
              </motion.div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col items-start md:items-end gap-8 md:gap-12 z-10 mt-12 md:mt-0">
              {/* Technical Specs Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-full max-w-md"
              >
                <h3 className="font-display text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-4 md:mb-6">Technical Specs</h3>
                <div className="space-y-3 md:space-y-4">
                  {[
                    { label: "Frontend", value: "Next.js / React" },
                    { label: "Mobile", value: "React Native / Expo" },
                    { label: "Backend", value: "Node.js / Firebase" },
                    { label: "Tools", value: "TypeScript / Tailwind" },
                  ].map((spec, i) => (
                    <div key={i} className="group">
                      <div className="flex justify-between items-end pb-1 md:pb-2">
                        <span className="text-gray-500 text-sm md:text-lg">{spec.label}</span>
                        <span className="text-base md:text-xl font-medium">{spec.value}</span>
                      </div>
                      <div className="h-[1px] bg-gray-800 w-full group-hover:bg-gray-600 transition-colors" />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Bottom Tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex flex-wrap justify-start md:justify-end gap-2 md:gap-3"
              >
                {["NEXT.JS", "REACT NATIVE", "TYPESCRIPT", "FULL-STACK"].map((tag, i) => (
                  <div 
                    key={i}
                    className={`
                      px-4 md:px-6 py-1.5 md:py-2 rounded-full border border-gray-800 text-[9px] md:text-[10px] tracking-[0.2em] font-display uppercase
                      ${i === 0 ? 'md:rounded-r-none md:border-r-0' : ''}
                      ${i === 1 ? 'md:rounded-l-none' : ''}
                      hover:border-gray-500 hover:text-white transition-all cursor-default
                    `}
                  >
                    {tag}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="page2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen p-6 md:p-12 lg:p-16 flex flex-col relative bg-black"
          >
            <VideoBackground src="https://stream.mux.com/QgTir2Bu4u6d01CqyKEBCks68PIm2nCM7vhwXgenS00tw.m3u8" />
            
            {/* Vertical Text Left */}
            <div className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-8">
              <span className="font-display text-[10px] tracking-[0.6em] uppercase vertical-text text-gray-500">Portfolio</span>
              <div className="w-[1px] h-16 bg-gray-800" />
            </div>

            {/* Vertical Text Right */}
            <div className="hidden md:flex absolute right-6 md:right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-8">
              <span className="font-display text-[10px] tracking-[0.6em] uppercase vertical-text text-gray-500">Scroll Down</span>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 md:pt-8">
              {/* Left Column */}
              <div className="lg:col-span-7 relative pt-8 md:pt-12">
                {/* Large Background Number */}
                <span className="absolute -top-10 -left-16 font-display text-[12rem] md:text-[22rem] font-bold text-white/[0.02] leading-none pointer-events-none select-none">01</span>
                
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 1 }}
                  className="relative z-10"
                >
                  <h1 className="font-display text-5xl md:text-8xl lg:text-[10rem] font-bold leading-[0.8] tracking-tighter uppercase mb-10 md:mb-20">
                    WEB & APP <br />
                    DEVELOPER
                  </h1>

                  <div className="max-w-lg">
                    <h2 className="text-2xl md:text-4xl font-medium leading-[1.1] mb-10 md:mb-20 text-white">
                      Crafting high-performance<br />
                      digital solutions.
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                      <div className="space-y-4 md:space-y-6">
                        <div className="h-[2px] bg-[#BFFF00] w-full" />
                        <div className="flex gap-6 items-start">
                          <span className="text-[11px] font-display font-bold text-white">01</span>
                          <p className="text-[11px] text-gray-300 uppercase tracking-[0.15em] leading-relaxed">
                            Expertise in<br />
                            Next.js & React Native
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4 md:space-y-6">
                        <div className="h-[2px] bg-[#BFFF00] w-full" />
                        <div className="flex gap-6 items-start">
                          <span className="text-[11px] font-display font-bold text-white">02</span>
                          <p className="text-[11px] text-gray-300 uppercase tracking-[0.15em] leading-relaxed">
                            Scalable &<br />
                            Performant Apps
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Bottom Left Icons & Back Button */}
            <div className="mt-auto pt-12 md:pt-20 flex justify-between items-end gap-4">
              <div className="flex flex-col gap-4 md:gap-6">
                <span className="font-display text-[10px] tracking-[0.4em] uppercase text-gray-600">Contact Us</span>
                <div className="flex gap-6 md:gap-10 items-center">
                  <Instagram size={18} className="text-gray-600 hover:text-white cursor-pointer transition-colors" />
                  <Linkedin size={18} className="text-gray-600 hover:text-white cursor-pointer transition-colors" />
                  <X size={18} className="text-gray-600 hover:text-white cursor-pointer transition-colors" />
                  <MessageCircle size={18} className="text-gray-600 hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>
              
              <button 
                onClick={() => setPage(1)}
                className="font-display text-[10px] tracking-[0.2em] md:tracking-[0.4em] uppercase text-gray-500 hover:text-white transition-colors cursor-pointer flex items-center gap-2 py-2"
              >
                <ArrowRight size={12} className="rotate-180" /> <span className="hidden sm:inline">Back to</span> Start
              </button>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>

      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
}
