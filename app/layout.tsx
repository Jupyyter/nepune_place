import "./globals.css";
import Menu from "@/app/Menu";
import jupiter from "../public/imgs/jupiter.jpg";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "neptune place",
  description: "neptune's personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <body
        className="min-h-screen flex flex-col"
        style={{
          backgroundImage: `url(${jupiter.src})`,
          backgroundSize: "auto 57vh",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top right",
          backgroundAttachment: "fixed",
          backgroundColor: "black",
        }}
      >
        <div className="sticky top-0 z-10 bg-black bg-opacity-75">
          <Menu />
        </div>
        {children}
        <SpeedInsights />
        <footer className="bg-black bg-opacity-25 mt-auto">
          <p className="px-5 py-2 text-xs text-white">
            {" 2024 neptune. i should say something interesting but please don't steal. steal bad. jail."}
          </p>
        </footer>
      </body>
    </html>
  );
}