import React, { Component } from 'react';
import { Flags } from '@lectra/ld-react-feature-flags';
import Highlight from 'react-highlight';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LabelIcon from '@mui/icons-material/Label';
import CodeIcon from '@mui/icons-material/Code';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Project Example
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <Box sx={{ backgroundColor: 'background.paper' }}>
            <Box
              sx={{ maxWidth: 600, margin: '0 auto', padding: '64px 0 16px' }}
            >
              <Typography
                variant="h1"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Project Example
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                This example shows you how to use{' '}
                <strong>ld-react-feature-flags</strong> library
              </Typography>
              <Box sx={{ marginTop: 4 }}>
                <Grid container spacing={2} justifyContent="center">
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
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: 'auto',
              marginLeft: 3,
              marginRight: 3,
              padding: '32px 0',
              '@media (min-width: 1100px)': {
                width: 1100,
                marginLeft: 'auto',
                marginRight: 'auto'
              }
            }}
          >
            <Grid item xs={12} md={8}>
              <Typography variant="h2" component="h3">
                Instructions
              </Typography>
              <Box sx={{ backgroundColor: 'background.paper' }}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <LabelIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <>
                          In LaunchDarkly, go to the{' '}
                          <a
                            href="https://app.launchdarkly.com/settings/projects"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Projects page
                          </a>
                        </>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LabelIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <>
                          Create a new Project and define at least one
                          Environment
                        </>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LabelIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <>
                          In your Project's settings, under the Environments
                          section, copy the <em>Client-side ID</em> for the
                          desired Environment and set it as the{' '}
                          <strong>
                            <code>CLIENT_SIDE_ID</code>
                          </strong>{' '}
                          value in the{' '}
                          <strong>
                            <code>example/src/constants.js</code>
                          </strong>{' '}
                          file
                        </>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LabelIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <>
                          Turn the below flag examples on/off in your Project
                          and reload the example application to see how the{' '}
                          <strong>
                            <code>Flags</code>
                          </strong>{' '}
                          component changes what is rendered
                        </>
                      }
                    />
                  </ListItem>
                </List>
              </Box>
            </Grid>
            <br />
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                List of examples
              </Typography>
              <Divider />
              <br />
              <Typography variant="h2" component="h3">
                Example 1 - with a simple flag
              </Typography>
              <br />
              <Typography variant="body2" component="h3">
                Requirements
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <LabelIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <>
                        In LaunchDarkly, for the given Project and Environment
                        previously defined...
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LabelIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <>
                        Create a new <em>Boolean</em> flag called{' '}
                        <strong>
                          <code>beta-users</code>
                        </strong>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LabelIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <>
                        On the flag's <em>Targeting</em> tab, under{' '}
                        <em>Advanced controls</em>, make sure that{' '}
                        <strong>"Available on client-side SDKs"</strong> is
                        turned on
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LabelIcon />
                  </ListItemIcon>
                  <ListItemText primary={<>Turn the flag on</>} />
                </ListItem>
              </List>
              <br />
              <Typography variant="h4" component="h4">
                Usage 1
              </Typography>
              <br />
              <Typography variant="subtitle1" gutterBottom>
                If the{' '}
                <strong>
                  <code>beta-users</code>
                </strong>{' '}
                flag is on, the{' '}
                <strong>
                  <code>renderOn</code>
                </strong>{' '}
                props will be used.<br />
                If the{' '}
                <strong>
                  <code>beta-users</code>
                </strong>{' '}
                flag is off, the{' '}
                <strong>
                  <code>fallbackRender</code>
                </strong>{' '}
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
                  <Button variant="outlined" color="primary">
                    Beta Users
                  </Button>
                )}
                fallbackRender={() => (
                  <Button variant="outlined" color="secondary">
                    Regular users
                  </Button>
                )}
              />
              <br />
              <br />
              <Typography variant="h4" component="h4">
                Usage 2
              </Typography>
              <br />
              <Typography variant="subtitle1" gutterBottom>
                If the{' '}
                <strong>
                  <code>beta-users</code>
                </strong>{' '}
                flag is on, the{' '}
                <strong>
                  <code>children</code>
                </strong>{' '}
                props will be used.<br />
                If the{' '}
                <strong>
                  <code>beta-users</code>
                </strong>{' '}
                flag is off, the{' '}
                <strong>
                  <code>fallbackRender</code>
                </strong>{' '}
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
                  <Button variant="outlined" color="secondary">
                    Regular users
                  </Button>
                )}
              >
                <Button variant="outlined" color="primary">
                  Beta Users
                </Button>
              </Flags>
              <br />
              <br />
              <Typography variant="h2" component="h3">
                Example 2 - with a multivariant flag
              </Typography>
              <Typography variant="body2" component="h3">
                Requirements
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <LabelIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <>
                        In LaunchDarkly, for the given Project and Environment
                        previously defined...
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LabelIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <>
                        Create a new <em>String</em> flag called{' '}
                        <strong>
                          <code>font-color</code>
                        </strong>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LabelIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <>
                        On the flag's <em>Targeting</em> tab, under{' '}
                        <em>Advanced controls</em>, make sure that{' '}
                        <strong>"Available on client-side SDKs"</strong> is
                        turned on
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LabelIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <>
                        On the flag's <em>Variations</em> tab, define at least
                        two variations with hexadecimal colors as their string
                        values (e.g. -{' '}
                        <strong>
                          <code>"#FF0000"</code>
                        </strong>)
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LabelIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <>
                        Define a target for each variation. You can use the
                        properties of{' '}
                        <strong>
                          <code>user1</code>
                        </strong>{' '}
                        in{' '}
                        <strong>
                          <code>example/src/index.jsx</code>
                        </strong>{' '}
                        to define targets and changes between users.
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LabelIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <>
                        Turn the flag on to target users. Turn the flag off
                        to always use the default variation.
                      </>
                    }
                  />
                </ListItem>
              </List>
              <br />
              <Typography variant="h4" component="h4">
                Usage
              </Typography>
              <br />
              <Typography variant="subtitle1" gutterBottom>
                In this example, the flag returns a string that is an
                hexadecimal color value.<br />
                The returned color depends on the target. Here we use the
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
/>
`}
              </Highlight>
              <Flags
                flag="font-color"
                renderOn={flag => (
                  <h3 style={{ color: flag.fontColor }}>My colorful title</h3>
                )}
              />
            </Grid>
          </Box>
        </main>
        <Box
          component="footer"
          sx={{ backgroundColor: 'background.paper', padding: 6 }}
        >
          <Grid
            item
            xs={12}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <List>
              <ListItem
                button
                component="a"
                href="https://github.com/lectra-tech/ld-react-feature-flags/tree/master/example"
                target="_blank"
                rel="noopener noreferrer"
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
                target="_blank"
                rel="noopener noreferrer"
              >
                <ListItemIcon>
                  <CodeIcon />
                </ListItemIcon>
                <ListItemText primary="Source code of ld-react-feature-flags library" />
              </ListItem>
            </List>
          </Grid>
        </Box>
      </React.Fragment>
    );
  }
}
export default App;
