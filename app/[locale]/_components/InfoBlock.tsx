import type { ReactNode } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface InfoBlockProps {
  data: {
    headline?: string;
    text?: string | { text?: string };
    button?: ReactNode;
    showImageRight?: boolean;
    imageSrc?: string;
  };
}

const InfoBlock = ({ data }: InfoBlockProps) => {
  const { headline, text, button, showImageRight, imageSrc } = data;

  const markdownText =
    typeof text === "string" ? text : text?.text ?? "";

  return (
    <div className={`info ${showImageRight ? "info--reversed" : ""}`}>
      <Image
        className="info__image"
        src={imageSrc || "/info-blocks/rectangle.png"}
        width={500}
        height={400}
        alt={headline || "Information block"}
        sizes="(max-width: 768px) 100vw, 48vw"
      />

      <div className="info__text">
        {headline && <h2 className="info__headline">{headline}</h2>}

        <div className="copy">
          <ReactMarkdown>{markdownText}</ReactMarkdown>
        </div>

        {button}
      </div>
    </div>
  );
};

export default InfoBlock;