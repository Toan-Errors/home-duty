import SearchUserDialog from "features/Group/components/Dialog/SearchUserDialog";
import ListGroup from "features/Group/components/ListGroup";
import { useCustomQuery } from "hooks/useQuery";
import React from "react";

export default function MyGroup() {
  const { data, isLoading, error } = useCustomQuery("groups");
  const [group, setGroup] = React.useState(null);

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <h1 className="title">Nhóm của bạn</h1>
      <ListGroup setGroup={setGroup} groups={data} />
      <SearchUserDialog open={group} setOpen={setGroup} />
    </>
  );
}
