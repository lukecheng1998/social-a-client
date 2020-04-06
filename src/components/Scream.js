import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
//MUI stuff
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import { Typography } from '@material-ui/core';
const styles = {
    card: {
        display: 'flex'
    }
}
class Scream extends Component {
    render(){
        const{ classes, scream : {body, createdAt, userImage, userHandle, screamId, likeCount, commentCount} } = this.props;//destructuring
        //const classes = this.props.classes;

        return(
            <Card>
                <CardMedia
                    image = {userImage}
                    title="Profile image" />
                <CardContent>
                    <Typography variant = "h5">{userHandle}</Typography>
                    <Typography variant="body2" color= "textSecondary">{createdAt}</Typography>
                    <Typography variant="body1">{body}</Typography>
                </CardContent>
            </Card>
        )
    }
}
export default withStyles(styles)(Scream)