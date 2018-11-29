import React, { Component } from 'react';
import { Flags } from 'ld-react-feature-flags';
import Highlight from 'react-highlight';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LabelIcon from '@material-ui/icons/Label';
import CodeIcon from '@material-ui/icons/Code';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  list: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6
  }
});

class App extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              Project Example
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography
                variant="display3"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Project Example
              </Typography>
              <Typography
                variant="title"
                align="center"
                color="textSecondary"
                paragraph
              >
                This example show you how to use{' '}
                <strong>ld-react-feature-flags</strong> library
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      <a
                        href="https://app.launchdarkly.com/settings#/projects"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Access to your LaunchDarkly Dashboard
                      </a>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary">
                      <a
                        href="https://github.com/lectra-tech/ld-react-feature-flags/blob/master/README.md"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Readme to the rescue
                      </a>
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid item xs={12} md={8}>
              <Typography variant="headline" component="h3">
                Instructions
              </Typography>
              <div className={classes.list}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <LabelIcon />
                    </ListItemIcon>
                    <ListItemText primary="In your LaunchDarkly dashboard, go to Account setting" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LabelIcon />
                    </ListItemIcon>
                    <ListItemText primary="Create a new project and defined at least one environment" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LabelIcon />
                    </ListItemIcon>
                    <ListItemText primary="Copy the client-side ID from your LD dahsboard and replace the CLIENT_SIDE_ID constant by yours in example/src/contants.js file" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LabelIcon />
                    </ListItemIcon>
                    <ListItemText primary="Enable/Disable flag in your dashboard. Then reload the project example to see how Flags components change what they render" />
                  </ListItem>
                </List>
              </div>
            </Grid>
            <br />
            <Grid item xs={12} md={8}>
              <Typography variant="title" gutterBottom>
                List of examples
              </Typography>
              <Divider />
              <br />
              <Typography variant="headline" component="h3">
                Example 1 - with a simple flag
              </Typography>
              <br />
              <Typography variant="body2" component="h3">
                Requirements
              </Typography>
              <div className={classes.list}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <LabelIcon />
                    </ListItemIcon>
                    <ListItemText primary="In your LaunchDarkly dashboard, for the given project and environment previously defined..." />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LabelIcon />
                    </ListItemIcon>
                    <ListItemText primary="Create a new flag called beta-users" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LabelIcon />
                    </ListItemIcon>
                    <ListItemText primary="In flag settings, make sure that the option 'Make this flag available to the client-side (JavaScript) SDK' is checked" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LabelIcon />
                    </ListItemIcon>
                    <ListItemText primary="Enable the flag" />
                  </ListItem>
                </List>
              </div>
              <br />
              <Typography variant="subheading" gutterBottom>
                If <code>beta-users</code> flag is active, <code>renderOn</code>{' '}
                props will be used.<br />
                If <code>beta-users</code> flag is inactive,{' '}
                <code>fallbackRender</code>
                props will be used.
              </Typography>
              <Highlight className="language-javascript">
                {`<Flags
  flag="beta-users"
  renderOn={() => (
    <Button>Beta users</Button>
  )}
  fallbackRender={() => (
    <Button>Regular users</Button>
  )}
/>`}
              </Highlight>
              <Flags
                flag="beta-users"
                renderOn={() => (
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                  >
                    Beta Users
                  </Button>
                )}
                fallbackRender={() => (
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                  >
                    Regular users
                  </Button>
                )}
              />
              <br />
              <br />
              <Typography variant="headline" component="h3">
                Example 1bis - with a simple flag
              </Typography>
              <Typography variant="subheading" gutterBottom>
                If <code>beta-users</code> flag is active, <code>children</code>{' '}
                props will be used.<br />
                If <code>beta-users</code> flag is inactive,{' '}
                <code>fallbackRender</code>
                props will be used.
              </Typography>
              <Highlight className="language-javascript">
                {`<Flags
  flag="beta-users"
  fallbackRender={() => (
    <Button>Beta users</Button>
  )}
>
  <Button>Regular users</Button>
</Flags>
`}
              </Highlight>
              <Flags
                flag="beta-users"
                fallbackRender={() => (
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                  >
                    Regular users
                  </Button>
                )}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                >
                  Beta Users
                </Button>
              </Flags>
              <br />
              <br />
              <Typography variant="headline" component="h3">
                Example 2 - with a multivariant flag
              </Typography>
              <Typography variant="body2" component="h3">
                Requirements
              </Typography>
              <div className={classes.list}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <LabelIcon />
                    </ListItemIcon>
                    <ListItemText primary="In your LaunchDarkly dashboard, for the given project and environment previously defined..." />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LabelIcon />
                    </ListItemIcon>
                    <ListItemText primary="Create a new flag called font-color" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LabelIcon />
                    </ListItemIcon>
                    <ListItemText primary="In flag settings, make sure that the option 'Make this flag available to the client-side (JavaScript) SDK' is checked" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LabelIcon />
                    </ListItemIcon>
                    <ListItemText primary="Defined at least two variations with hexadecimal color string as value" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LabelIcon />
                    </ListItemIcon>
                    <ListItemText primary="Defined target for each variation. You can use the current user as target. See 'example/src/index.js' to change between 2 users" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LabelIcon />
                    </ListItemIcon>
                    <ListItemText primary="Enable the flag" />
                  </ListItem>
                </List>
              </div>
              <br />
              <Typography variant="subheading" gutterBottom>
                <code>font-color</code> is a multivariant flag.<br />
                <br />
                In this example, the flag returns a string that is an
                hexadecimal color value.<br />
                The returned color depends of the target. Here we use the
                current user as a target.
              </Typography>
              <Highlight className="language-javascript">
                {`<Flags
  flag="font-color"
  renderOn={flag => (
    <h3 style={{ color: flag.fontColor }}>
      My colorful title
    </h3>
  )}
  fallbackRender={flag => (
    <h3 style={{ color: flag.fontColor }}>
      My colorful title
    </h3>
  )}
/>
`}
              </Highlight>
              <Flags
                flag="font-color"
                renderOn={flag => (
                  <h3 style={{ color: flag.fontColor }}>My colorful title</h3>
                )}
                fallbackRender={flag => (
                  <h3 style={{ color: flag.fontColor }}>My colorful title</h3>
                )}
              />
            </Grid>
          </div>
        </main>
        <footer className={classes.footer}>
          <Grid
            item
            xs={12}
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <List>
              <ListItem
                button
                component="a"
                href="https://github.com/lectra-tech/ld-react-feature-flags/tree/master/example"
              >
                <ListItemIcon>
                  <CodeIcon />
                </ListItemIcon>
                <ListItemText primary="Source code of project example" />
              </ListItem>
              <ListItem
                button
                component="a"
                href="https://github.com/lectra-tech/ld-react-feature-flags"
              >
                <ListItemIcon>
                  <CodeIcon />
                </ListItemIcon>
                <ListItemText primary="Source code of ld-react-feature-flags library" />
              </ListItem>
            </List>
          </Grid>
        </footer>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(App);
