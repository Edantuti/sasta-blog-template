
import { readdirSync, readFileSync } from "fs"
import * as matter from "gray-matter"
import { notFound } from "next/navigation"
import { join } from "path"
import markdownit from "markdown-it"
import { BLOG_PATH } from "@/app/constant"

const getBlogBySlug = (slug:string)=>{
  const fileName:string = readdirSync(BLOG_PATH).map((path)=>path.replace(/\.mdx?$/, '')).filter((name:string)=>name===slug)[0]
  if(!fileName)
    return null 

  const fileData = matter.read(join(BLOG_PATH, `${fileName}.mdx`))
  const md = markdownit({html:true,linkify:true})
  
  return {data:fileData.data, content:md.render(fileData.content)}
}


export default async function Blog({params}:{params:{slug:string}}){
    const article = getBlogBySlug(decodeURI(params.slug)) 
    if(!article){
      notFound()
    }
    return (            
      <section dangerouslySetInnerHTML={{__html:article.content}} className="xl:mx-40 lg:mx-28 md:mx-10 mx-5 pt-20 text-white prose prose-headings:text-white prose-headings:font-mono prose-p:text-white">
      

      </section>
    )
}