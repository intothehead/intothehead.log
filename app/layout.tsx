import type { Metadata } from "next";
import { JetBrains_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const notoSans = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
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
      <body className={`${notoSans.className} ${jetbrainsMono.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
