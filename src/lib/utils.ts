import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const isProd = process.env.NODE_ENV === "production"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isChristmas() {
  const today = new Date();
  const month = today.getMonth() + 1,day = today.getDate();
  return (month === 12 && day >= 1) || (month === 1 && day <= 8);
}

/**
 * Function To Return Absolute Public Image Path.
 * Path Should Start With Slash (/)
 */
export function absolutePath(path: string){
  const basePath = isProd ? "/blog" : "";
  return `${basePath}${path}`
}

export const getBackgroundImage = (suffix: "app" | "footer" = "app"): React.CSSProperties => {
  const gradient = suffix === "app" ? "linear-gradient(#20482945,#1dd1a188)" : "linear-gradient(#20482945,#20482945)"
  const backgroundImage = isChristmas() ? `${gradient},url(${absolutePath("/backgrounds/bg-christmas.webp")})` : `${gradient},url(${absolutePath("/backgrounds/bg.webp")})`
  return {
    backgroundImage,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    backgroundSize: "cover"
  }
}

export const getInitialLogo = (theme: string | undefined) => theme==="dark" ? absolutePath("/arsentech-dark.svg") : absolutePath("/arsentech-light.svg")