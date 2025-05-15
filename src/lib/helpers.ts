// TODO: Write useful helpers replacing with sample ones
import { blogs } from "@/lib/constants"

export const getPostBySlug = (slug: string) => {
     const post = blogs.find(val=>val.slug===slug);
     return !post ? null : post
}