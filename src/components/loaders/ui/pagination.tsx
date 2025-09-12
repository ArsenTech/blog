import { Skeleton } from "@/components/ui/skeleton";

export default function PaginationLoader(){
     return (
          <div className="flex flex-col md:flex-row items-center gap-3 w-full">
               <div className="flex items-center gap-4 flex-1">
                    <Skeleton className="w-[105px] h-3"/>
                    <Skeleton className="w-[60px] h-9"/>
               </div>
               <div className="mx-auto flex w-full flex-row items-center gap-1 max-sm:gap-0 justify-center md:justify-end">
                    <div className="py-2 pr-4 pl-2.5">
                         <Skeleton className="w-[110px] h-4"/>
                    </div>
                    <Skeleton className="size-9"/>
                    <Skeleton className="size-9"/>
                    <Skeleton className="size-9"/>
                    <div className="py-2 pr-2.5 pl-4">
                         <Skeleton className="w-[80px] h-4"/>
                    </div>
               </div>
          </div>
     )
}