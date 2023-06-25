import { Dialog } from "@mui/material";
import React, { useEffect } from "react";
import "./search-user-dialog.scss";
import useAxios from "hooks/useAxios";
import { ClipLoader } from "react-spinners";
import { useCustomMutation } from "hooks/useQuery";
import { toast } from "react-toastify";

function SearchUserDialog({ open = null, setOpen }) {
  const [search, setSearch] = React.useState("");
  const [users, setUsers] = React.useState([]);

  const { data, isLoading, refetch } = useAxios({
    url: `/users/search?name=${search}&group=${open?._id}`,
  });

  const { mutate, isLoading: addLoading } = useCustomMutation(
    "/invitations",
    "post",
    {
      onSuccess: (data) => {
        if (data?._id) {
          toast.success("Gửi lời mời thành công");
          refetch();
        } else {
          toast.error(data?.message || "Có lỗi xảy ra");
        }
      },
    }
  );

  useEffect(() => {
    if (data) {
      setUsers(data || []);
    }
  }, [data]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search === "") {
        setUsers([]);
      } else {
        refetch();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <Dialog
      id="search-user-dialog"
      open={open}
      onClose={() => {
        setSearch("");
        setOpen(null);
      }}
      fullWidth={true}
      maxWidth="sm"
    >
      <div className="dialog__header">
        <h2 className="dialog__title">Tìm kiếm người dùng</h2>
        <button
          onClick={() => {
            setSearch("");
            setOpen(null);
          }}
          className="dialog__close"
        >
          <i className="bx bx-x"></i>
        </button>
      </div>
      <div className="dialog__body">
        <div className="dialog__search">
          <input
            value={search}
            onChange={handleSearch}
            type="text"
            placeholder="Tìm kiếm người dùng"
          />
          <button className="dialog__search-button">
            <i className="bx bx-search"></i>
          </button>
        </div>
        <div className="dialog__list">
          {isLoading && (
            <div>
              <ClipLoader color="#f86c6b" />
            </div>
          )}
          {users &&
            users.map((user) => (
              <div key={user?._id} className="dialog__item">
                <img src={user?.avatar} alt="" />
                <div className="dialog__item-info">
                  <h3 className="dialog__item-name">{user?.name}</h3>
                  <p className="dialog__item-email">{user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    mutate({
                      receiver: user?._id,
                      message: "Bạn có muốn tham gia nhóm này không?",
                      group: open?._id,
                    });
                  }}
                  className="dialog__item-button"
                >
                  {addLoading ? (
                    <ClipLoader color="#fff" />
                  ) : (
                    <>
                      {user?.invitationStatuses.length === 0 ? (
                        <i className="bx bx-plus"></i>
                      ) : (
                        <i className="bx bx-check"></i>
                      )}
                    </>
                  )}
                </button>
              </div>
            ))}
        </div>
      </div>
    </Dialog>
  );
}

export default SearchUserDialog;
