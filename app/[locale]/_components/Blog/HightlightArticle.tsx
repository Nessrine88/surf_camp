import Link from 'next/link'

interface ArticleData {
  headline: string
  excerpt: string
  slug: string
  featuredImage: string
}

interface HighlightArticleProps {
  data: ArticleData
}

const HighlightArticle = ({ data }: HighlightArticleProps) => {
  const { headline, excerpt, slug, featuredImage } = data

  return (
    <article className="highlight-article">
      <div className="highlight-article__info">
        <h2 className="leading-32 ">{headline}</h2>
        <p className="copy">{excerpt}</p>
        <Link className="btn btn--turquoise btn--medium" href={`/blog/${slug}`}>Read more</Link>
      </div>

      <img
        className="highlight-article__image"
        src={featuredImage}
        alt={headline}
      />
    </article>
  )
}

export default HighlightArticle