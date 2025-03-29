"use client"

import Footer from "./footer"
import Header from "./header"

interface PageLayoutProps{
     children: React.ReactNode
}
export default function PageLayout({children}: PageLayoutProps){
     return (
          <div className="flex min-h-screen flex-col font-[family-name:var(--font-sora)]">
               <Header/>
               {children}
               <Footer/>
          </div>
     )
}