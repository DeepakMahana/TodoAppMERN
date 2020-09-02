import React, { Component } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const styles = () => ({
});

class subtask extends Component {

	constructor(props) {
        super(props);
        let propsData = this.props.data;
		this.state = {
            subtask: propsData
		};
    }

	render() {
        const { classes } = this.props;

        if(this.state.subtask){
            return (
                <Grid container spacing={2}>
                
                    <Grid item xs={12} sm={6} key={subtask._id}>
                        <Card className={classes.root}>
                        <CardHeader
                            action={
                                <IconButton aria-label="delete">
                                    <DeleteForeverIcon />
                                </IconButton>
                            }
                            title = {this.state.subtask.todotitle}
                            subheader = {dayjs(this.state.subtask.createdAt).fromNow()}
                        />
                        <CardContent>
                            <Typography variant="body2" component="p">
                                {this.state.subtask.tododesc}
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            );
        }else{
            return (
                <Typography variant="body2" component="p">
                    No Subtask
                </Typography>
            )
        }

        
    }
}

export default (withStyles(styles)(subtask));