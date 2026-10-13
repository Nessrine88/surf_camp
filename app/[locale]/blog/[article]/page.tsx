
import { fetchBlogArticles, fetchDataFromStrapi } from '@/utils/stapi-utils';
import ArticleIntro from '../../_components/Blog/ArticleIntro';
import ArticleOverview from '../../_components/Blog/ArticleOverview';
import ArticleComponent from '../../_components/Blog/ArticleComponent';
import FeaturedItems from '../../_components/FeaturedItems/FeaturedItems';

const SingleArticle = async ({ params }: any) => {
  const { article: slug } = await params;

  const articles = await fetchBlogArticles();
  const article = articles.find((art: any) => art.slug === slug);

  if (!article) {
    return <div>Article not found</div>;
  }
const moreArticles = articles.filter((art: any) => art.slug !== slug)
  return (
    <main className='px-10! '>
      <ArticleIntro article={article} /> 
      <section className='article-section'>
      <ArticleOverview article={article} /> 
{article.articleContent.map((component:any) => (
  <ArticleComponent key={component.id} component={component} />
))}
<FeaturedItems items= {moreArticles}  heaadline= "Explore our other articles" />
      </section>


    </main>
  );
};

export default SingleArticle;

export async function generateStaticParams() {
  const articles = await fetchDataFromStrapi('blog-articles');

  return articles.map((article: any) => ({
    article: article.attributes.slug,
  }));
}