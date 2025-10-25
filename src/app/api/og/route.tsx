/* eslint-disable @next/next/no-img-element */
import { getValueFromKey } from "@/lib/helpers/seo"
import { formatDate } from "date-fns"
import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET(req: Request) {
  try{
    const {searchParams} = new URL(req.url)
    const fontData = {
      regular: await fetch(new URL("../../../assets/Sora-Regular.ttf",import.meta.url)).then(res => res.arrayBuffer()),
      semibold: await fetch(new URL("../../../assets/Sora-SemiBold.ttf",import.meta.url)).then(res => res.arrayBuffer())
    }
    const siteUrl = process.env.NODE_ENV==="production" ? "https://arsentech-blog.vercel.app" : "http://localhost:3000"
    const title = getValueFromKey(searchParams,"title","ArsenTech Blog")
    const description = getValueFromKey(searchParams,"description","Learn about cybersecurity, tech tutorials, unique coding projects, and other tech-related posts all in one place.")
    const date = new Date(getValueFromKey(searchParams,"date",new Date().toDateString()))

    return new ImageResponse((
      <div style={{backgroundImage: "linear-gradient(140deg,#22b455 25%,#1dd1a1)"}} tw="flex flex-col w-full h-full items-center justify-between p-5 text-white">
        <img src={`${siteUrl}/arsentech-dark.svg`} alt="ArsenTech" tw="mb-3" width={300} height={64}/>
        <div tw="flex items-center justify-center flex-col">
          <h1 tw="text-[70px] my-0 font-semibold">{title}</h1>
          <p tw="text-[27px] my-0">{description}</p>
        </div>
        <p tw="text-3xl text-center font-semibold">{formatDate(date,"MMMM dd, yyyy")}</p>
      </div>
    ),{
      fonts: [
        {
          name: "Sora",
          data: fontData.regular,
          style: "normal",
          weight: 400
        },
        {
          name: "Sora",
          data: fontData.semibold,
          style: "normal",
          weight: 600
        }
      ]
    })
  } catch (e: unknown){
    console.error(e)
    return new Response("Failed to generate OpenGraph image",{status: 500})
  }
}