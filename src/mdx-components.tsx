import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { buttonVariants } from "@/components/ui/button";
import { badgeVariants } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MDXComponents } from "mdx/types";
import CodeBlockWrapper from "./components/code-block";

export const useMDXComponents = (components: MDXComponents): MDXComponents => ({
  h1: (props) => <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl" {...props} />,
  h2: (props) => <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0" {...props} />,
  h3: (props) => <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight" {...props} />,
  h4: (props) => <h4 className="scroll-m-20 text-xl font-semibold tracking-tight" {...props} />,
  h5: (props) => <h5 className="scroll-m-20 text-lg font-semibold tracking-tight" {...props} />,
  h6: (props) => <h6 className="scroll-m-20 text-sm font-semibold tracking-tight" {...props} />,
  p: (props) => <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />,
  a: (props) => <Link className={cn(buttonVariants({ variant: "link" }), "px-1 py-0 whitespace-normal text-base")} {...props} />,
  blockquote: (props) => <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />,
  small: (props) => <small className="text-sm font-medium leading-none" {...props} />,
  kbd: (props) => <kbd className={cn(badgeVariants({ variant: "outline" }), "px-1.5 shadow")} {...props} />,
  table: Table,
  thead: TableHeader,
  tr: TableRow,
  th: TableHead,
  tbody: TableBody,
  td: TableCell,
  tfoot: TableFooter,
  ul: (props) => <ul className="marker:text-primary/65" {...props} />,
  iframe: ({ src, ...props }: React.ComponentProps<"iframe">) => (
    <div className="relative w-full pb-[56.25%]">
      <iframe src={src} className="absolute inset-0 w-full h-full rounded-md" {...props} />
    </div>
  ),
  hr: (props) => <hr className="border-t border-primary border-dashed" {...props} />,
  footer: (props) => <footer className="border-t p-5 space-y-2" {...props} />,
  li: ({ children }: React.ComponentProps<"li">) => {
    let isChecked = false, hasCheckbox = false;
    const newChildren = React.Children.map(children, (child) => {
      if (React.isValidElement<HTMLInputElement>(child) && child.props.type === "checkbox") {
        hasCheckbox = true;
        isChecked = child.props.checked || child.props.defaultChecked || false;
        return (
          <Checkbox checked={isChecked} className="select-none pointer-events-none mr-2" />
        );
      }
      return child;
    });
    return !hasCheckbox ? (
      <li>{children}</li>
    ) : (
      <li className="flex items-center gap-1.5 flex-wrap">{newChildren}</li>
    );
  },
  pre: ({children}) => (
    <CodeBlockWrapper>
      {children}
    </CodeBlockWrapper>
  ),
  ...components
})