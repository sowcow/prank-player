import { MusicNote } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import blue from '@material-ui/core/colors/blue';

import PropTypes from 'prop-types';

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class SimpleDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, options, title, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
        <div>
          <List>
            {options.map(option => (
              <ListItem button onClick={() => this.handleListItemClick(option)} key={option.deviceId}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <MusicNote />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={option.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
  }
}

// SimpleDialog.propTypes = {
//   classes: PropTypes.object.isRequired,
//   onClose: PropTypes.func,
//   selectedValue: PropTypes.string,
// };

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

export default SimpleDialogWrapped


/*
class SimpleDialogDemo extends React.Component {
  state = {
    open: false,
    selectedValue: emails[1],
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    return (
      <div>
        <Typography variant="subtitle1">Selected: {this.state.selectedValue}</Typography>
        <br />
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open simple dialog
        </Button>
        <SimpleDialogWrapped
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default SimpleDialogDemo;
*/
