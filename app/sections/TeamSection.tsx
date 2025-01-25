"use client";

import { type ReactNode, useRef } from "react";

// Internal dependencies
import { type SectionProps } from "@/app/types";
import useUpdateSelectionInView from "@/utils/useUpdateSelectionInView";
import TeamCarousel from "@/app/components/TeamCarousel";

export default function TeamSection({
  containerID,
  content
}: SectionProps): ReactNode {
  const sectionRef = useRef(null);
  useUpdateSelectionInView(sectionRef, "Team");


  return (
    <div
      ref={sectionRef}
      id={containerID}
      className="mx-auto flex h-screen w-full max-w-view items-center justify-center bg-retro-light p-4 text-white"
    >
      <TeamCarousel content={content} />
    </div>
  );
}
