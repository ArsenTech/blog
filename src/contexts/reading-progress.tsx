"use client"
import { createContext, RefObject, useContext, useRef } from "react";

const BlogProgressContext = createContext<{
     contentRef: RefObject<HTMLDivElement | null>
}>({
     contentRef: { current: null }
});

interface ContextProviderProps{
     children: React.ReactNode
}
export default function BlogProgressProvider({children}: ContextProviderProps){
     const contentRef = useRef<HTMLDivElement>(null);
     return (
          <BlogProgressContext.Provider value={{contentRef}}>
               {children}
          </BlogProgressContext.Provider>
     )
}

export const useBlogProgress = () => useContext(BlogProgressContext)