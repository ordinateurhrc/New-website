import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

// Constant(s)
import {
  // ASCII_STRING,
  TERMINAL_PROMPT,
  TERMINAL_COMMAND
} from "@/app/constants";

export default function Terminal(): ReactNode {
  return (
    <div className="relative z-0 mx-4 flex h-3/4 w-full desktop:h-[unset] desktop:max-w-[80%]">
      <motion.div
        className="absolute left-0 top-0 -z-10 size-full origin-top rounded-lg bg-black-dark"
        aria-hidden
        initial={{ scaleY: 0.5, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="size-full flex-col gap-4 p-8 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="flex flex-row-reverse gap-2">
          <div className="h-4 w-4 rounded-full bg-red"></div>
          <div className="h-4 w-4 rounded-full bg-yellow"></div>
          <div className="h-4 w-4 rounded-full bg-green"></div>
        </div>
        <div className="mt-8 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="clip-chevron inline-block h-7 w-36 bg-green">
              <div className="clip-inherit flex h-full w-[95%] items-center justify-center bg-cyan text-center text-black-dark">
                {TERMINAL_PROMPT}
              </div>
            </div>
            <pre className="inline-flex items-center">
              <TypeAnimation
                sequence={[1000, TERMINAL_COMMAND]}
                preRenderFirstString={false}
                speed={30}
                wrapper="span"
              />
            </pre>
          </div>
          <pre className="my-4 text-lime-500">
            <TypeAnimation
              sequence={[2000, "Generating static pages..."]}
              preRenderFirstString={false}
              wrapper="div"
              cursor={false}
            />
            <TypeAnimation
              sequence={[3000, "Building the code..."]}
              preRenderFirstString={false}
              wrapper="div"
              cursor={false}
            />
            <TypeAnimation
              sequence={[5000, "Deploying on port 80..."]}
              preRenderFirstString={false}
              wrapper="div"
              cursor={false}
            />
          </pre>
          <motion.div
            className="bg-gradient mb-8 mt-4 flex w-full flex-col items-center gap-4 self-center"
            aria-hidden
            aria-label="Ordinateur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, ease: "easeInOut", delay: 7 }}
          >
            <div>
              <svg
                viewBox="0 0 400 100"
                xmlns="http://www.w3.org/2000/svg"
                className="sm:max-w-[700x] sm:h-[400px] md:max-w-[600px] lg:max-w-[900px] w-full max-w-[350px]"
              >
                <defs>
                  <linearGradient
                    id="grayGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#A0A0A0" />
                    <stop offset="50%" stopColor="#E0E0E0" />
                    <stop offset="100%" stopColor="#A0A0A0" />
                  </linearGradient>
                </defs>

                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="clamp(60px,6vw, 50px)"
                  fontFamily="'Orbitron', sans-serif"
                  fontWeight="bold"
                  fill="url(#grayGradient)"
                  stroke="#777"
                  strokeWidth="1.5"
                  filter="drop-shadow(2px 2px 5px rgba(255, 255, 255, 0.3))"
                >
                  ORDINATEUR
                </text>
              </svg>
            </div>

            <div className="px-4 text-center text-base">
              The Computer Science Society
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}


