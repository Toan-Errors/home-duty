import React from "react";
import "./index.scss";
import { LoadingButton } from "@mui/lab";
import { Stack, Tooltip } from "@mui/material";
import { useCustomMutation } from "hooks/useQuery";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { PATHS_DASHBOARD } from "routes/paths";
import useAuth from "hooks/useAuth";

function GroupCard({ group, setGroup }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const optionsRemove = {
    onSuccess: (data) => {
      if (data?._id) {
        toast.success("Xóa nhóm thành công");
        queryClient.setQueryData("groups", (old) =>
          old.filter((item) => item._id !== group._id)
        );
      } else {
        toast.error(data?.message || "Có lỗi xảy ra");
      }
    },
  };
  const { mutate, isLoading } = useCustomMutation(
    `/groups/${group._id}`,
    "delete",
    optionsRemove
  );

  return (
    <div id="group_card">
      <div className="group_card--header">
        <Link to={`${PATHS_DASHBOARD.detail.link}/${group._id}`}>
          <img src="https://i.pravatar.cc/150?img=1" alt="" />
        </Link>
        <Link to={`${PATHS_DASHBOARD.detail.link}/${group._id}`}>
          <div className="group_card--info">
            <h3 className="group_card--name">{group.name}</h3>
            <div
              className="group_card--description"
              dangerouslySetInnerHTML={{ __html: group.description }}
            ></div>
          </div>
        </Link>
        {group?.admin === user?._id && (
          <LoadingButton
            variant="contained"
            color="primary"
            loading={isLoading}
            onClick={() => mutate()}
            className="group_card--delete-button"
          >
            x
          </LoadingButton>
        )}
      </div>
      <div className="group_card--body">
        <div className="group_card--members">
          {group.members.map((member) => (
            <Tooltip title={member?.user?.name} key={member._id}>
              <img
                src={member.avatar || "https://i.pravatar.cc/150?img=1"}
                alt=""
              />
            </Tooltip>
          ))}

          {group.members.length === 0 && (
            <p className="group_card--empty">Chưa có thành viên</p>
          )}
        </div>

        {user?._id === group?.admin && (
          <Stack
            direction="row"
            spacing={2}
            sx={{
              marginTop: "auto",
              marginBottom: "auto",
              mt: 2,
            }}
            alignItems="center"
            justifyContent="flex-end"
          >
            <LoadingButton
              variant="contained"
              color="primary"
              loading={false}
              loadingPosition="start"
              onClick={() => setGroup(group)}
            >
              Mời
            </LoadingButton>
            <Link to={`${PATHS_DASHBOARD.group.create}/${group._id}/edit`}>
              <LoadingButton
                variant="contained"
                color="primary"
                loading={false}
                loadingPosition="start"
              >
                Chỉnh sửa
              </LoadingButton>
            </Link>
          </Stack>
        )}
      </div>
    </div>
  );
}

export default React.memo(GroupCard);
