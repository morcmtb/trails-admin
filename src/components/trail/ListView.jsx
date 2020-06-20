import React from 'react';
import { useDispatch } from 'react-redux';
import { DateTime } from 'luxon';
import { push } from 'react-router-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardActionArea,
  CardContent,
  IconButton,
  Typography,
} from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';

export function Trail(props) {
  const { trail } = props;
  const dispatch = useDispatch();

  const goToTrail = (e) => {
    e.preventDefault();
    dispatch(push(`/trails/${trail.trailId}`));
  };

  return (
    <Card onClick={goToTrail}>
      <CardActionArea>
        <CardHeader
          avatar={icons(trail)}
          title={trail.trailName}
          subheader={`${trail.trailStatus} ${DateTime.fromMillis(
            trail.updatedAt
          ).toLocaleString(DateTime.DATETIME_FULL)}`}
          action={
            <IconButton>
              <ChevronRight />
            </IconButton>
          }
        ></CardHeader>
      </CardActionArea>
    </Card>
  );
}

const icons = (trail) => {
  if (trail.trailStatus !== 'Open') {
    return (
      <FontAwesomeIcon
        className="has-text-danger"
        icon={['far', 'traffic-light-stop']}
        size="2x"
      />
    );
  }
  if (trail.trailStatus === 'Open') {
    return (
      <FontAwesomeIcon
        className="has-text-success "
        icon={['far', 'traffic-light-go']}
        size="2x"
      />
    );
  }
};
