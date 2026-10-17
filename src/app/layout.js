import {
  Plus_Jakarta_Sans,
  Inter,
  Hind_Siliguri,
  Noto_Sans_Bengali,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomTabBar from "@/components/layout/BottomTabBar";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const banglaDisplay = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

const banglaBody = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600"],
  variable: "--font-bengali",
  display: "swap",
});

export const metadata = {
  title: "CitySheba — Find it. Compare it. Connect.",
  description:
    "Everyday services, easier to find. Mess & rooms, home repair, hotels, buses, mosques, doctors and tourist places across Bangladesh — in Bangla and English.",
};

export const viewport = {
  themeColor: "#10243A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${banglaDisplay.variable} ${banglaBody.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <BottomTabBar />
      </body>
    </html>
  );
}
