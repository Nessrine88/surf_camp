import { formatDate } from "@/utils/stapi-utils";
import { Link } from "@/i18n/navigation";k from "next/link";

const FeaturedArticles = ({ article }: any) => {
  return (
    <Link href={`/blog/${article.slug}`} className="featured-items__article">
      <div className="featured-items__article-img">
        <img
          src={article.featuredImage}
          alt={`Go read article ${article.headline}`}
          className=""
        />
      </div>

      <div className="featured-items__article-text">
        <h5>{article.headline}</h5>
        <p className="copy-small">{formatDate(article.publishedAt)}</p>
      </div>
    </Link>
  );
};

export default FeaturedArticles;
