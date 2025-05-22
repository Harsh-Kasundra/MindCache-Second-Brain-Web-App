import { useState } from "react";
import Button from "../components/Button";
import PlusIcon from "../assets/icons/PlusIcon";
import ContentFilterTabs from "../components/ContentFilterTabs";
import EmbeddedContent from "../components/EmbeddedContent";
import Pagination from "../components/Pagination";

// Define ContentProps type if not already available
type ContentProps = {
  content_description: string;
  content_title: string;
  content_link: string;
  type: "Instagram" | "Twitter" | "Youtube" | "Medium" | "Text";
};

const ContentLibrary = () => {
  const [filter, setFilter] = useState<string>("All Content");

  // Replace this with data fetched from your backend later
  const allContent: ContentProps[] = [
    {
      content_description: "This is a test content",
      content_title: "This is test",
      type: "Instagram",
      content_link:
        "https://www.instagram.com/p/DJrii3Po-Qz/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    },
    {
      content_description: "This is a test content",
      content_title: "This is test",
      type: "Twitter",
      content_link: "https://x.com/heyhexadecimal/status/1925375309907730558",
    },
    {
      content_description: "This is a test content",
      content_title: "This is test",
      type: "Youtube",
      content_link: "https://youtu.be/RBH6_RgcToY?si=fSHriayH97ZHkzab",
    },
    {
      content_description:
        "A powerful quote that inspires creativity and innovation. The best way to get started is to quit talking and begin doing.” – Walt Disney",
      content_title: "Inspiration Quote",
      type: "Text",
      content_link:
        "The best way to get started is to quit talking and begin doing.” – Walt Disney",
    },
    {
      content_description:
        "Learn how to organize your digital life with Notion and build a productivity system inspired by Forte's 'Second Brain' method.",
      content_title: "How to Build a Second Brain with Notion",
      content_link:
        "https://medium.com/@neilpatel/how-to-build-a-second-brain-with-notion-3e4f7f2e5a5d",
      type: "Medium",
    },
  ];

  const handleFilterChange = (selectedFilter: string) => {
    console.log("Selected filter:", selectedFilter);
    setFilter(selectedFilter);
  };

  const handlePageChange = (page: number) => {
    console.log("Current Page:", page);
  };

  // Apply filtering
  const filteredContent =
    filter.toLowerCase() === "all content"
      ? allContent
      : allContent.filter(
          (content) => content.type.toLowerCase() === filter.toLowerCase(),
        );

  return (
    <div className="bg-background-light h-full px-5 xl:px-10 dark:bg-black">
      <div className="dark:text-text-dark-100 text-text-light-950 flex justify-between p-3 pt-7 pb-1">
        <div className="flex flex-col justify-start gap-1">
          <div className="text-3xl font-semibold">Content Library</div>
          <div className="text-md dark:text-text-dark-100/70 text-text-light-950 font-normal">
            All your saved content in one place
          </div>
        </div>
        <Button
          color="primary"
          icon={<PlusIcon height={25} width={25} />}
          text="Add Content"
        />
      </div>

      <div className="mt-5 p-4">
        <ContentFilterTabs onFilterChange={handleFilterChange} />

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredContent.map((content, index) => (
            <EmbeddedContent key={index} {...content} />
          ))}
        </div>

        <Pagination totalPages={8} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default ContentLibrary;
