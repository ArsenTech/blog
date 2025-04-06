import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {format} from "date-fns"
import Link from "next/link";

interface BlogWidgetProps{
     title: string,
     children: React.ReactNode
}
export function BlogWidget({title, children}: BlogWidgetProps){
     return (
          <Card>
               <CardHeader>
                    <CardTitle>{title}</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                    {children}
               </CardContent>
          </Card>
     )
}

export function BlogWidgetCard(){
     const date = new Date("01-01-2024");
     return (
          <Link className="inline-block w-full" href="#">
               <h2 className="text-lg md:text-xl font-semibold">Blog Name</h2>
               <p className="text-sm text-muted-foreground">{format(date,"dd-MM-yyyy")}</p>
          </Link>
     )
}