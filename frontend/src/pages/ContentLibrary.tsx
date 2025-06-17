import { useEffect, useState } from "react";
import Button from "../components/Button";
import PlusIcon from "../assets/icons/PlusIcon";
import ContentFilterTabs from "../components/ContentFilterTabs";
import EmbeddedContent from "../components/EmbeddedContent";
import Pagination from "../components/Pagination";
import { ContentProps } from "../utils/types";
import { getAllContent } from "../api/content";
import ShareIcon from "../assets/icons/ShareIcon";

const ContentLibrary = () => {
  const [filter, setFilter] = useState<string>("All Content");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [content, setContent] =  useState<ContentProps[] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 6;

  const getContentData = async (page: number, filter: string) => {
    setIsLoading(true);
    try {
      const contentType =
        filter.toLowerCase() === "all content" ? undefined : filter;
      const res = await getAllContent(page, limit, contentType);
      if (res.success) {
        const mappedData = res.content.map((item: any) => ({
          content_id: item.content_id,
          content_link: item.content_link,
          content_type: item.Type?.type_name ?? "Unknown",
          content_title: item.content_title,
          content_createdAt: new Date(item.createdAt).toLocaleString(),
          content_description: item.content_description,
          content_tag: item.tags.map((tag: any) => tag.name).join(", "),
        }));
        setContent(mappedData);
        setTotalPages(Math.ceil(res.totalCount / limit));
      } else {
        setContent([]);
      }
    } catch (error) {
      console.log("Failed to fetch Content : ", error);
      setContent([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getContentData(page, filter);
  }, [page, filter]);

  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const filteredContent =
    filter.toLowerCase() === "all content"
      ? content
      : content?.filter(
          (content) =>
            content.content_type?.toLowerCase() === filter.toLowerCase(),
        );

  return (
    <div className="bg-background-light mx-auto h-full w-full max-w-screen-2xl px-5 xl:px-10 dark:bg-black">
      <div className="dark:text-text-dark-100 text-text-light-950 flex justify-between p-3 pt-7 pb-1">
        <div className="flex flex-col justify-start gap-1">
          <div className="text-3xl font-semibold">Content Library</div>
          <div className="text-md dark:text-text-dark-100/70 text-text-light-950 font-normal">
            All your saved content in one place
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button
            color="primary"
            icon={<PlusIcon height={25} width={25} />}
            text="Add Content"
          />
          <Button
            color="secondary"
            icon={<ShareIcon height={25} width={25} />}
            text="Share Content"
          />
        </div>
      </div>

      <div className="mb-8 w-full overflow-x-auto">
        <div className="flex w-max space-x-4">
          <ContentFilterTabs onFilterChange={handleFilterChange} />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <div className="border-primary-600 h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"></div>
        </div>
      ) : filteredContent?.length === 0 ? (
        <div className="text-grey-500 py-10 text-center text-lg font-medium">
          No Content Found in this Category.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredContent?.map((content, index) => (
            <EmbeddedContent key={index} {...content} />
          ))}
        </div>
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ContentLibrary;
