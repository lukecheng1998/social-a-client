import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 50,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};
export class Chatlayout extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      chats: { body, createdAt, userHandle, chatId, userImage },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        >
          <CardContent className={classes.content}>
          <Typography variant="h5">{body}</Typography>
            <Typography
              variant="body"
              component={Link}
              to={`/users/${userHandle}`}
              color="primary"
            >
              {userHandle}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>
            
          </CardContent>
        </CardMedia>
      </Card>
    );
  }
}
Chatlayout.propTypes = {
    user: PropTypes.object.isRequired,
    chats: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    user:state.user
})
export default connect(mapStateToProps)(withStyles(styles)(Chatlayout));
