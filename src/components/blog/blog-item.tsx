import Link from "next/link";
import { Button } from "../ui/button";

export default function BlogItem(){
     return (
          <div className="space-y-3 pb-6 mb-6 border-b last:border-b-0 last:pb-0 last:mb-0">
               <h2 className="text-2xl md:text-3xl font-semibold">Blog name</h2>
               <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus quam quas laboriosam architecto error sint quod saepe sit, impedit exercitationem pariatur fugit, nisi placeat quis maiores nemo porro. Dicta, error!</p>
               <Button asChild>
                    <Link href="#">Read more</Link>
               </Button>
          </div>
     )
}