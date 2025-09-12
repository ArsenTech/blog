"use client"
import { Skeleton } from "../../ui/skeleton"

interface WidgetLoaderWrapperProps{
     children: React.ReactNode
}
export default function WidgetLoaderWrapper({children}: WidgetLoaderWrapperProps){
     return (
          <div className="animate-pulse rounded-xl bg-background border-2 border-primary/10 p-6">
               <Skeleton className="w-3/5 h-4"/>
               <div className="mt-6 space-y-6">
                    {children}
               </div>
          </div>
     )
}