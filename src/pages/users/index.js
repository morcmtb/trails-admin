import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'react-router-redux';
import { DateTime } from 'luxon';
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
  View,
  Divider,
  Grid,
} from '@material-ui/core';
import { ChevronRight, Delete } from '@material-ui/icons';

import { getUsers } from '../../actions/users';

export function Users(props) {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div>
      <List>
        {users.map((user) => {
          const { Attributes, Username, UserCreateDate, groups } = user;
          const { Value } = Attributes.filter((a) => a.Name === 'email')[0];

          return (
            <>
              <ListItem key={Username}>
                <ListItemAvatar>
                  <Avatar>{Value.charAt(0).toUpperCase()}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={Value}
                  secondary={DateTime.fromISO(UserCreateDate).toLocaleString({
                    weekday: 'short',
                    month: 'short',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                />

                <div
                  style={{
                    display: 'flex',
                    flex: 1,
                    border: 'solid 1px red',
                  }}
                >
                  {groups.map((group, gid) => (
                    <Group key={gid} {...group} />
                  ))}
                </div>

                <IconButton
                  onClick={() => {
                    dispatch(push(`/users/${Username}`));
                  }}
                >
                  <ChevronRight />
                </IconButton>
              </ListItem>
              <Divider />
            </>
          );
        })}
      </List>
    </div>
  );
}

function Group(props) {
  const { GroupName } = props;
  return <Chip size="small" variant={'outlined'} label={GroupName} />;
}
