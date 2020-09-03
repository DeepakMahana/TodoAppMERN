import React, { Component } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import axios from 'axios';
import dayjs from 'dayjs';
import SubTask from './subtask';
import { DELETE_TODO_API, ADD_TODO_SUBTASK_API, authMiddleWare, showSuccessMessage, showErrorMessage} from '../util/utility';

const styles = (theme) => ({
    root: {
        marginTop: '50px',
        marginLeft: '40px',
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
    },
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
    }
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    viewRoot: {
        padding: theme.spacing(2)
    }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
}))(MuiDialogActions);

class todocard extends Component {

	constructor(props) {
        super(props);
        let propsData = this.props.data;
		this.state = {
            todo: propsData,
            subexpand: false,
            open: false,
            subtask: false,
            errors: [],
            subtitle: '',
            subdesc: ''

		};
    }

    handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};
    
    handleExpandClick = () => {
        this.setState({
            subexpand: !this.state.subexpand
        })
    }

	render() {

        const handleClose = (event) => {
            this.setState({ open: false });
        };

        const deleteTodoConfirm = () => {
            this.setState({ open: true });
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

        const addSubtaskModal = () => {
            this.setState({ subtask: true });
        };

        const closeSubtaskModal = (event) => {
            this.setState({ subtask: false });
        };

        const createSubtask = (event) => {
            authMiddleWare(this.props.history);
			event.preventDefault();
			const addSubtask = {
                todoid: this.state.todo._id,
                todotitle: this.state.subtitle,
                tododesc: this.state.subdesc
			};
			const authToken = localStorage.getItem('AuthToken');
			axios.defaults.headers.common = { Authorization: `${authToken}` };
            axios
                .post(ADD_TODO_SUBTASK_API, addSubtask)
				.then((response) => {
                    let respData = response.data;
                    if(respData.status.toUpperCase() === "FAILED"){
                        this.setState({
                            subtask: false
                        });
                        showErrorMessage(respData.message)
                    }else{
                        showSuccessMessage(respData.message)
                        this.setState({ subtask: false });
                        window.setTimeout(function(){window.location.reload()},500)
                    }
				})
				.catch((error) => {
                    showErrorMessage(error)
					this.setState({ subtask: false });
				});
        }

        const resetForm = (event) => {
            this.setState({
                subtitle: '',
                subdesc: ''
            })
        }
        
        const { classes } = this.props;
        
        return (

            //  Todo Main Card
            <main className={classes.content}>
            <div className={classes.toolbar} />
                <Grid container spacing={2}>
                    {
                        <Grid item xs={12} sm={6} key={this.state.todo._id}>
                            <Card className={classes.root} style= {{ backgroundColor: '#eeeeee'}}>
                                <CardHeader
                                    action={
                                        <IconButton aria-label="delete" onClick={deleteTodoConfirm}>
                                            <DeleteForeverIcon style={{ color: 'red', fontSize: '25' }} />
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
                                    <IconButton aria-label="Add a subtask" onClick={addSubtaskModal}>
                                        <AddCircleIcon style={{ color: '#087f23', fontSize: '25' }}/>
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
                                                <SubTask key={subtask._id} data = { subtask } todoid = { this.state.todo._id } ></SubTask>
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

                        {/* Create a Subtask Modal */}
                        <Dialog open={this.state.subtask} onClose={closeSubtaskModal} aria-labelledby="customized-dialog-title">
                        <DialogTitle id="customized-dialog-title" onClose={closeSubtaskModal}>Add A Subtask</DialogTitle>
                        <DialogContent>
                                <Typography variant="body2" component="p">
                                    For : {this.state.todo.todotitle}
                                </Typography>
                        </DialogContent>
                        <DialogContent>
                            <form className={classes.form} noValidate>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="subtitle"
                                            label="Todo Title"
                                            name="subtitle"
                                            autoComplete="subtitle"
                                            helperText={this.state.errors.subtitle}
                                            value={this.state.subtitle}
                                            error={this.state.errors.subtitle ? true : false}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="subdesc"
                                            label="Todo Description"
                                            name="subdesc"
                                            autoComplete="subdesc"
                                            multiline
                                            rows={5}
                                            rowsMax={5}
                                            helperText={this.state.errors.subdesc}
                                            error={this.state.errors.subdesc ? true : false}
                                            onChange={this.handleChange}
                                            value={this.state.subdesc}
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={createSubtask} color="primary" variant="contained">
                            Submit
                        </Button>
                        <Button onClick={resetForm} color="inherit" variant="contained">
                            Reset
                        </Button>
                        </DialogActions>
                    </Dialog>

                </Grid>
            </main>
        );
    }
}

export default (withStyles(styles)(todocard));