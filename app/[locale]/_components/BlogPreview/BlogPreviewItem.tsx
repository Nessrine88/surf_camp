import { formatDate } from "@/utils/stapi-utils";


const BlogPreviewItem = ({ article }:any) => {
  return (
    <div className="blog-preview__item">
      <div className="blog-preview__image">
        <img src={article.featuredImage} alt="" />
      </div>
      <h5 className="blog-preview__title">{article.headline}</h5>
      <p className="copy-small">{formatDate(article.publishedAt)}</p>
    </div>
  );
};

export default BlogPreviewItem;