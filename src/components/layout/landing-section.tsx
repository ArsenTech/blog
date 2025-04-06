"use client"
import { getBackgroundImage } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const texts = ["Tech Fans", "Programmers", "Cybersecurity Fans", "People Finding for the Solutions"]

export default function LandingSection(){
     const [index, setIndex] = useState(0);
     useEffect(()=>{
          const interval = setInterval(()=>{
               setIndex(prev=>(prev+1) % texts.length)
          },1250);
          return () => clearInterval(interval)
     },[])
     const text = texts[index];
     return (
          <section id="banner" className="text-white flex items-center justify-center flex-col gap-5 h-screen min-h-[500px] px-4 text-center" style={getBackgroundImage()}>
               <h1 className="inline-flex justify-center items-center flex-col gap-3 text-4xl sm:text-5xl lg:text-6xl font-bold"><span>Blog Page For</span><span style={{color: "rgb(37, 236, 183)"}}>{text}</span></h1>
               <p className="text-lg sm:text-xl">Learn about cybersecurity, tech tutorials, unique coding projects, and other tech-related posts all in one place.</p>
               <Button size="lg" variant="outline" asChild>
                    <Link href="#blog">Explore blog</Link>
               </Button>
          </section>
     );
}