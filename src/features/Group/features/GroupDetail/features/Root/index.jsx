import { useCustomQuery } from "hooks/useQuery";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.scss";

export default function Root() {
  const { id } = useParams();

  const { data = {}, isLoading } = useCustomQuery(`groups/${id}`, "get", {
    enabled: !!id,
  });

  const members = data?.members || [];
  const tasks = data?.tasks || [];
  return (
    <div id="root-group-detail">
      <div className="banner">
        <img src={data?.image || "https://i.pravatar.cc/150?img=1"} alt="" />
      </div>
      <h1 className="title">{data?.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: data?.description }} />
      <h2>Thành viên:</h2>
      <ul>
        {members.map((member) => (
          <li key={member?.user?._id}>{member?.user?.name}</li>
        ))}
      </ul>
      <h2>Nhiệm vụ:</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}
