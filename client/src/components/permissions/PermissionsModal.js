import React, { useEffect, useContext, Fragment, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import PostsContext from "../../context/posts/postsContext";
import axios from "axios";

const PermissionsModal = () => {
  const authContext = useContext(AuthContext);
  const postsContext = useContext(PostsContext);

  const [allUsers, setAllUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [updateValues, setUpdateValues] = useState(false);
  const [hiddenUsers, setHiddenUsers] = useState([]);

  const { user } = authContext;
  const {
    getAllPermissions,
    usersPermissions,
    permissionsModal,
    hidePermissionsModal,
    addPermission,
    deletePermission,
    hideUser,
  } = postsContext;

  useEffect(async () => {
    if (user) {
      getAllPermissions(user.id);
      user.role == "admin" && setIsAdmin(true);

      const res = await axios.get("/api/users", {});
      const users = await res.data;

      let userOptions = users.filter((element) => {
        return element.id !== user.id;
      });

      setAllUsers(userOptions);
    }
  }, [user]);

  const handleOnChange = (e) => {
    addPermission(user.id, e.target.value);
  };

  const handleOnHide = async (e) => {
    hideUser(e.target.value);
  };

  const handleOnClick = (e) => {
    deletePermission(user.id, e.target.value);
  };

  return (
    <Fragment>
      {permissionsModal && (
        <div className="modal">
          <button className="delete-post" onClick={hidePermissionsModal}>
            X
          </button>
          <p>Users that can edit your posts:</p>
          {usersPermissions &&
            usersPermissions.map((user, index) => (
              <div style={{ display: "flex" }} key={index}>
                <p>{user.first_name}</p>
                <button
                  className="remove-permission"
                  value={user.id}
                  onClick={handleOnClick}
                >
                  X
                </button>
              </div>
            ))}

          <select onChange={handleOnChange} className="select" defaultValue="">
            <option value="" disabled>
              Add new permission
            </option>
            {allUsers.map((user, index) => {
              return (
                <option value={user.id} key={index}>
                  {user.first_name}
                </option>
              );
            })}
          </select>

          {isAdmin && (
            <div>
              <p>Hidden users:</p>
              <select
                onChange={handleOnHide}
                className="select"
                defaultValue=""
              >
                <option value="" disabled>
                  Hide users
                </option>
                {allUsers.map((user, index) => {
                  return (
                    <option value={user.id} key={index}>
                      {user.first_name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default PermissionsModal;
