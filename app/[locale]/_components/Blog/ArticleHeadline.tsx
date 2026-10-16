const ArticleHeadline = ({ headline }:any) => {
  return (
    <h3 className="article-headline" id={headline.slug}>
      {headline.headline}
    </h3>
  );
};

export default ArticleHeadline;