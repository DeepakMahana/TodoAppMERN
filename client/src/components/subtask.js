import React, { Component } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import axios from 'axios';
import dayjs from 'dayjs';
import { DELETE_TODO_SUBTASK_API, authMiddleWare, showSuccessMessage, showErrorMessage} from '../util/utility';

const styles = () => ({})
class subtask extends Component {

	constructor(props) {
        super(props);
        let subtask = this.props.data;
        let todoid = this.props.todoid;
		this.state = {
            subtask: subtask,
            todoid: todoid,
            open: false
		};
    }

	render() {
        const { classes } = this.props;

        const handleClose = (event) => {
            this.setState({ open: false });
        };

        const deleteTodoConfirm = () => {
            this.setState({ open: true });
        };

        const deletesubtask = (event) => {
            authMiddleWare(this.props.history);
			event.preventDefault();
			const deletesubtask = {
                todoid: this.state.todoid,
                subtaskid: this.state.subtask._id
			};
			const authToken = localStorage.getItem('AuthToken');
			axios.defaults.headers.common = { Authorization: `${authToken}` };
            axios
                .post(DELETE_TODO_SUBTASK_API, deletesubtask)
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

        return (

            <Grid container spacing={2} alignItems="center" justify="center">
            
            {
                // Subtask Card
                <Grid item xs={12} key={subtask._id}>
                    <Card className={classes.root} style={{ backgroundColor : '#bbdefb' }}>
                    <CardHeader
                        action={
                            <IconButton aria-label="delete" onClick={deleteTodoConfirm}>
                                <HighlightOffIcon style={{ color: '#f44336', fontSize: '20' }} />
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

            }

            {   
                // Delete Confirmation Modal
                <Dialog
                  open={this.state.open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure ?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <b> You want to delete {this.state.subtask.todotitle} subtask. </b>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" variant="contained">
                            Disagree
                        </Button>
                        <Button onClick={deletesubtask} color="secondary" variant="contained" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            }

        </Grid>
        );
    }
}

export default (withStyles(styles)(subtask));