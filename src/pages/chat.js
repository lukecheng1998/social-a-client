import React, { Component } from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { sendAChat, clearErrors } from "../redux/actions/dataActions";
import { connect } from "react-redux";

const styles = (theme) => ({
  ...theme.spreadThis,
});

export class chat extends Component {
  state = {
    body: "",
    errors: {},
  };
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
    this.props.sendAChat({body: this.state.body})
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;

    return (
      <Grid container>
        <Typography variant="h2">Chat with people!</Typography>
        <Grid container align="center">
          <form onSubmit={this.handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="Chat"
              multiline
              rows="3"
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
  sendAChat: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { sendAChat, clearErrors })(
  withStyles(styles)(chat)
);
