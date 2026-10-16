import { extractImageUrl } from "@/utils/stapi-utils";
import ReactMarkdown from "react-markdown";

const ImageTextComponent = ({ component }: any) => {
  const { paragraph, imageCaption, image, isLandscape, imageShowsRight } =
    component;

  const classes = [
    "article-text-image",
    !isLandscape && "article-text-image--portrait",
    !imageShowsRight && "article-text-image--reversed",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div className="copy article-text-image__text article-paragraph ">
     <ReactMarkdown>{paragraph}</ReactMarkdown>  
      </div>

      <div className="article-text-image__container">
        <div className="article-text-image__image">
          <img src={extractImageUrl(image)} alt={imageCaption ?? ""} />
        </div>
        {imageCaption && (
          <p className="article-text-image__caption copy-small">
            {imageCaption}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageTextComponent;