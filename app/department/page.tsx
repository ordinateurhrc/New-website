import { type ReactNode } from "react";
import { getContent } from "@/utils/getContent";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import type { NavLink } from "@/app/types";

export default async function Department(): Promise<ReactNode> {
  const content = await getContent();

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Dept", href: "/department" }
  ];

  return (
    <div className="bg-black text-white">
      <Header navLinks={navLinks} />
      <main className="sm:px-32 sm:py-4 md:py-32 mx-auto max-w-4xl px-4 py-56">
        <section className="rounded-xl border border-neutral-700 bg-neutral-900 p-8 shadow-md">
          <h1 className="text-3xl mb-6 text-center font-bold text-teal-400">
            Department of Computer Science
          </h1>
          <p className="mb-5 text-base leading-relaxed text-gray-300">
            A degree in{" "}
            <span className="font-medium text-teal-300">Computer Science</span>{" "}
            provides the needed thrust for aspirants in the field of Information
            Technology. The curriculum includes core subjects like
            <span className="text-teal-300"> Electronics</span>,{" "}
            <span className="text-teal-300">Mathematics</span>,
            <span className="text-teal-300"> Technical Writing</span>, and even
            elements of Commerce and Economics.
          </p>
          <p className="mb-5 text-base leading-relaxed text-gray-300">
            Students can go for higher studies like{" "}
            <span className="text-purple-400">M.Sc.</span>,
            <span className="text-purple-400"> M.C.A.</span>, and{" "}
            <span className="text-purple-400">M.B.A.</span>, or explore
            placement opportunities offered by top companies.
          </p>
          <p className="text-base leading-relaxed text-gray-300">
            Our{" "}
            <span className="font-medium text-pink-300">dedicated faculty</span>{" "}
            guide students through academics, research, and placements. Exposure
            to <span className="text-blue-300">emerging technologies</span>{" "}
            enhances student learning and skills.
          </p>
        </section>
      </main>
      {content && <Footer content={content} />}
    </div>
  );
}
