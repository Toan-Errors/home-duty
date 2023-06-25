import React from "react";
import "./index.scss";
import { Avatar } from "@mui/material";
import { MotionConfig } from "framer-motion";
import { useCustomMutation } from "hooks/useQuery";
import { toast } from "react-toastify";

export default function Notifications({
  visible,
  setVisible,
  notifications = [],
}) {
  const { mutate: mutateAccept, isLoading: acceptLoading } = useCustomMutation(
    `/invitations/accept`,
    "put",
    {
      onSuccess: (data) => {
        if (data?.status === "success") {
          toast.success("Tham gia nhóm thành công");
        } else {
          toast.error(data?.message || "Có lỗi xảy ra");
        }
      },
    }
  );

  const { mutate: mutateDecline, isLoading: declineLoading } =
    useCustomMutation(`/invitations/decline`, "put", {
      onSuccess: (data) => {
        console.log(data);
      },
    });

  return (
    <div className={`nav__user-notifications-list ${visible ? "active" : ""}`}>
      {notifications.length === 0 && (
        <div className="nav__user-notifications-item-empty">
          <p>Không có thông báo nào</p>
        </div>
      )}
      {notifications.map((notification) => (
        <div key={notification?._id} className="nav__user-notifications-item">
          <Avatar
            src="https://picsum.photos/200"
            sx={{ width: 50, height: 50 }}
          />
          <div className="nav__user-notifications-item-info">
            <h3 className="nav__user-notifications-item-name">
              {notification?.sender?.name}
            </h3>
            <p className="nav__user-notifications-item-message">
              {notification?.message}
              {notification?.group?.name}
            </p>
          </div>
          {notification?.status === "pending" && (
            <div className="nav__user-notifications-item-button">
              <button
                className="nav__user-notifications-item-button-accept"
                onClick={() => {
                  mutateAccept({
                    id: notification?._id,
                  });
                }}
              >
                <i className="bx bx-check"></i>
              </button>
              <button className="nav__user-notifications-item-button-decline">
                <i className="bx bx-x"></i>
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
