import { type ReactNode } from "react";
//import Image from "next/image";

// Internal dependencies
import { getContent } from "@/utils/getContent";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import type { NavLink } from "@/app/types";

export default async function _404(): Promise<ReactNode> {
  const content = await getContent();

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Dept", href: "/department" }
  ];

  return (
    <div className="size-full bg-black-medium">
      <Header navLinks={navLinks} />
      <div className="mx-auto flex min-h-screen max-w-view flex-col items-center justify-center gap-2 bg-gpt-darker p-8 text-white">
        <h2 className="font-mono text-heading text-md text-gray-400">
            A degree in Computer Science provides the needed thrust for aspirants
          in the field of Information Technology, with its curricula including
          the core Computer Science subjects along with Electronics,
          Mathematics, Technical Writing, Commerce and Economics. Being a
          pervasive discipline for all science and humanities courses, it
          encourages students to pursue various inter – disciplinary interests.
          Students can pursue various post graduate courses like M.Sc., M.C.A.
          and M.B.A. apart from the choice of taking up placements that are
          offered to them by companies that require their expertise as computer
          science graduates. The well qualified and dedicated faculty provides
          guidance in academics, higher studies, research and placement of our
          students. Exposure to emerging trends and technologies, aids us to
          facilitate growth that strengthens the knowledge base of the students.
        </h2>
      </div>
      {content && <Footer content={content} />}
    </div>
  );
}
