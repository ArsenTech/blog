import { Skeleton } from "../ui/skeleton";
import PaginationLoader from "./ui/pagination";
import SearchLoader from "./ui/search";
import WidgetLoaderWrapper from "./ui/widget";

export default function LandingLoader({count = 10}: {count?: number}){
     return (
          <section className="scroll-mt-10" aria-hidden="true">
               <div className="inner-width space-y-4 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-3">
                    <div className="space-y-5">
                         <div className="w-1/2 h-[45px] pb-2 border-b border-primary/10">
                              <Skeleton className="w-full h-9"/>
                         </div>
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
                    <div className="space-y-4 relative lg:sticky top-0 lg:top-[85px] h-fit -order-1 lg:order-1">
                         <SearchLoader/>
                         <WidgetLoaderWrapper>
                              {Array.from({length: 3}).map((_,i)=>(
                                   <div key={`featured-${i+1}`} className="space-y-2">
                                        <Skeleton className="w-3/4 h-7"/>
                                        <Skeleton className="w-1/2 h-3"/>
                                   </div>
                              ))}
                         </WidgetLoaderWrapper>
                         <WidgetLoaderWrapper>
                              <div className="flex items-center gap-2 flex-wrap overflow-hidden transition-all max-h-28">
                                   <Skeleton className="w-1/4 h-[30px]"/>
                                   <Skeleton className="w-1/3 h-[30px]"/>
                                   <Skeleton className="w-1/2 h-[30px]"/>
                                   <Skeleton className="w-1/4 h-[30px]"/>
                                   <Skeleton className="w-1/4 h-[30px]"/>
                                   <Skeleton className="w-1/6 h-[30px]"/>
                                   <Skeleton className="w-1/3 h-[30px]"/>
                              </div>
                         </WidgetLoaderWrapper>
                    </div>
               </div>
          </section>
     )
}