import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AddIcon from '@mui/icons-material/Add';
import { Card, CardActions, CardContent, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Markdown } from './interfaces/Markdown';
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const [markdown, setMarkdown] = useState<Markdown>({});
  const [markdownList, setMarkdownList] = useState<Markdown[]>([{}]);
  const [initialized, setInitialized] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!initialized) {
      const markdown: Markdown = { id: '1', source: '# Hello React' };
      setMarkdownList([
        markdown,
        { id: '2', source: '# Hey React' },
        { id: '3', source: '# Ok React' },
      ]);

      setMarkdown(markdown);
      setInitialized(true);
    }
  }, []);

  const parseMarkdownText = (markdown: Markdown) => {
    return md.render(markdown.source);
  };

  const addMarkdownClick = () => {
    console.log('addMarkdownClick');
    setMarkdownList([
      ...markdownList,
      { id: markdownList.length + 1 + '', source: '' },
    ]);
    setMarkdown(markdownList[markdownList.length - 1]);
  };

  const markdownListClick = (selectedMarkdown: Markdown) => {
    // 直前に表示されていたマークダウンに変更を反映するため、idで検索
    // 現在表示中のidとリストのidが一致した場合、currentMarkdownを利用、それ以外はスルー
    const currentMarkdown = markdown;
    setMarkdownList(
      markdownList.map((markdownDataSource, index, markdownList) =>
        currentMarkdown.id === markdownDataSource.id
          ? currentMarkdown
          : markdownDataSource
      )
    );
    // 選択されたマークダウンを反映
    setMarkdown(selectedMarkdown);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            React Study App Markdown Editor
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/*{['Add'].map((text, index) => (*/}
          <ListItem button onClick={addMarkdownClick}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="追加" />
          </ListItem>
          {/*))}*/}
        </List>
        <Divider />
      </Drawer>
      {/*<Box sx={{ height: '100vh', mt: '64px' }}>*/}
      <Box sx={{ height: '100vh', width: '15vw', overflow: 'auto' }}>
        <DrawerHeader />
        {markdownList &&
          markdownList.map((markdown) => (
            <Card
              variant="outlined"
              key={markdown.id}
              onClick={(e) => markdownListClick(markdown)}
            >
              <CardContent>
                <Typography>{markdown.id}</Typography>
              </CardContent>
              <CardActions>
                {markdown.source && markdown.source.length > 20
                  ? markdown.source.slice(0, 20) + '...'
                  : markdown.source}
              </CardActions>
            </Card>
          ))}
      </Box>
      <Box component="main" sx={{ p: 3, height: '100vh', width: '45vw' }}>
        <DrawerHeader />
        <TextField
          sx={{ width: '100%' }}
          multiline={true}
          onChange={(e) => {
            setMarkdown({ id: markdown.id, source: e.target.value });
          }}
          rows={32}
          value={markdown.source}
        />
      </Box>
      <Box component="sub" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {markdown && markdown.source && (
          <div
            dangerouslySetInnerHTML={{ __html: parseMarkdownText(markdown) }}
          ></div>
        )}
      </Box>
    </Box>
  );
}
