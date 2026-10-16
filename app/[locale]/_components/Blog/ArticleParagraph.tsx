import ReactMarkdown from "react-markdown";

const ArticleParagraph = ({paragraph}:any) => {
  return (
    <div className="copy article-paragraph">
      <ReactMarkdown>
        {paragraph.paragraph}
      </ReactMarkdown>
    </div>
  )
}

export default ArticleParagraph