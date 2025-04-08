"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { Content } from "@/app/types";

export default function TeamCarousel({ content }: { content: Content }) {
  const team = useMemo(() => content.sections.team, [content]);
  const totalMembers = team.length;
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentMemberIndex(curr => (curr + 1) % totalMembers);
  }, [totalMembers]);

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const currentMember = useMemo(
    () => team[currentMemberIndex],
    [currentMemberIndex, team]
  );

  if (!currentMember) {
    return <div className="text-white">Loading team...</div>;
  }

  return (
    <div className="bg-black flex min-h-screen w-full flex-col items-center justify-center px-4 text-white">
      <div className="rounded-2xl w-full max-w-md overflow-hidden bg-neutral-900 shadow-2xl">
        <div className="flex flex-col items-center p-6">
          <Image
            src={currentMember.image}
            alt={currentMember.name}
            width={160}
            height={160}
            className="rounded-full border-4 border-white object-cover shadow-lg"
          />
          <h2 className="text-2xl mt-4 font-semibold">{currentMember.name}</h2>
          <h3 className="mb-4 break-words text-center text-lg text-gray-400">
            {currentMember.role}
          </h3>
          <p className="mb-4 text-center text-gray-200">
            {currentMember.description}
          </p>
          <ul className="w-full list-disc space-y-1 pl-5 text-left text-sm text-gray-300">
            {currentMember.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
