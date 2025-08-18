import EditForm from "@/app/my-center/members/panel/EditForm";
import React from "react";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const data: IMember = {
    id: parseInt(id),
    name: "홍길동",
    age: 70,
    grade: "1등급",
    gender: "남성",
  };
  return (
    <div>
      <EditForm isEdit defaultValues={data} />
    </div>
  );
};

export default Page;
