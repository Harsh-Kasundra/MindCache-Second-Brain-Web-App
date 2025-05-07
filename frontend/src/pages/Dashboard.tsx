import React from "react";
import Button from "../components/Button";
import ShareIcon from "../assets/icons/ShareIcon";

const Dashboard = () => {
  return (
    <div className="bg-background-light h-full dark:bg-black">
      <div className="dark:border-secondary-950 dark:text-text-dark-100 text-text-light-950 flex justify-between border-b p-4 text-3xl">
        <div>All Post</div>
        <div className="flex justify-around gap-3">
          <Button
            color="secondary"
            text="Share Your Brain"
            icon={<ShareIcon height={25} width={25} />}
          />
          <Button color="primary" text="Add Content" />
        </div>
      </div>
      <div className="dark:text-text-dark-100 text-text-light-950 p-4">
        Content
      </div>
    </div>
  );
};

export default Dashboard;
