"use client";

// import { axiosClient } from "@/apis/axiosClient";
// import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
// import React, { useEffect } from "react";

const Page = () => {
  const { id } = useParams();

  // const { mutate } = useMutation({
  //   mutationFn: async () => {
  //     await axiosClient.put(`/records/${id}`);
  //   },
  // });

  // useEffect(() => {
  //   mutate();
  // }, [mutate]);

  return <div>{id}</div>;
};

export default Page;
