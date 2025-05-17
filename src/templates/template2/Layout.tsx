import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Suspense, useEffect, useState, useRef } from "react";
import { PageSkeleton } from "@/components/skeleton";
import { Toaster } from "react-hot-toast";
import { ScrollRestoration } from "@/components/scroll-restoration";
import clsx from "clsx";

export default function Layout() {
  const [isScrolled, setScrolled] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const node = contentRef.current;
    if (!node || !isHomePage) return;

    const handleScroll = () => {
      const offset = node.scrollTop;
      setScrolled(offset > 16);
    };

    node.addEventListener("scroll", handleScroll);

    return () => {
      node.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  return (
    <div className="w-screen h-screen flex flex-col bg-background text-foreground">
      <div
        className={clsx(
          "fixed top-0 left-0 right-0 z-10 transition-all duration-300 ease-in-out",
          isHomePage
            ? isScrolled
              ? "bg-background shadow-md"
              : "bg-backgroundHero"
            : "bg-background"
        )}
      >
        <Header />
      </div>
      <div ref={contentRef} className="flex-1 overflow-y-auto mt-20">
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
      <Toaster
        containerClassName="toast-container"
        containerStyle={{
          top: "calc(50% - 24px)",
        }}
      />
      <ScrollRestoration />
    </div>
  );
}
