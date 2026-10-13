import Link from "next/link";

const ArticleOverview = ({ article }:any) => {
 console.log("Full Article Object:", article);
  console.log("Article Content:", article?.articleContent);

  const headlines = article?.articleContent?.filter(
    (component: any) => component.__component === "blog-article.headline"
  );
  
  console.log("Filtered Headlines:", headlines);
  return (
    <div className="article-overview ">
      <div className="article-overview__info">
        <h3 className="article-overview__headline">In this blog</h3>
        <h5 className="article-overview__excerpt">{article.excerpt}</h5>
      </div>
   <ul className="article-overview__contents">
  {headlines && headlines.length > 0 ? (
    headlines.map((headline: any, idx: any) => (
      <li key={headline.id}>
        <Link href={`#${headline.slug}`}>
          {idx + 1}. {headline.headline}
        </Link>
      </li>
    ))
  ) : (
    <li>
      <h1>No Links are found</h1>
    </li>
  )}
</ul>
    </div>
  );
};

export default ArticleOverview;