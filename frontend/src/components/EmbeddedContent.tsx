import React from "react";
import YTIcon from "../assets/icons/YTIcon";
import InstagramIcon from "../assets/icons/InstagramIcon";
import TwitterIcon from "../assets/icons/TwitterIcon";
import NotesIcon from "../assets/icons/NotesIcon";
import ImageIcon from "../assets/icons/ImageIcon";
import MediumIcon from "../assets/icons/MediumIcon";
import ThreeDotsIcon from "../assets/icons/ThreeDotsIcon";
import { ContentProps } from "../utils/types";

// Load Twitter embed script once
const loadTwitterScript = () => {
  if (!document.getElementById("twitter-wjs")) {
    const script = document.createElement("script");
    script.id = "twitter-wjs";
    script.src = "https://platform.twitter.com/widgets.js";
    document.body.appendChild(script);
  }
};

const EmbeddedContent: React.FC<ContentProps> = ({
  content_title,
  content_description,
  content_link,
  content_type,
  content_tag,
  content_createdAt,
}) => {
  React.useEffect(() => {
    if (content_type === "Twitter") loadTwitterScript();
  }, [content_type]);

  return (
    <div className="dark:bg-secondary-950 bg-secondary-200 border-primary-800/30 hover:border-primary-800/50 group overflow-hidden rounded-xl border transition-all duration-200">
      {/* Header */}
      <div className="border-primary-800/30 border-b p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="bg-primary-600/10 mr-3 rounded-lg p-2">
              {getIcon(content_type)}
            </div>
            <div>
              <h3 className="dark:text-text-dark-100 text-text-light-950 font-medium">
                {content_title}
              </h3>
              <p className="dark:text-text-dark-100 text-text-light-950 text-xs">
                Saved just now
              </p>
            </div>
          </div>
          <button className="text-primary-600 hover:text-primary-800 transition-colors duration-200 hover:cursor-pointer">
            <ThreeDotsIcon height={20} width={20} />
          </button>
        </div>
      </div>

      {/* Embedded Content */}
      <div className="group relative w-full max-w-full overflow-hidden rounded-xl bg-black shadow-md">
        {/* Media Container */}
        <div className="aspect-video h-full w-full">
          {content_type === "Youtube" && content_link && (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${extractYouTubeId(content_link)}`}
              title="YouTube"
              allowFullScreen
            />
          )}
          {content_type === "Instagram" && content_link && (
            <iframe
              src={`https://www.instagram.com/p/${extractInstagramId(content_link)}/embed`}
              className="h-full w-full"
              allowFullScreen
            />
          )}
          {content_type === "Twitter" && content_link && (
            <div className="h-full w-full overflow-y-auto">
              <blockquote className="twitter-tweet">
                <a href={convertToTwitterLink(content_link)}></a>
              </blockquote>
            </div>
          )}
          {content_type === "Image" && content_link && (
            <img
              src={content_link}
              alt={content_title}
              className="h-full w-full object-cover"
            />
          )}
          {content_type === "Text" && (
            <div className="flex h-full w-full items-center justify-center bg-gray-800 p-6 text-center text-white">
              <p className="text-base">{content_link}</p>
            </div>
          )}
          {content_type === "Medium" && content_link && (
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
        <div className="dark:bg-secondary-950 bg-secondary-200 p-4">
          <p className="text-md dark:text-text-dark-100/80 text-light-950/80 mb-4">
            {content_description}
          </p>
          <div className="flex items-center justify-between">
            <div className="mt-3 flex items-center">
              <span className="dark:text-text-dark-100/60 text-text-light-950/60 mr-4 flex items-center text-xs">
                <svg
                  className="mr-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                {content_tag}
              </span>
            </div>
            <div className="mt-3 flex items-center">
              <span className="dark:text-text-dark-100/60 text-text-light-950/60 flex items-center text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="mr-1 h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>

                {content_createdAt}
              </span>
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

const getIcon = (type: ContentProps["content_type"]) => {
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
      return <MediumIcon height={25} width={25} />;
    default:
      null;
  }
};
