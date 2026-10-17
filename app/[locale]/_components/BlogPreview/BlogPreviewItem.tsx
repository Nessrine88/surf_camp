import { formatDate } from "@/utils/stapi-utils";
import { Link } from "@/i18n/navigation";

const BlogPreviewItem = ({ article }:any) => {
    if (!article) {
    console.error("BlogPreviewItem received an undefined article");
    return null;
  }

  if (!article.slug) {
    console.error("Blog article is missing its slug:", article);
    return null;
  }

  return (
    <Link href= {`/blog/${article.slug}`} className="blog-preview__item">
      <div className="blog-preview__image">
        <img src={article.featuredImage} alt="" />
      </div>
      <h5 className="blog-preview__title">{article.headline}</h5>
      <p className="copy-small">{formatDate(article.publishedAt)}</p>
    </Link>
  );
};

export default BlogPreviewItem;