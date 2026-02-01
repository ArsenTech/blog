import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MDXComponents } from "mdx/types";
import CodeBlockWrapper from "./components/code-block";
import { Blockquote } from "./components/blockquote-box";
import { Kbd, KbdGroup } from "./components/ui/kbd";
import CMDBlock from "./components/cmd-block";

const customComponents: MDXComponents = {
  CMDBlock,
  Kbd,
  KbdGroup,
}

export const useMDXComponents = (components: MDXComponents): MDXComponents => ({
  ...customComponents,
  h1: (props) => <h1 className="scroll-m-40 text-4xl font-extrabold tracking-tight lg:text-5xl" {...props} />,
  h2: (props) => <h2 className="scroll-m-40 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0" {...props} />,
  h3: (props) => <h3 className="scroll-m-40 text-2xl font-semibold tracking-tight" {...props} />,
  h4: (props) => <h4 className="scroll-m-40 text-xl font-semibold tracking-tight" {...props} />,
  h5: (props) => <h5 className="scroll-m-40 text-lg font-semibold tracking-tight" {...props} />,
  h6: (props) => <h6 className="scroll-m-40 text-sm font-semibold tracking-tight" {...props} />,
  p: (props) => <p className="leading-7 [&:not(:first-child)]:mt-4" {...props} />,
  a: (props) => <Link className={cn(buttonVariants({ variant: "link" }), "px-0.5 py-0 whitespace-normal text-sm md:text-base break-all")} {...props} />,
  blockquote: (props) => <Blockquote {...props}/>,
  small: (props) => <small className="text-sm font-medium leading-none" {...props} />,
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
  section: ({children,className, ...props}) => className==="footnotes" ? (
    <section className="border-t-2 border-dashed" {...props}>
      {children}
    </section>
  ) : (
    <section className={className} {...props}>
      {children}
    </section>
  ),
  ...components
})