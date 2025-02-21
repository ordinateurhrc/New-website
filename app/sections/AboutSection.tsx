"use client";

import { ReactNode, useRef } from "react";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

// Internal dependencies
import { type SectionProps } from "@/app/types";
import useUpdateSelectionInView from "@/utils/useUpdateSelectionInView";

export default function AboutSection({
  containerID,
  content
}: SectionProps): ReactNode {
  const sectionRef = useRef(null);
  useUpdateSelectionInView(sectionRef, "About");

  return (
    <div
      ref={sectionRef}
      id={containerID}
      className="sm:min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] relative z-0 mx-auto min-h-[60vh] w-full max-w-view bg-gpt-darker pb-16 text-white"
    >
      {/* Spacer */}
      <div className="h-[10%] bg-gpt-medium"></div>

      {/* Content */}
      <div className="sm:px-6 md:px-8 lg:px-10 min-h-[70%] bg-gpt-darker px-4">
        <Prompt prompt={content.sections.about.prompt} />
        <Answer answer={content.sections.about.answer} />
      </div>
    </div>
  );
}

function Prompt({ prompt }: { prompt: string }): ReactNode {
  return (
    <div className="sm:py-8 md:py-10 flex gap-2 bg-gpt-darker p-4 py-6">
      <div className="sm:w-[15%] md:w-[10%] flex w-[3%]">
        <FaUserCircle className="text-3xl sm:text-4xl md:text-5xl" />
      </div>
      <div className="grow">
        <p className="sm:text-base md:text-lg text-sm">{prompt}</p>
      </div>
    </div>
  );
}

function Answer({ answer }: { answer: string }): ReactNode {
  return (
    <>
      <div className="justify-content-center flex">
        {" "}
        <Image
          src="/logo.png"
          alt="Ordinateur Logo"
          width={100}
          height={100}
          className="sm:w-64 md:w-64 h-auto w-10"
        />
      </div>
      <div className="sm:py-8 md:py-10 mb-8 flex gap-2 bg-gpt-medium p-4 py-6">
        <div className="flex items-center justify-center"></div>
        <div className="grow">
          <TypeAnimation
            sequence={[500, answer]}
            preRenderFirstString={false}
            speed={60}
            wrapper="p"
            className="sm:text-base md:text-lg text-sm"
          />
        </div>
      </div>
    </>
  );
}

