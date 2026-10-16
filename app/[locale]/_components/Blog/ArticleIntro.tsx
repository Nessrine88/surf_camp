import { formatDate } from "@/utils/stapi-utils";
import Image from "next/image";



const ArticleIntro = ({article}:any) => {
  return (
      <div className="article-intro">
      <div className="article-intro__background">
        <Image width={1000} height={1000} src={article.featuredImage} alt="" />
      </div>
      <h3 className="article-intro__headline">{article.headline}</h3>
      <p className="copy-small bold">{formatDate(article.publishedAt)}</p>
      <p className="copy-small">{article.author}</p>
    </div>
  )
}

export default ArticleIntro;