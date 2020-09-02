import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Card, CardActions, CardContent, Divider, Button, Grid, TextField } from '@material-ui/core';

import clsx from 'clsx';

import axios from 'axios';
import { GET_USER_DETAILS, authMiddleWare, capitalizeFirstLetter, showErrorMessage, showSuccessMessage } from '../util/utility'

const styles = (theme) => ({
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	toolbar: theme.mixins.toolbar,
	root: {},
	details: {
		display: 'flex'
	},
	avatar: {
		height: 110,
		width: 100,
		flexShrink: 0,
		flexGrow: 0
	},
	locationText: {
		paddingLeft: '15px'
	},
	buttonProperty: {
		position: 'absolute',
		top: '50%'
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
	},
	customError: {
		color: 'red',
		fontSize: '0.8rem',
		marginTop: 10
	},
	submitButton: {
		marginTop: '10px'
	}
});

class account extends Component {

	constructor(props) {
		super(props);
		let propsData = this.props.data;
		this.state = {
			email: propsData.email,
			username: propsData.username,
			password: '',
			uiLoading: true,
			buttonLoading: false
		};
	}

	componentWillMount = () => {
		this.setState({
			uiLoading: false
		})
	}
 
	// componentWillMount = () => {
	// 	authMiddleWare(this.props.history);
	// 	const authToken = localStorage.getItem('AuthToken');
	// 	axios.defaults.headers.common = { Authorization: `${authToken}` };
	// 	axios
	// 		.get(GET_USER_DETAILS)
	// 		.then((response) => {
    //             let respData = response.data;
    //             if(respData.status.toUpperCase() === "FAILED"){
    //                 this.setState({ errorMsg: 'Error in retrieving the data' });
	// 				showErrorMessage(respData.message)
    //             }else{
	// 				showSuccessMessage(respData.message)
    //                 this.setState({
    //                     email: response.data.userCredentials.firstName,
    //                     username: response.data.userCredentials.lastName,
    //                     profilePicture: ``,
    //                     uiLoading: false
    //                 });
    //             }
	// 		})
	// 		.catch((error) => {
	// 			if(error.response.status === 403) {
	// 				this.props.history.push('/login')
	// 			}
	// 			this.setState({ errorMsg: 'Error in retrieving the data' });
	// 		});
	// };

	render() {
		const { classes, ...rest } = this.props;
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

					

						<Card {...rest} className={clsx(classes.root, classes)}>
							<CardContent>
								<div className={classes.details}>
									<div>
										<Typography className={classes.locationText} gutterBottom variant="h4">
											Welcome {capitalizeFirstLetter(this.state.username)}
										</Typography>
									</div>
								</div>
							</CardContent>
							<Divider />
						</Card>
					
					

					<br />

					
						<Card {...rest} className={clsx(classes.root, classes)}>
							<form autoComplete="off" noValidate>
								<Divider />
								<CardContent>
									<Grid container spacing={3}>

										<Grid item xs={12}>
											<TextField
												fullWidth
												label="User Name"
												margin="dense"
												name="userHandle"
												disabled={false}
												variant="outlined"
												value={this.state.username}
												onChange={this.handleChange}
											/>
										</Grid>
										
										<Grid item xs={12}>
											<TextField
												fullWidth
												label="Email"
												margin="dense"
												name="email"
												variant="outlined"
												disabled={false}
												value={this.state.email}
												onChange={this.handleChange}
											/>
										</Grid>
									
									</Grid>
								</CardContent>
								<Divider />
								<CardActions />
							</form>
						</Card>
						<Button
							color="primary"
							variant="contained"
							type="submit"
							className={classes.submitButton}
							onClick={this.updateFormValues}
							disabled={
								!this.state.username ||
								!this.state.email
							}
						>
							Save details
							{this.state.buttonLoading && <CircularProgress size={30} className={classes.progess} />}
						</Button>

					
				</main>
			);
		}
	}
}

export default withStyles(styles)(account);