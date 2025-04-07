"use client"
import Markdown, { MarkdownToJSX } from "markdown-to-jsx"
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,TableFooter} from "@/components/ui/table"
import React from "react"
import Link from "next/link"
import { buttonVariants } from "../ui/button"
import CodeBlock from "./md-components/code-block"
import { cn } from "@/lib/utils"
import { badgeVariants } from "../ui/badge"
import { Checkbox } from "../ui/checkbox"

const options: MarkdownToJSX.Options = {
     overrides: {
          h1: {
               component: "h2",
               props: {
                    className: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
               }
          },
          h2: {
               props: {
                    className: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
               }
          },
          h3: {
               props: {
                    className: "scroll-m-20 text-2xl font-semibold tracking-tight"
               }
          },
          h4: {
               props: {
                    className: "scroll-m-20 text-xl font-semibold tracking-tight"
               }
          },
          h5: {
               props: {
                    className: "scroll-m-20 text-lg font-semibold tracking-tight"
               }
          },
          h6: {
               props: {
                    className: "scroll-m-20 text-sm font-semibold tracking-tight"
               }
          },
          p: {
               props: {
                    className: "leading-7 [&:not(:first-child)]:mt-6"
               }
          },
          a: {
               component: Link,
               props: {
                    className: cn(buttonVariants({variant: "link"}),"px-1 py-0 whitespace-normal text-base")
               }
          },
          blockquote: {
               props: {
                    className: "mt-6 border-l-2 pl-6 italic"
               }
          },
          figure: {
               props: {
                    className: "bg-card text-card-foreground border shadow my-3 rounded-md"
               }
          },
          figcaption: {
               props: {
                    className: "p-3 mt-0 text-center"
               }
          },
          small: {
               props: {
                    className: "text-sm font-medium leading-none"
               }
          },
          kbd: {
               props: {
                    className: cn(badgeVariants({variant: "outline"}),"px-1.5 shadow")
               }
          },
          code: ({ className, children }: React.ComponentProps<"code">) => {
               const match = /lang-(\w+)/.exec(className || "");
               return match ? (
                    <CodeBlock language={match[1]} code={`${children}`}/>
               ) : (
                    <code>{children}</code>
               );
          },
          pre: ({children}: React.ComponentProps<"pre">)=>{
               const isLangClass = React.Children.toArray(children).some(child=>{
                    if(React.isValidElement<HTMLPreElement>(child) && child.props.className){
                         return child.props.className && child.props.className.startsWith("lang-")
                    }
                    return false
               });
               return isLangClass ? (
                    <>{children}</>
               ) : (
                    <pre>{children}</pre>
               )
          },
          table: Table,
          thead: TableHeader,
          tr: TableRow,
          th: TableHead,
          tbody: TableBody,
          td: TableCell,
          tfoot: TableFooter,
          ul: {
               props: {
                    className: "marker:text-primary/65"
               }
          },
          iframe: ({ src }: React.ComponentProps<"iframe">) => (
               <div className="relative w-full pb-[56.25%]">
                    <iframe src={src} className="absolute inset-0 w-full h-full rounded-md" />
               </div>
          ),
          hr: {
               props: {
                    className: "border-t border-primary border-dashed"
               }
          },
          footer: {
               props: {
                    className: "border-t p-5 space-y-2"
               }
          },
          li: ({children}: React.ComponentProps<"li">) => {
               let isChecked = false, hasCheckbox = false;
               const newChildren = React.Children.map(children,(child)=>{
                    if(React.isValidElement<HTMLInputElement>(child) && child.props.type==="checkbox") {
                         hasCheckbox = true;
                         isChecked = child.props.checked || child.props.defaultChecked || false;
                         return (
                              <Checkbox checked={isChecked} className="select-none pointer-events-none mr-2"/>
                         )
                    }
                    return child
               });
               return !hasCheckbox ? (
                    <li>{children}</li>
               ) : (
                    <li className="flex items-center gap-1.5 flex-wrap">{newChildren}</li>
               )
          }
     }
}

interface BlogContentProps{
     markdownContent: string
}
export default function BlogContent({markdownContent}: BlogContentProps){
     return markdownContent!=="" ? (
          <div className="break-all prose dark:prose-invert prose-code:after:content-normal prose-code:before:content-none">
               <Markdown options={options}>
                    {markdownContent}
               </Markdown>
          </div>
     ) : null
}