"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {format} from "date-fns"
import Link from "next/link";
import { BlogItemProps } from "../item";

interface BlogWidgetProps{
     title: string,
     children: React.ReactNode,
}
export function BlogWidget({title, children}: BlogWidgetProps){
     return (
          <Card>
               <CardHeader>
                    <CardTitle className="flex justify-between items-center gap-2">
                         {title}
                    </CardTitle>
               </CardHeader>
                    <CardContent className="space-y-4">
                    {children}
               </CardContent>
          </Card>
     )
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