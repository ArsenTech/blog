import { Skeleton } from "@/components/ui/skeleton";
import BlogItemLoader from "./ui/blog-item";
import PaginationLoader from "./ui/pagination";
import SearchLoader from "./ui/search";
import WidgetLoaderWrapper from "./ui/widget";
import SiteSection from "../site-section";

export default function LandingLoader({count = 10}: {count?: number}){
     return (
          <SiteSection className="scroll-mt-10" aria-hidden="true">
               <div className="inner-width space-y-4 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4">
                    <div className="space-y-5">
                         <div className="w-1/2 h-[45px] pb-2 border-b border-primary/10">
                              <Skeleton className="w-full h-9"/>
                         </div>
                         {Array.from({length: count}).map((_,i)=><BlogItemLoader key={`post-${i+1}`}/>)}
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
          </SiteSection>
     )
}