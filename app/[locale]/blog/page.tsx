import HightlightArticle from "../_components/Blog/HightlightArticle";
import SubscribeToNewsLetter from "../_components/Blog/SubscribeToNewsLetter";
import FeaturedItems from "../_components/FeaturedItems/FeaturedItems";
import { fetchBlogArticles } from "@/utils/stapi-utils";

const Blog = async () => {
  const fetchedArticles = await fetchBlogArticles();
  const highLightArticleData = fetchedArticles.find(
    (article: any) => article.isHighlightArticle,
  );
  const featuredArticles = fetchedArticles.filter(
    (article: any) => !article.isHighlightArticle,
  );
  return (
    <main className="blog-page">
      <HightlightArticle data={highLightArticleData} />
      <SubscribeToNewsLetter />
      <FeaturedItems items={featuredArticles} />
    </main>
  );
};

export default Blog;
