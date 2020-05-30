import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostScream from '../scream/PostScream';
//require("react-router-dom").Link;
import MyButton from '../../util/MyButton';
//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
//icons
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from './Notifications';
import CommentIcon from '@material-ui/icons/Comment';
class navbar extends Component {
    render() {
        const { authenticated } = this.props
        return (
            <AppBar position="fixed">
                <ToolBar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <PostScream />
                            <Link to="/">
                                <MyButton tip="Home">
                                    <HomeIcon />
                                </MyButton>
                            </Link>

                            <Notifications />
                            <Link to="/Chat">
                                <MyButton tip="Chat">
                                    <CommentIcon />
                                </MyButton>
                            </Link>

                        </Fragment>
                    ) : (<Fragment>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
                    </Fragment>)}
                </ToolBar>
            </AppBar>
        )
    }
}
navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
    authenticated: state.user.authenticated
});
export default connect(mapStateToProps)(navbar);
