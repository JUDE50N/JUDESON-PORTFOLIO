import { Hexagon, Target, Zap } from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-[#D4D4D4] font-sans selection:bg-[#D4D4D4] selection:text-black p-6 md:p-12 lg:p-20 flex flex-col justify-between relative overflow-hidden">
      {/* Background subtle noise or grain could be added here if needed, but keeping it clean black as per image */}
      
      {/* Top Section */}
      <div className="flex justify-between items-start z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter uppercase mb-8">
              JUDESON // <br />
              WEB & APP <br />
              DEVELOPER
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-md leading-relaxed mb-10">
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
                  className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:border-gray-500 transition-colors cursor-pointer group"
                >
                  <Icon size={20} className="text-gray-500 group-hover:text-white transition-colors" />
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
          className="flex items-center gap-4 font-display text-[10px] md:text-[11px] tracking-[0.3em] z-20"
        >
          <div className="flex gap-4">
            <span className="text-gray-500 uppercase">Next</span>
            <span className="text-[#D4D4D4] uppercase hover:text-white cursor-pointer transition-colors">Page</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col items-end gap-12 z-10">
        {/* Technical Specs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-md"
        >
          <h3 className="font-display text-xs tracking-[0.3em] uppercase text-gray-500 mb-6">Technical Specs</h3>
          <div className="space-y-4">
            {[
              { label: "Frontend", value: "Next.js / React" },
              { label: "Mobile", value: "React Native / Expo" },
              { label: "Backend", value: "Node.js / Firebase" },
              { label: "Tools", value: "TypeScript / Tailwind" },
            ].map((spec, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-end pb-2">
                  <span className="text-gray-500 text-lg">{spec.label}</span>
                  <span className="text-xl font-medium">{spec.value}</span>
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
          className="flex flex-wrap justify-end gap-3"
        >
          {["NEXT.JS", "REACT NATIVE", "TYPESCRIPT", "FULL-STACK"].map((tag, i) => (
            <div 
              key={i}
              className={`
                px-6 py-2 rounded-full border border-gray-800 text-[10px] tracking-[0.2em] font-display uppercase
                ${i === 0 ? 'rounded-r-none border-r-0' : ''}
                ${i === 1 ? 'rounded-l-none' : ''}
                hover:border-gray-500 hover:text-white transition-all cursor-default
              `}
            >
              {tag}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Background Elements (Subtle) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
      </div>
    </div>
  );
}
