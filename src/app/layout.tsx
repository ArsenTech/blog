import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { KEYWORDS } from "@/lib/constants";
import { Toaster } from "@/components/ui/sonner";
import { absoluteURL } from "@/lib/helpers/seo";

const sora = Sora({
  variable: "--font-sora",
  fallback: ["system-ui", "Segoe UI", 'Segoe UI', "Roboto", "Oxygen", "Ubuntu", "Cantarell", 'Open Sans', 'Helvetica Neue', "Tahoma", "Geneva", "Verdana", "Arial", "Helvetica", "sans-serif"],
  subsets: ['latin',"latin-ext"]
})

export const metadata: Metadata = {
  metadataBase: new URL(absoluteURL()),
  title: {
    template: "%s | ArsenTech Blog",
    absolute: "Blog | ArsenTech's Website"
  },
  description: "Welcome to ArsenTech's Official Blog Website — your go-to hub for tech tutorials, antivirus comparisons, and in-depth guides for programmers, tech enthusiasts, and more tech related curious minds.",
  authors: {
    name: "ArsenTech",
    url: "https://arsentech.github.io/"
  },
  keywords: KEYWORDS,
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/app-icon.png", sizes: "192x192", type: "image/png"}
    ],
    apple: "/app-icon.png"
  },
  manifest: "/manifest.json",
  verification: {
    google: "fO_3worN0840UBpRpX9H9HVtu-U2Z3y5LFJT5qzXpUE" 
  },
  alternates: {
    canonical: absoluteURL("/")
  },
  openGraph: {
    title: "ArsenTech's Official Blog Website",
    description: "Your go-to hub for tech tutorials, antivirus comparisons, and in-depth guides for programmers, tech enthusiasts, and more tech related curious minds.",
    url: absoluteURL("/"),
    siteName: "ArsenTech Blog",
    locale: "en_US",
    type: "website",
    images: {
      url: "/og.png",
      width: 1200,
      height: 630
    }
  },
  twitter: {
    images: [{
      url: "/og.png",
      width: 1200,
      height: 630
    }],
    card: "summary_large_image",
    title: "ArsenTech's Official Blog Website",
    description: "Your go-to hub for tech tutorials, antivirus comparisons, and in-depth guides for programmers, tech enthusiasts, and more tech related curious minds.",
  },
};

export const viewport: Viewport = {
  themeColor: "#22b455"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
