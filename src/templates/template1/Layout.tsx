import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Suspense } from "react";
import { PageSkeleton } from "@/components/skeleton";
import { Toaster } from "react-hot-toast";

export default function Layout() {
  return (
    <div className="w-screen h-screen flex flex-col bg-background text-foreground">
      <Header />
      <div className="flex-1 overflow-y-auto">
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
