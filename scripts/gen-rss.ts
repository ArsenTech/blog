import { Feed } from "feed"
import fs from "fs"
import path from "path"
import { getAllPosts } from "@/lib/helpers"
import { SITE_URL } from "@/lib/constants"

const generateRSS = async() => {
     const feed = new Feed({
     title: "ArsenTech Blog",
     description: "The latest tech articles from ArsenTech",
     id: SITE_URL,
     link: SITE_URL,
     language: "en",
     favicon: `${SITE_URL}/favicon.ico`,
     copyright: `All rights reserved ${new Date().getFullYear()}`,
     })

     const posts = await getAllPosts()

     posts.forEach(post => {
     feed.addItem({
     title: post.title,
     id: `${SITE_URL}/posts/${post.slug}`,
     link: `${SITE_URL}/posts/${post.slug}`,
     description: post.description,
     date: new Date(post.date),
     })
     })

     const publicDir = path.join(process.cwd(), "public")
     if (!fs.existsSync(publicDir)) {
     fs.mkdirSync(publicDir)
     }

     fs.writeFileSync(path.join(publicDir, "rss.xml"), feed.rss2())
     fs.writeFileSync(path.join(publicDir, "rss.json"), feed.json1())
     fs.writeFileSync(path.join(publicDir, "atom.xml"), feed.atom1())

     console.log("✅ RSS feeds generated.")
}
generateRSS()