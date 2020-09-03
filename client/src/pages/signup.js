import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';
import SignPic from '../images/TorreLogo.png';
import { showSuccessMessage, showErrorMessage, USER_REGISTER_API } from '../util/utility';

const styles = (theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		height: 95,
		width: 95,
		flexShrink: 0,
		flexGrow: 0,
		marginTop: 20
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	progess: {
		position: 'absolute'
	}
});

class signup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			username: '',
			password: '',
			errors: [],
			loading: false
		};
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const newUserData = {
			email: this.state.email,
			username: this.state.username,
			password: this.state.password
		};
		axios
			.post(USER_REGISTER_API, newUserData)
			.then((response) => {
                let respData = response.data;	
                if(respData.status.toUpperCase() === "FAILED"){
					showErrorMessage(respData.message)
                    this.setState({
                        loading: false
					});
                }else{
					showSuccessMessage(respData.message)
                    this.props.history.push('/login');
                }
			})
			.catch((error) => {
				showErrorMessage(error)
				this.setState({
					loading: false
				});
			});
	};

	render() {
		const { classes } = this.props;
		const { errors, loading } = this.state;
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar src={SignPic} className={classes.avatar} />
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>

                            <Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
                                    autoComplete="email"
                                    type="email"
									helperText={errors.email}
									error={errors.email ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="username"
									label="User Name"
									name="username"
									autoComplete="username"
									helperText={errors.username}
									error={errors.username ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
									helperText={errors.password}
									error={errors.password ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>

						</Grid>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={this.handleSubmit}
                            disabled={loading || 
                                !this.state.email || 
                                !this.state.password ||
                                !this.state.username}
						>
							Sign Up
							{loading && <CircularProgress size={30} className={classes.progess} />}
						</Button>
                        
						<Grid container justify="flex-end">
							<Grid item>
								<Link href="login" variant="body2">
									Already have an account ? Sign in
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		);
	}
}

export default withStyles(styles)(signup);