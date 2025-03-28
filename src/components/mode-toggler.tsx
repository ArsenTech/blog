import { useTheme } from "next-themes";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ModeTogglerProps{
     className?: string
}
export default function ModeToggler({className}: ModeTogglerProps){
     const {theme, setTheme} = useTheme();
     const isDark = theme==="dark";
     return (
          <button className={cn("w-[30px] h-[30px] transition-all cursor-pointer",className)} onClick={()=>setTheme(isDark ? "light" : "dark")}>
               <Image src={`/icons/${isDark ? "dark" : "light"}.svg`} alt="mode" width={30} height={30}/>
          </button>
     )
}