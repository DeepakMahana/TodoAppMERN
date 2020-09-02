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
import SubTask from './subtask';
import relativeTime from 'dayjs/plugin/relativeTime';

const styles = (theme) => ({
    root: {
        marginTop: '25px',
        marginLeft: '25px',
        minWidth: 400,
        maxWidth: 500
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
});

class todocard extends Component {

	constructor(props) {
        super(props);
        let propsData = this.props.data;
		this.state = {
            todo: propsData,
            subexpand: false
		};
    }
    
    handleExpandClick = () => {
        this.setState({
            subexpand: !this.state.subexpand
        })
    }

	render() {
        
        const { classes } = this.props;
        
        return (

            <main className={classes.content}>
            <div className={classes.toolbar} />

                <Grid container spacing={2}>

                    {

                        <Grid item xs={12} sm={6} key={this.state.todo._id}>
                            <Card className={classes.root}>
                                <CardHeader
                                    action={
                                        <IconButton aria-label="delete">
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    }
                                    title = {this.state.todo.todotitle}
                                    subheader = {dayjs(this.state.todo.createdAt).fromNow()}
                                />
                                <CardContent>
                                    <Typography variant="body2" component="p">
                                        {this.state.todo.tododesc}
                                    </Typography>
                                </CardContent>
                                <CardActions style={{ width: '100%', justifyContent: 'flex-end' }}>
                                    <IconButton aria-label="Add a subtask">
                                        <AddCircleIcon />
                                    </IconButton>
                                
                                    <IconButton
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: this.state.subexpand,
                                        })}
                                        onClick={this.handleExpandClick}
                                        aria-expanded={this.state.subexpand}
                                        aria-label="Show More"
                                        >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </CardActions>

                                <Collapse in={this.state.subexpand} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        { 
                                            this.state.todo.subtasks ? this.state.todo.subtasks.map((subtask) => (
                                                <SubTask key={subtask._id} data = { subtask } ></SubTask>
                                            )) : ''
                                        }
                                    </CardContent>
                                </Collapse>

                            </Card>
                        </Grid>
                    }
                </Grid>
            </main>
        );
    }
}

export default (withStyles(styles)(todocard));