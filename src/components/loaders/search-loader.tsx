import BlogItemLoader from "./ui/blog-item";
import PaginationLoader from "./ui/pagination";
import SearchLoader from "./ui/search";

export default function SearchResultsLoader({ count = 10 }: { count?: number }){
     return (
          <section className="scroll-mt-10 min-h-[56vh]" aria-hidden="true">
               <div className="inner-width flex flex-col items-center justify-center gap-6">
                    <SearchLoader/>
                    <div className="space-y-5 w-full">
                         {Array.from({length: count}).map((_,i)=><BlogItemLoader key={`post-${i+1}`}/>)}
                         <PaginationLoader/>
                    </div>
               </div>
          </section>
     )
}