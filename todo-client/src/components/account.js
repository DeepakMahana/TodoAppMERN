import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Card, CardActions, CardContent, Divider, Grid, TextField } from '@material-ui/core';

import { capitalizeFirstLetter } from '../util/utility'

const styles = (theme) => ({
	root: {},
	cardheader: {
		marginTop: '10%',
		marginLeft: '5%'
	},
	infocard: {
		marginLeft: '60%',
		marginTop: '20%'
	},
	details: {
		display: 'flex',
		marginTop: '10px'
	},
	locationText: {
		paddingLeft: '15px'
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
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
 
	render() {
		const { classes } = this.props;
		if (this.state.uiLoading === true) {
			return (
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
				</main>
			);
		} else {
			return (

				<main>

					<Card className={classes.cardheader}>
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


					<Grid
						container
						spacing={0}
						direction="column"
						alignItems="center"
						justify="center"
						className={classes.infocard}
					>
						<Card>
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
												disabled={true}
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
												disabled={true}
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
					</Grid>
				</main>
			);
		}
	}
}

export default withStyles(styles)(account);