"use client"
import BlogItem from "@/components/blog/blog-item";
import { BlogWidget, BlogWidgetCard } from "@/components/blog/blog-widget";
import PageLayout from "@/components/layout";
import LandingSection from "@/components/layout/landing-section";
import SiteSection from "@/components/layout/section";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <PageLayout>
      <main>
        <LandingSection/>
        <SiteSection id="blog" innerWidthClass="space-y-4 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-3">
          <div className="space-y-5">
            <BlogItem/>
            <BlogItem/>
            <BlogItem/>
            <BlogItem/>
            <BlogItem/>
            <BlogItem/>
            <BlogItem/>
            <BlogItem/>
            <BlogItem/>
            <BlogItem/>
          </div>
          <div className="space-y-4 relative md:sticky top-0 md:top-[85px] h-fit">
            <div className="flex items-center gap-3">
              <Search className="size-6 shrink-0"/>
              <Input type="text" placeholder="Search tutorials, coding tips..."/>
            </div>
            <BlogWidget title="Widget Name">
              <BlogWidgetCard/>
              <BlogWidgetCard/>
              <BlogWidgetCard/>
            </BlogWidget>
          </div>
        </SiteSection>
      </main>
    </PageLayout>
  );
}
