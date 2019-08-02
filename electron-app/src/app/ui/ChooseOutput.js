import { MusicNote } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import blue from '@material-ui/core/colors/blue';

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

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

export default SimpleDialogWrapped
