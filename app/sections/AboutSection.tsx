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
      className="relative z-0 mx-auto h-[60vh] w-full max-w-view bg-gpt-darker text-white"
    >
      {/* Spacer */}
      <div className="h-[10%] bg-gpt-medium"></div>
      {/* Content */}
      <div className="h-[40%] overflow-hidden bg-gpt-darker font-custom">
        <Prompt prompt={content.sections.about.prompt} />
        <Answer answer={content.sections.about.answer} />
        {/* Dummy element to represent the bottom */}
        <div className="h-4"></div>
      </div>
    </div>
  );
}

function Prompt({ prompt }: { prompt: string }): ReactNode {
  return (
    <div className="flex gap-2 bg-gpt-darker p-4 py-8">
      <div className="flex w-[20%] grow-[2] basis-0 justify-center">
        <FaUserCircle size={30} />
      </div>
      <div className="grow-[10] basis-0">
        <p>{prompt}</p>
      </div>
    </div>
  );
}

function Answer({ answer }: { answer: string }): ReactNode {
  return (
    <div className="mb-4 flex gap-2 bg-gpt-medium p-4 py-8">
      <div className="flex grow-[2] basis-0 items-baseline justify-center pt-2">
        <Image
          src="/logo.png"
          alt="Ordinateur Logo"
          width={30}
          height={30}
          className="h-auto"
        />
      </div>
      <div className="grow-[10] basis-0">
        <TypeAnimation
          sequence={[500, answer]}
          preRenderFirstString={false}
          speed={60}
          wrapper="p"
        />
      </div>
    </div>
  );
}
