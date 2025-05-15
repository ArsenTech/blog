"use client"
import { usePathname, useSearchParams } from "next/navigation";
import {
     Pagination,
     PaginationContent,
     PaginationItem,
     PaginationLink,
     PaginationNext,
     PaginationPrevious
} from "@/components/ui/pagination"

interface BlogPaginationProps{
     totalPages: number;
     className?: string
}
export default function BlogPagination({totalPages, className}: BlogPaginationProps){
     const pathname = usePathname();
     const searchParams = useSearchParams();
     const page = searchParams.get("page")
     const currentPage = page ? +page : 1;

     const pageNum = {
          prev: currentPage-1,
          next: currentPage+1
     }

     const createPageUrl = (pageNum: number | string) => {
          const params = new URLSearchParams(searchParams);
          params.set("page",pageNum.toString());
          return `${pathname}?${params.toString()}`
     }

     return (
          <Pagination className={className}>
               <PaginationContent>
                    {pageNum.prev >= 1 ? (
                         <PaginationItem>
                              <PaginationPrevious href={createPageUrl(pageNum.prev)}/>
                         </PaginationItem>
                    ) : null}
                    {Array(totalPages).fill("").map((_,i)=>(
                         <PaginationItem className="hidden sm:inline-block" key={`page-button-${i+1}`}>
                              <PaginationLink isActive={currentPage===i+1} href={createPageUrl(i+1)}>
                                   {i+1}
                              </PaginationLink>
                         </PaginationItem>
                    ))}
                    {pageNum.next <= totalPages ? (
                         <PaginationItem>
                              <PaginationNext href={createPageUrl(pageNum.next)}/>
                         </PaginationItem>
                    ) : null}
               </PaginationContent>
          </Pagination>
     )
}