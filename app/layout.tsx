import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const kakaoBig = localFont({
  src: [
    { path: "./fonts/KakaoBigSans-Regular.woff2", weight: "400" },
    { path: "./fonts/KakaoBigSans-Bold.woff2", weight: "700" },
  ],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-code",
});

export const metadata: Metadata = {
  title: "intothehead.log",
  description: "Study Log",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              {
                const savedTheme = localStorage.getItem("theme");
                if (savedTheme) {
                  document.documentElement.setAttribute("data-theme", savedTheme);
                }
              }
            `,
          }}
        ></script>
      </head>
      <body className={`${kakaoBig.className} ${jetbrainsMono.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
