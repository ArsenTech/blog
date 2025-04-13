import { getBackgroundImage } from "@/lib/utils";

export default function BlogHeader(){
     return (
          <section className="text-white flex items-center justify-center flex-col gap-5 h-[50vh] min-h-[500px] px-4 text-center" style={getBackgroundImage()}>
               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">Blog Name</h1>
               <p className="text-lg sm:text-xl">Blog Description</p>
          </section>
     )
}