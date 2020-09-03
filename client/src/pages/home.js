import React, { Component } from 'react';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import NotesIcon from '@material-ui/icons/Notes';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';
import ProfilePic from '../images/TorreLogo.png';
import Account from '../components/account';
import Todo from '../components/todo';
import { GET_USER_DETAILS, authMiddleWare, capitalizeFirstLetter } from '../util/utility'

const drawerWidth = 240;

const styles = (theme) => ({
	root: {
        marginTop: '40px',
        display: 'flex'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	avatar: {
		height: 95,
		width: 95,
		flexShrink: 0,
		flexGrow: 0,
		marginTop: 20
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
	},
	toolbar: theme.mixins.toolbar
});

class home extends Component {

	state = {
		render: false
	};

	loadAccountPage = (event) => {
		this.setState({ render: true });
	};

	loadTodoPage = (event) => {
		this.setState({ render: false });
	};

	logoutHandler = (event) => {
		localStorage.removeItem('AuthToken');
		this.props.history.push('/login');
	};

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			username: '',
			uiLoading: true,
			imageLoading: false
		};
	}

	componentWillMount = () => {
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get(GET_USER_DETAILS)
			.then((response) => {
                let respData = response.data;
                if(respData.status.toUpperCase() === "FAILED"){
                    this.setState({ errorMsg: 'Error in retrieving the data' });
                }else{
                    this.setState({
                        email: respData.data.email,
                        username: respData.data.username,
                        uiLoading: false
                    });
                }
			})
			.catch((error) => {
				if(error.response.status === 403) {
					this.props.history.push('/login')
				}
				this.setState({ errorMsg: 'Error in retrieving the data' });
			});
	};

	render() {
		const { classes } = this.props;		
		if (this.state.uiLoading === true) {
			return (
				<div className={classes.root}>
					{this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
				</div>
			);
		} else {
			return (

				<div className={classes.root}>
					<CssBaseline />

					<AppBar position="fixed" className={classes.appBar}>
						<Toolbar>
							<Typography variant="h6" noWrap>
								Todo Task Manager
							</Typography>
						</Toolbar>
					</AppBar>

					<Drawer
						className={classes.drawer}
						variant="permanent"
						classes={{
							paper: classes.drawerPaper
						}}
					>
						<div className={classes.toolbar} />
						<Divider />
						<center>
                            <Avatar src={ProfilePic} className={classes.avatar} />
							<p>
								{' '}
								<Typography variant="h6" noWrap>
									{capitalizeFirstLetter(this.state.username)}
								</Typography>
							</p>
						</center>
						<Divider />
						<List>
							<ListItem button key="Todo" onClick={this.loadTodoPage}>
								<ListItemIcon> {' '}
									<NotesIcon />{' '}
								</ListItemIcon>
								<ListItemText primary="Todo's" />
							</ListItem>
							<ListItem button key="Account" onClick={this.loadAccountPage}>
								<ListItemIcon> {' '}
									<AccountBoxIcon />{' '}
								</ListItemIcon>
								<ListItemText primary="Account" />
							</ListItem>
							<ListItem button key="Logout" onClick={this.logoutHandler}>
								<ListItemIcon> {' '}
									<ExitToAppIcon />{' '}
								</ListItemIcon>
								<ListItemText primary="Logout" />
							</ListItem>
						</List>
					</Drawer>
					<div>{this.state.render ? <Account data = { this.state }/> : <Todo />}</div>
				</div>
			);
		}
	}
}

export default withStyles(styles)(home);