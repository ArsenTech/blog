export default function NoSearchResults({tag}: {tag:string}){
     return (
          <>
               <div className="flex flex-col-reverse items-center justify-center gap-6">
                    <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-[32px] font-semibold text-center text-muted-foreground">No results found for {tag}</h2>
                    <p aria-label="shrug" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[86px] font-semibold text-center text-muted-foreground">¯\_(ツ)_/¯</p>
               </div>
               <p className="text-muted-foreground">Please Try again searching with another keywords</p>
          </>
     )
}