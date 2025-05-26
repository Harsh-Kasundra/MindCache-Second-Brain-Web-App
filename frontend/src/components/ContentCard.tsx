import React from "react";
import YTIcon from "../assets/icons/YTIcon";
import TwitterIcon from "../assets/icons/TwitterIcon";
import InstagramIcon from "../assets/icons/InstagramIcon";
import NotesIcon from "../assets/icons/NotesIcon";

interface CardProps {
  title: string;
  link: string;
  type: string;
  contentId: string;
}
enum ContentType {
  Youtube = "Youtube",
  Twitter = "Twitter",
  Instagram = "Instagram",
  Text = "Text",
  Medium = "Medium",
  Image = "Image",
}
const ContentCard = (props: CardProps) => {
  const currentDate = new Date();

  const renderIcon = () => {
    switch (props.type) {
      case ContentType.Youtube:
        return <YTIcon height={50} width={50} />;
      case ContentType.Twitter:
        return <TwitterIcon height={50} width={50} />;
      case ContentType.Instagram:
        return <InstagramIcon height={50} width={50} />;
      case ContentType.Text:
        return <NotesIcon height={50} width={50} />;
      default:
    }
  };

  return <div>ContentCard</div>;
};

export default ContentCard;
