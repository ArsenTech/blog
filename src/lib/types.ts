export interface IBlogPost{
     title: string;
     description: string;
     date: Date;
     tags: string[];
     published: boolean;
     featured: boolean;
     categories: string[];
     content: string;
     slug: string;
}

export type BlogPostMetadata = Omit<IBlogPost,"content" | "slug" | "published" | "featured"> & {
     published?: boolean;
     featured?: boolean;
}

export interface TOCItem{
     id: string,
     text: string,
     level: number
}