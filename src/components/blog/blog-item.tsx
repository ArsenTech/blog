import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function BlogItem(){
     const date = new Date();
     return (
          <div className="space-y-3 pb-3 mb-3 border-b last:border-b-0 last:pb-0 last:mb-0">
               <h2 className="text-2xl md:text-3xl font-semibold">Blog name</h2>
               <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus quam quas laboriosam architecto error sint quod saepe sit, impedit exercitationem pariatur fugit, nisi placeat quis maiores nemo porro. Dicta, error!</p>
               <div className="flex justify-between items-center gap-4">
                    <p className="flex items-center gap-2 font-medium"><Calendar className="size-5"/>{format(date,"dd-MM-yyyy")}</p>
                    <Button asChild variant="ghost">
                         <Link href="#">Read more <ArrowRight/></Link>
                    </Button>
               </div>
          </div>
     )
}