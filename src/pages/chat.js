import React, { Component } from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import { getChats } from "../redux/actions/dataActions";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { sendAChat, clearErrors } from "../redux/actions/dataActions";
import { connect } from "react-redux";

import Chatlayout from "../components/chat/Chatlayout";

const styles = (theme) => ({
  ...theme.spreadThis,
});

class chat extends Component {
  state = {
    body: "",
    errors: {},
  };
  componentDidMount() {
    this.props.getChats();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        body: "",
        errors: {},
      });
    }
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.sendAChat({ body: this.state.body });
  };
  refreshpage = () => {
    window.location.reload();
  }
  render() {
    const { errors } = this.state;
    const {
      classes,

      UI: { loading },
    } = this.props;
    const { chats, screams } = this.props.data;
    let recentChatMarkup = !loading ? (
      screams.map((chat) => <Chatlayout key={chat.chatId} chats={chat} />)
    ) : (
      chats.map((chat) => <Chatlayout key={chat.chatId} chats={chat} />)
    );
    return (
      <Grid container>
        <Typography variant="h2" align="center">
          Chat with people!
        </Typography>
        <Grid container>
          <Typography variant="body" align="center">
            In beta testing
          </Typography>
        </Grid>

        <Grid container spacing={16}>
          <Grid item sm={8} xs={12}>
            {recentChatMarkup}
          </Grid>
        </Grid>
        <Grid container align="center">
          <form onSubmit={this.handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="Chat"
              multiline
              rows="2"
              placeholder="Talk to your fellow idiots"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={this.handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
             
            >
              Send
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                  onChange={this.refreshpage}
                />
              )}
            </Button>
          </form>
        </Grid>
      </Grid>
    );
  }
}
chat.propTypes = {
  getChats: PropTypes.func.isRequired,
  sendAChat: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI,
});

export default connect(mapStateToProps, { sendAChat, clearErrors, getChats })(
  withStyles(styles)(chat)
);
