import { useIsMobile } from "@/hooks/use-is-mobile";
import { cn, getInitialLogo } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react"
import NavbarToggler from "@/components/togglers/navbar-toggler";
import ModeToggler from "@/components/togglers/mode-toggler";
import { LINKS } from "@/lib/constants";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Progress } from "../ui/progress";

interface HeaderProps {
     progress?: number;
}
export default function Header({progress}: HeaderProps){
     const {theme, systemTheme} = useTheme()
     const currTheme = theme==="system" ? systemTheme : theme;
     const [isSticky, setIsSticky] = useState(false);
     const [toggled, setToggled] = useState(false);
     const [logoImg, setLogoImg] = useState(getInitialLogo(currTheme))
     useEffect(()=>{
          const handleScroll = () => setIsSticky(window.scrollY > 20)
          window.addEventListener("scroll",handleScroll)
          return () => window.removeEventListener("scroll",handleScroll)
     },[])
     useEffect(()=>{
          setLogoImg(getInitialLogo(currTheme))
     },[currTheme])
     const handleMouseEnter = () => setLogoImg("/arsentech-colorful.svg");
     const handleMouseLeave = () => setLogoImg(getInitialLogo(currTheme))
     const textColorClass = isSticky ? "text-header-foreground" : "text-white"
     const bgColorClass = isSticky ? "bg-header-foreground" : "bg-white";
     const imgColorClass = isSticky ? "invert-image-color" : "invert"
     const isMobile = useIsMobile();
     return (
          <header className={cn(`fixed w-full top-0 left-0 z-20 transition-all border-none`,!isSticky ? "bg-transparent py-[30px]" : "bg-header py-[18px]",textColorClass)}>
               <div className="inner-width flex items-center justify-between">
                    <Link href="/" className={cn(isMobile && "order-[0]")} aria-label="ArsenTech" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                         <Image src={!isSticky ? "/arsentech-dark.svg" : logoImg} alt="logo" width={150} height={32} className="object-contain"/>
                    </Link>
                    {isMobile && (
                         <NavbarToggler
                              onClick={()=>setToggled(!toggled)}
                              lineClass={bgColorClass}
                              className={cn(isMobile && "-order-1")}
                              isActive={toggled}
                         />
                    )}
                    <div className={cn("navbar-menu-mobile md:navbar-menu",isSticky ? "bg-header" : "bg-[#353b48]","md:bg-transparent",toggled ? "left-0" : "-left-full","md:left-0")}>
                         {LINKS.map(({url,name},i)=>(
                              <Link key={i} className={cn("block md:inline text-3xl md:text-base my-[30px] md:my-0 font-medium ml-[30px] transition-all",isSticky ? "hover:text-primary" : 'hover:text-[#92e5a1]')} href={url}>{name}</Link>
                         ))}
                    </div>
                    <ModeToggler
                         className={imgColorClass}
                    />
               </div>
               {!!progress && (
                    <div className="absolute bottom-0 left-0 w-full">
                         <Progress value={progress} className="rounded-none"/>
                    </div>
               )}
          </header>
     )
}
