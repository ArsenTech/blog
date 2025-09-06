"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {format} from "date-fns"
import Link from "next/link";
import { BlogItemProps } from "../item";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {Maximize2, Minimize2} from "lucide-react"
import { useIsMobile } from "@/hooks/use-is-mobile";

export type CollapsibleMode = boolean | "mobile"

interface BlogWidgetProps{
     title: string,
     children: React.ReactNode,
     collapsible?: CollapsibleMode,
}
export function BlogWidget({title, children, collapsible=false}: BlogWidgetProps){
     const isMobile = useIsMobile("tablet");
     const shouldCollapse = collapsible===true || (collapsible==="mobile" && isMobile)
     const [isOpen, setIsOpen] = useState(shouldCollapse)

     const Header = (
          <CardHeader>
               <CardTitle className="flex justify-between items-center gap-2">
                    {title}
                    {shouldCollapse && (
                         <CollapsibleTrigger asChild>
                              <Button variant="ghost" size="icon">{!isOpen ? <Maximize2/> : <Minimize2/>}</Button>
                         </CollapsibleTrigger>
                    )}
               </CardTitle>
          </CardHeader>
     )
     const Content = shouldCollapse ? (
          <CollapsibleContent asChild>
               <CardContent className="space-y-4">
                    {children}
               </CardContent>
          </CollapsibleContent>
     ) : (
          <CardContent className="space-y-4">
               {children}
          </CardContent>
     )
     const Body = (
          <Card>
               {Header}
               {Content}
          </Card>
     )

     return shouldCollapse ? (
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
               {Body}
          </Collapsible>
     ) : Body
}

export function BlogWidgetCard({postData}: BlogItemProps){
     const {title, date, slug} = postData
     return (
          <Link className="inline-block w-full" href={`/posts/${slug}`}>
               <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
               <p className="text-sm text-muted-foreground">{format(date,"LLL do, yyyy")}</p>
          </Link>
     )
}