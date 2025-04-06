"use client"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, Copy } from "lucide-react";
import { useState } from "react";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import { materialDark as style } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps{
     code: string
     language: string
}

export default function CodeBlock({code, language}: CodeBlockProps){
     const [isCopied, setIsCopied] = useState(false);
     const handleCopy = () => {
          navigator.clipboard.writeText(code);
          setIsCopied(true);
          setTimeout(()=>{
               setIsCopied(false)
          },2000)
     }
     return (
          <div className="w-full rounded-md overflow-hidden my-10 shadow">
               <div className="flex justify-between items-center gap-3 px-5 bg-[#2f2f2f] text-white">
                    <p>{language}</p>
                    <Button
                         className={cn(isCopied && "select-none pointer-events-none")}
                         size="icon"
                         title={isCopied ? "Copied" : "Copy code"}
                         variant="ghost"
                         onClick={handleCopy}
                    >
                         {isCopied ? <CheckCircle/> : <Copy/>}
                    </Button>
               </div>
               <SyntaxHighlighter style={style} language={language} wrapLongLines={true} customStyle={{padding: "0 20px 20px", margin: "0", width: "100%", borderRadius: "0"}}>
                    {code.trim()}
               </SyntaxHighlighter>
          </div>
     )
}