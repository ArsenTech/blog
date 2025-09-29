"use client"
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchLoader(){
     return (
          <div className="flex items-center gap-3 w-full">
               <Skeleton className="size-6"/>
               <Skeleton className="h-9 w-full"/>
          </div>
     )
}