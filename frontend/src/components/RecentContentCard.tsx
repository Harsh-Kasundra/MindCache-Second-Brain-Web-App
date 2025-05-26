import { ReactNode } from "react";
import YTIcon from "../assets/icons/YTIcon";
import InstagramIcon from "../assets/icons/InstagramIcon";
import TwitterIcon from "../assets/icons/TwitterIcon";
import ImageIcon from "../assets/icons/ImageIcon";
import NotesIcon from "../assets/icons/NotesIcon";

export type ContentCardProps = {
  type: string;
  title: string;
  time: string;
  description: string;
  tags: string;
  views: number;
};
const ContentCard = ({
  type,
  title,
  time,
  description,
  tags,
  views,
}: ContentCardProps) => {
  return (
    <div className="border-primary-600/30 bg-background-light hover:border-primary-600/50 rounded-lg border p-4 transition-colors duration-200 dark:bg-black">
      <div className="flex items-start">
        <div className="bg-primary-600/20 mr-4 rounded-lg p-2">{type}</div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h4 className="dark:text-text-dark-100 text-text-light-950 font-medium">
              {title}
            </h4>
            <span className="dark:text-text-dark-100/60 text-text-light-950/60 text-xs">
              {time}
            </span>
          </div>
          <p className="dark:text-text-dark-100/80 text-text-light-950/60 mt-1 text-sm">
            {description}
          </p>
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
              {tags}
            </span>
            <span className="dark:text-text-dark-100/60 text-text-light-950/60 flex items-center text-xs">
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              {views} views
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;

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
