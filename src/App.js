import React from 'react'

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

// Material Icons
import Close from '@material-ui/icons/Close';
import Error from '@material-ui/icons/Error';
import Menu from '@material-ui/icons/Menu';
import Search from '@material-ui/icons/Search';

// Other
import { withStyles } from '@material-ui/core/styles';

import { gradeItems as students } from './list';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: students.sort((a, b) => {
        if (a.grade > b.grade) { return 1; }
        if (a.grade < b.grade) { return -1; }
        if (a.studentName > b.studentName) { return 1; }
        if (a.studentName < b.studentName) { return -1; }
      }
      ),
      searching: false,
      query: ''
    }
  }

  searchResults() {
    const query = this.state.query.toLowerCase().trim();
    return this.state.list.filter((item) => {
      if (item.studentName.toLowerCase().trim().indexOf(query) >= 0) { return true; }
      return false;
    });
  }

  render() {
    const { classes } = this.props;
    const results = this.searchResults();
    const searchVisible = this.state.searching ? '' : ' ' + classes.hidden;
    const navVisible = !this.state.searching ? '' : ' ' + classes.hidden;

    return (
      <React.Fragment>
        {/* Navigation Bar */}
        <AppBar className={classes.appbar + navVisible} position="fixed" data-cy="pxb-toolbar">
          <Toolbar className={classes.toolbar}>
            <IconButton data-cy="menu" color="inherit" className={classes.toolbarButton}>
              <Menu />
            </IconButton>
            <div style={{ flex: 1 }}>
              <Typography variant="h6" color="inherit" style={{ lineHeight: '1' }}>
                Grades
              </Typography>
            </div>
            <IconButton data-cy="search-btn" color="inherit"
              className={classes.toolbarButton}
              onClick={() => {
                if (this.searchInput) { this.searchInput.focus() }
                this.setState({ searching: true })
              }}
            >
              <Search />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Search Bar */}
        <AppBar className={classes.appbar + ' ' + classes.searchbar + searchVisible} position="fixed" color={'default'}>
          <Toolbar className={classes.toolbar}>
            <IconButton color="inherit" className={classes.toolbarButton} disabled>
              <Search />
            </IconButton>
            <TextField
              inputRef={(input) => this.searchInput = input}
              className={classes.searchfield}
              value={this.state.query}
              placeholder={'Search'}
              onChange={(evt) => this.setState({ query: evt.target.value })}
              InputProps={{ disableUnderline: true }}
            />
            <IconButton color="inherit"
              className={classes.toolbarButton}
              onClick={() => this.setState({ query: '', searching: false })}
            >
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* List */}
        <List className={classes.list}>
          {results.map(function (item, index) {
            return (
              <ListItem key={`students_${index}`}>
                <Grid container>
                  <Grid item xs={1} sm={1}>
                    <ListItemIcon>
                      <ListItemText primary={item.grade} />
                    </ListItemIcon>
                  </Grid>
                  <Grid item xs={11} sm={5}>
                    <ListItemText primary={item.studentName} secondary={item.className} />
                  </Grid>
                  <Hidden xsDown>
                    <Grid item sm={5}>
                      <ListItemText secondary={item.teacherName} style={{ paddingLeft: '0' }} />
                    </Grid>
                  </Hidden>
                  <Hidden smDown>
                    {item.metaData.data === "pending" &&
                      <Grid item sm={1}>
                        <ListItemText secondary={item.metaData.data} style={{ backgroundColor: item.metaData.backgroundColor, textAlign: 'center' }} />
                      </Grid>
                    }
                  </Hidden>
                </Grid>
              </ListItem>
            )
          }
          )}
          {results.length < 1 &&
            <ListItem>
              <ListItemIcon>
                <Error />
              </ListItemIcon>
              <div>
                <ListItemText primary={'0 results'} secondary={'No matching students'} />
              </div>
            </ListItem>
          }
        </List>
      </React.Fragment>
    )
  }
}

const styles = theme => ({
  appbar: {
    transition: 'all 250ms ease-in-out',
    right: 0,
    width: '100%',
    '&$searchbar$hidden': {
      width: 0
    },
    '&:not($searchbar)$hidden': {
      opacity: 0
    }
  },
  toolbarButton: {
    padding: theme.spacing.unit * 2
  },
  toolbar: {
    paddingRight: theme.spacing.unit * 0,
    paddingLeft: theme.spacing.unit * 0,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing.unit
    }
  },
  searchbar: {
    '& $toolbar': {
      //paddingLeft: theme.spacing.unit * 3,
      background: theme.palette.background.paper,
      // [theme.breakpoints.down('xs')]:{
      //   paddingLeft: theme.spacing.unit * 2.5
      // }
    },
    '& ::-ms-clear': {
      width: 0,
      height: 0
    }
  },
  hidden: {},
  list: {
    paddingTop: 0,
    marginTop: theme.spacing.unit * 8,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit * 7
    }
  },
  searchfield: {
    flex: '1 1 0px'
  }
})

export default (withStyles(styles)(App));