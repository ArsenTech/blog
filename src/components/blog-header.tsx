import { getBackgroundImage } from "@/lib/utils";

interface BlogHeaderProps{
     title: string;
     description: string;
}
export default function BlogHeader({title, description}: BlogHeaderProps){
     return (
          <section className="text-white flex items-center justify-center flex-col gap-5 h-[40vh] min-h-[500px] px-4 text-center" style={getBackgroundImage()}>
               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">{title}</h1>
               <p className="text-lg sm:text-xl">{description}</p>
          </section>
     )
}