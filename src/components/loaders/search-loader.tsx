import { Skeleton } from "../ui/skeleton";
import PaginationLoader from "./ui/pagination";
import SearchLoader from "./ui/search";

export default function SearchResultsLoader({ count = 10 }: { count?: number }){
     return (
          <section className="scroll-mt-10 min-h-[56vh]" aria-hidden="true">
               <div className="inner-width flex flex-col items-center justify-center gap-6">
                    <SearchLoader/>
                    <div className="space-y-5 w-full">
                         {Array.from({length: count}).map((_,i)=>(
                              <div key={`post-${i+1}`} className="space-y-3 pb-3 mb-3 border-b border-primary/10 last:border-b-0 last:pb-0 last:mb-0">
                                   <Skeleton className="w-3/4 h-9"/>
                                   <Skeleton className="w-1/2 h-3"/>
                                   <div className="flex justify-between items-center gap-4">
                                        <Skeleton className="h-6 w-1/4"/>
                                        <Skeleton className="h-9 w-[132px]"/>
                                   </div>
                              </div>
                         ))}
                         <PaginationLoader/>
                    </div>
               </div>
          </section>
     )
}