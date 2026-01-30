"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, Copy } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
  lang?: string,
  smallerMargin?: boolean
}

export default function CodeBlockWrapper({ children, lang, smallerMargin=false }: CodeBlockProps) {
  const [isCopied, setCopied] = useState(false);
  const [language, setLanguage] = useState<string | null>(null);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    const text = preRef.current?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const pre = preRef.current;
    const attr = pre?.querySelector("code")?.dataset.language;
    setLanguage(!attr ? lang ?? "text" : attr);
  }, [lang]);

  return (
    <div className={cn(
        "w-full overflow-hidden rounded-md",
        smallerMargin ? "my-2.5" : "my-5"
      )}
    >
      <div className="flex justify-between items-center gap-3 px-3 bg-[#2f2f2f] text-white">
        {language && (
          <p>{language}</p>
        )}
        <Button
          className={cn(isCopied && "select-none pointer-events-none")}
          size="icon"
          title={isCopied ? "Copied" : "Copy code"}
          variant="ghost"
          onClick={handleCopy}
        >
          {isCopied ? <CheckCircle /> : <Copy />}
        </Button>
      </div>
      <pre className="m-0 bg-[#2f2f2f] rounded-none break-all whitespace-pre-wrap" ref={preRef}>{children}</pre>
    </div>
  );
}