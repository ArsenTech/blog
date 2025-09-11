import PageLayout from "@/components/layout"
import TagSearch from "@/components/pages/tag-search"
import { POSTS_IN_SEARCH } from "@/lib/constants"
import { getPostsByTag } from "@/lib/helpers"
import { absoluteURL } from "@/lib/helpers/seo"
import { Metadata } from "next"
import { notFound } from "next/navigation"

interface PageProps{
     params: Promise<{tag: string}>,
     searchParams: Promise<{page?: string, pageSize?:string}>
}

export const generateMetadata = async({params, searchParams}: PageProps): Promise<Metadata> =>{
     const {tag} = await params
     const {page, pageSize} = await searchParams;
     const currentPage = page ? parseInt(page) : 1;
     const postsPerPage = pageSize ? parseInt(pageSize) : POSTS_IN_SEARCH;
     const tagDecoded = decodeURIComponent(tag)
     const results = await getPostsByTag(tagDecoded)
     if(!results) return notFound();
     return {
          title: `Top ${results.length} posts with ${tag} keyword - Updated ${new Date().getFullYear()}`,
          description: `Explore ${results.length} blog posts tagged with "${tagDecoded}" — from coding tutorials to tech insights. Updated ${new Date().getFullYear()}.`,
          pagination: {
               previous: absoluteURL(`/search/${tag}?page=${(currentPage - 1) * postsPerPage}`),
               next: absoluteURL(`/search/${tag}?page=${currentPage + postsPerPage}`)
          }
     }
}

export default async function TagsPage({params, searchParams}: PageProps){
     const {tag} = await params
     const {page, pageSize} = await searchParams;
     const currentPage = page ? parseInt(page) : 1;
     const postsPerPage = pageSize ? parseInt(pageSize) : POSTS_IN_SEARCH;
     const tagDecoded = decodeURIComponent(tag)
     const results = await getPostsByTag(tagDecoded)
     const totalPages = Math.ceil(results.length / postsPerPage)
     return (
          <PageLayout>
               <TagSearch
                    pageSize={postsPerPage}
                    tag={tagDecoded}
                    results={[...results,...results]}
                    totalPages={totalPages}
                    currentPage={currentPage}
               />
          </PageLayout>
     )
}