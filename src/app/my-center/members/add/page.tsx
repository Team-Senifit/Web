import React from "react";
import EditForm from "../panel/EditForm";
import ReturnButton from "../panel/ReturnButton";

const Page = () => {
  return (
    <div>
      <ReturnButton href="/my-center/members" />
      <EditForm />
    </div>
  );
};

export default Page;
