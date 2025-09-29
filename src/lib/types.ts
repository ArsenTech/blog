import { LucideProps } from "lucide-react";

export interface IBlogPostBase{
     title: string;
     description: string;
     date: Date;
     tags: string[];
     published: boolean;
     featured: boolean;
     categories: string[];
     slug: string;
}

export interface IBlogPostFull extends IBlogPostBase {
     content: string;
     toc: TOCItem[];
}

export type BlogPostMetadata = Omit<IBlogPostBase,"published" | "featured"> & {
     published?: boolean;
     featured?: boolean;
}

export interface TOCItem{
     id: string,
     text: string,
     level: number
}

export type BlockquoteVariant = "note" | "tip" | "important" | "warning" | "caution"

export interface IBlockquoteBox{
     boxClass: string,
     lineClass: string,
     Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
     iconClass: string
}

export interface IBlogPostData{
     title: string,
     text: string,
     url: string
}