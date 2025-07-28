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

export type BlogPostMetadata = Omit<IBlogPostBase,"slug" | "published" | "featured"> & {
     published?: boolean;
     featured?: boolean;
}

export interface TOCItem{
     id: string,
     text: string,
     level: number
}