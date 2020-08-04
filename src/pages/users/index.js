import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import {
  makeStyles,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  Typography,
  Chip,
} from "@material-ui/core";
import { Image, Delete } from "@material-ui/icons";

import { getUsers } from "../../actions/users";

export function Users(props) {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div>
      <List>
        {users.map((user, uid) => {
          console.log(user);
          const { Attributes, Username, UserCreateDate, groups } = user;
          return (
            <ListItem key={uid}>
              <ListItemAvatar>
                <Avatar>
                  <Image />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={Username}
                secondary={
                  <>
                    <Typography>
                      {DateTime.fromISO(UserCreateDate).toLocaleString({
                        weekday: "short",
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                    {groups.map((group, gid) => (
                      <Group {...group} />
                    ))}
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

function Group(props) {
  const { GroupName } = props;
  const [active, setActive] = useState(false);
  return (
    <Chip
      size="small"
      variant={active ? "outlined" : "default"}
      label={GroupName}
      onClick={() => setActive(!active)}
      onDelete={() => alert("delete user action")}
    />
  );
}
