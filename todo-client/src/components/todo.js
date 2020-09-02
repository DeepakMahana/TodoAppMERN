import React, { Component } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import TodoCard from './todocard';
import { GET_USER_TODOS_API, ADD_TODO_API, authMiddleWare, showSuccessMessage, showErrorMessage} from '../util/utility';

const styles = (theme) => ({
    root: {
    
    },
	title: {
		marginLeft: theme.spacing(2),
		flex: 1
	},
	submitButton: {
		display: 'block',
		color: 'white',
		textAlign: 'center',
		position: 'absolute',
		top: 14,
		right: 10
	},
	floatingButton: {
		position: 'fixed',
		top: 70,
        right: 0,
        marginTop: '10px',
        marginRight: '10px'
	},
	form: {
        width: '100%',
        height: '100%',
		margin: '0 auto'
	},
	toolbar: theme.mixins.toolbar,
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
	},
	pos: {
		marginBottom: 12
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
	},
	dialogeStyle: {
		maxWidth: '60%'
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
    }
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
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

class todo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			errors: [],
			open: false,
			uiLoading: true,
			buttonType: '',
            viewOpen: false
		};
    }

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	componentWillMount = () => {
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get(GET_USER_TODOS_API)
			.then((response) => {
                let respData = response.data;
                if(respData.status.toUpperCase() === "FAILED"){
                    this.setState({
                        uiLoading: false
					});
					showErrorMessage(respData.message)
                }else{
					// showSuccessMessage(respData.message)
                    this.setState({
                        todos: respData.data,
                        uiLoading: false
                    });
                }
			})
			.catch((error) => {
                showErrorMessage(error)			
				this.setState({
					uiLoading: false
				});
			});
	};

	deleteTodoHandler(data) {
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		let todoId = data.todo.todoId;
		axios
			.delete(`todo/${todoId}`)
			.then(() => {
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	handleEditClickOpen(data) {
		this.setState({
			title: data.todo.title,
			body: data.todo.body,
			todoId: data.todo.todoId,
			buttonType: 'Edit',
			open: true
		});
	}

	handleViewOpen(data) {
		this.setState({
			title: data.todo.title,
			body: data.todo.body,
			viewOpen: true
		});
	}

	render() {
		
        dayjs.extend(relativeTime);
        
		const { classes } = this.props;
		const { open, errors, viewOpen } = this.state;

		const handleClickOpen = () => {
			this.setState({
				title: '',
				description : '',
				buttonType: '',
				open: true
			});
		};

		const createTodo = (event) => {
			authMiddleWare(this.props.history);
			event.preventDefault();
			const userTodo = {
				todotitle: this.state.title,
				tododesc: this.state.description
			};
			const authToken = localStorage.getItem('AuthToken');
			axios.defaults.headers.common = { Authorization: `${authToken}` };
            axios
                .post(ADD_TODO_API, userTodo)
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
		};

		const handleViewClose = () => {
			this.setState({ viewOpen: false });
		};

		const handleClose = (event) => {
            this.setState({ open: false });
        };

        const resetForm = () => {
            this.setState({
                title: '',
                description: ''
            })
        }
        
		if (this.state.uiLoading === true) {
			return (
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
				</main>
			);
		} else {
			return (
				<main className={classes.content}>
					<div className={classes.toolbar} />

                    {/* Add Todo Button */}
					<Button
                        className={classes.floatingButton}
                        variant="contained"
						color="secondary"
						aria-label="Add Todo"
						onClick={handleClickOpen}
					>
						Add Todo
					</Button>

                    <Dialog open={open} onClose={handleClose} aria-labelledby="customized-dialog-title">
                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>Add A Todo Task</DialogTitle>
                        <DialogContent>
                            <form className={classes.form} noValidate>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="title"
                                            label="Todo Title"
                                            name="title"
                                            autoComplete="title"
                                            helperText={errors.title}
                                            value={this.state.title}
                                            error={errors.title ? true : false}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="description"
                                            label="Todo Description"
                                            name="description"
                                            autoComplete="description"
                                            multiline
                                            rows={5}
                                            rowsMax={5}
                                            helperText={errors.description}
                                            error={errors.description ? true : false}
                                            onChange={this.handleChange}
                                            value={this.state.description}
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={createTodo} color="primary" variant="contained">
                            Submit
                        </Button>
                        <Button onClick={resetForm} color="inherit" variant="contained">
                            Reset
                        </Button>
                        </DialogActions>
                    </Dialog>

                    {/* Todo Card Details */}
					<Grid container spacing={2}>
                        { 
                            this.state.todos.map((todo) => (
                                 <TodoCard key={todo._id} data = { todo } ></TodoCard>
						    ))
                        }
					</Grid>

					{/* <Dialog
						onClose={handleViewClose}
						aria-labelledby="customized-dialog-title"
						open={viewOpen}
						fullWidth
						classes={{ paperFullWidth: classes.dialogeStyle }}
					>
						<DialogTitle id="customized-dialog-title" onClose={handleViewClose}>
							{this.state.title}
						</DialogTitle>
						<DialogContent dividers>
							<TextField
								fullWidth
								id="todoDetails"
								name="body"
								multiline
								readonly
								rows={1}
								rowsMax={25}
								value={this.state.body}
								InputProps={{
									disableUnderline: true
								}}
							/>
						</DialogContent>
					</Dialog> */}

				</main>
        
            );
		}
	}
}

export default (withStyles(styles)(todo));