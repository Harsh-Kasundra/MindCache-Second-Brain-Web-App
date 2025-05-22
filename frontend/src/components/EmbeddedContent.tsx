import React from "react";
import YTIcon from "../assets/icons/YTIcon";
import InstagramIcon from "../assets/icons/InstagramIcon";
import TwitterIcon from "../assets/icons/TwitterIcon";
import NotesIcon from "../assets/icons/NotesIcon";
import ImageIcon from "../assets/icons/ImageIcon";

// Load Twitter embed script once
const loadTwitterScript = () => {
  if (!document.getElementById("twitter-wjs")) {
    const script = document.createElement("script");
    script.id = "twitter-wjs";
    script.src = "https://platform.twitter.com/widgets.js";
    document.body.appendChild(script);
  }
};

type ContentProps = {
  content_title: string;
  content_description: string;
  content_link?: string;
  type: "Instagram" | "Twitter" | "Youtube" | "Text" | "Image" | "Medium";
};

const EmbeddedContent: React.FC<ContentProps> = ({
  content_title,
  content_description,
  content_link,
  type,
}) => {
  React.useEffect(() => {
    if (type === "Twitter") loadTwitterScript();
  }, [type]);

  return (
    <div className="bg-secondary-800 border-primary-800/30 hover:border-primary-800/50 group overflow-hidden rounded-xl border transition-all duration-200">
      {/* Header */}
      <div className="border-primary-800/30 border-b p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="bg-primary-600/10 mr-3 rounded-lg p-2">
              {getIcon(type)}
            </div>
            <div>
              <h3 className="text-text-dark-100 font-medium">
                {content_title}
              </h3>
              <p className="text-text-dark-100/60 text-xs">Saved just now</p>
            </div>
          </div>
          <button className="text-text-dark-100/60 hover:text-primary-600 transition-colors duration-200">
            <ThreeDotsIcon />
          </button>
        </div>
      </div>

      {/* Embedded Content */}
      <div className="group relative w-full max-w-full overflow-hidden rounded-xl bg-black shadow-md">
        {/* Media Container */}
        <div className="aspect-square h-full w-full">
          {type === "Youtube" && content_link && (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${extractYouTubeId(content_link)}`}
              title="YouTube"
              allowFullScreen
            />
          )}
          {type === "Instagram" && content_link && (
            <iframe
              src={`https://www.instagram.com/p/${extractInstagramId(content_link)}/embed`}
              className="h-full w-full"
              allowFullScreen
            />
          )}
          {type === "Twitter" && content_link && (
            <div className="h-full w-full overflow-y-auto">
              <blockquote className="twitter-tweet">
                <a href={convertToTwitterLink(content_link)}></a>
              </blockquote>
            </div>
          )}
          {type === "Image" && content_link && (
            <img
              src={content_link}
              alt={content_title}
              className="h-full w-full object-cover"
            />
          )}
          {type === "Text" && (
            <div className="flex h-full w-full items-center justify-center bg-gray-800 p-6 text-center text-white">
              <p className="text-base">{content_link}</p>
            </div>
          )}
          {type === "Medium" && content_link && (
            <a
              href={content_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full w-full flex-col justify-between bg-white p-6 text-left transition hover:bg-gray-100"
            >
              <h4 className="text-xl font-semibold text-black">
                {content_title}
              </h4>
              <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                {content_description}
              </p>
              <span className="text-primary-600 mt-4 inline-block font-medium">
                Read on Medium →
              </span>
            </a>
          )}
        </div>

        {/* Description Section */}
        <div className="bg-white p-4">
          <p className="text-md mb-4 text-gray-600">{content_description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-500 transition-colors duration-200 hover:text-red-500">
                <HeartIcon />
                <span className="ml-1 text-sm">12</span>
              </button>
              <button className="flex items-center text-gray-500 transition-colors duration-200 hover:text-orange-500">
                <ShareIcon />
                <span className="ml-1 text-sm">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbeddedContent;

// Helpers
function extractYouTubeId(url: string) {
  const regExp =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : "";
}

function extractInstagramId(url: string) {
  const regExp = /instagram\.com\/p\/([^/]+)/;
  const match = url.match(regExp);
  return match ? match[1] : "";
}

function convertToTwitterLink(link: string): string {
  // Convert x.com links to twitter.com
  return link.replace("https://x.com", "https://twitter.com");
}

const PlayIcon = () => (
  <svg
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
    />
  </svg>
);

const ThreeDotsIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 12h.01M12 12h.01M19 12h.01"
    />
  </svg>
);

const HeartIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);
const MediumIcon = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 1043.63 592.71"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="M588.67 296.34c0 163.63-132.62 296.34-296.33 296.34S0 459.97 0 296.34 132.62 0 296.34 0s296.33 132.62 296.33 296.34zm418.38 0c0 148.03-66.09 268.03-147.6 268.03s-147.6-120-147.6-268.03S878.94 28.31 960.45 28.31s147.6 120 147.6 268.03zM1043.63 296.34c0 137.89-29.53 249.67-65.97 249.67-36.44 0-65.97-111.78-65.97-249.67S941.22 46.67 977.66 46.67c36.44 0 65.97 111.78 65.97 249.67z" />
    </g>
  </svg>
);

const ShareIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8.684 13.342a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684z"
    />
  </svg>
);

const getIcon = (type: ContentProps["type"]) => {
  switch (type) {
    case "Youtube":
      return <YTIcon height={25} width={25} />;
    case "Instagram":
      return <InstagramIcon height={25} width={25} />;
    case "Twitter":
      return <TwitterIcon height={25} width={25} />;
    case "Image":
      return <ImageIcon height={25} width={25} />;
    case "Text":
      return <NotesIcon height={25} width={25} />;
    case "Medium":
      return <MediumIcon />;
    default:
      return <PlayIcon />;
  }
};
