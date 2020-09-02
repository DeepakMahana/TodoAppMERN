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
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import axios from 'axios';
import dayjs from 'dayjs';
import SubTask from './subtask';
import { DELETE_TODO_API, authMiddleWare, showSuccessMessage, showErrorMessage} from '../util/utility';

const styles = (theme) => ({
    root: {
        marginTop: '40px',
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
            subexpand: false,
            open: false
		};
    }
    
    handleExpandClick = () => {
        this.setState({
            subexpand: !this.state.subexpand
        })
    }

	render() {

        const deleteTodoConfirm = () => {
            this.setState({ open: true });
        };

        const handleClose = (event) => {
            this.setState({ open: false });
        };

        const deleteTodo = (event) => {
            authMiddleWare(this.props.history);
			event.preventDefault();
			const deleteTodo = {
				todoid: this.state.todo._id,
			};
			const authToken = localStorage.getItem('AuthToken');
			axios.defaults.headers.common = { Authorization: `${authToken}` };
            axios
                .post(DELETE_TODO_API, deleteTodo)
				.then((response) => {
                    let respData = response.data;
                    if(respData.status.toUpperCase() === "FAILED"){
                        this.setState({
                            open: false
                        });
                        showErrorMessage(respData.message)
                    }else{
                        showSuccessMessage(respData.message)
                        this.setState({ open: false });
                        window.setTimeout(function(){window.location.reload()},500)
                    }
				})
				.catch((error) => {
                    showErrorMessage(error)
					this.setState({ open: false });
				});
        }
        
        const { classes } = this.props;
        
        return (

            //  Todo Main Card
            <main className={classes.content}>
            <div className={classes.toolbar} />
                <Grid container spacing={2}>
                    {
                        <Grid item xs={12} sm={6} key={this.state.todo._id}>
                            <Card className={classes.root}>
                                <CardHeader
                                    action={
                                        <IconButton aria-label="delete" onClick={deleteTodoConfirm}>
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
                                            this.state.todo.subtasks && (this.state.todo.subtasks.length > 0) ? this.state.todo.subtasks.map((subtask) => (
                                                <SubTask key={subtask._id} data = { subtask } ></SubTask>
                                            )) :    <Typography variant="body2" component="p">
                                                        <b>No Subtasks Found</b>
                                                    </Typography>
                                        }
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </Grid>
                    }

                        {/* Delete Confirmation Popup */}
                        <Dialog
                            open={this.state.open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Are you sure ?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <b> Note* - All the subtasks assigned to the todo task will also get deleted. </b>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary" variant="contained">
                                    Disagree
                                </Button>
                                <Button onClick={deleteTodo} color="secondary" variant="contained" autoFocus>
                                    Agree
                                </Button>
                            </DialogActions>
                        </Dialog>
                </Grid>
            </main>
        );
    }
}

export default (withStyles(styles)(todocard));