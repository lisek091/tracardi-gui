import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import {ImageList } from '@material-ui/core';
import ImageListItem from '@material-ui/core/ImageListItem';
import NodeIcons,{icons} from './FlowNodeIcons';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }, 
   imageList: {
    width: 180,
    height:200,
},
  imageListItem:{
    padding: 15,
},
  iconbut:{
    paddingBlock: 5,
  },

}));
const StyledMenu = withStyles({
  paper: {
      border: '2px solid #d3d4d5',
      padding: '2px'
  },
})((props) => (
  <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
      }}
      transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
      }}
      {...props}
  />
  ));
  export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [clickIcon, setClickIcon] = React.useState("plugin");
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (e) =>{
    setClickIcon(e);
  };
  //default props icon domyslna icona na liscie 
  //input mui
  //props on change
  return (
    <div className={classes.root}>
        <input value={clickIcon} disabled />
        
       <IconButton
          aria-label="account of current user"
          aria-controls="Icon-menu"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <NodeIcons icon={clickIcon}/>
        </IconButton>
          <StyledMenu
            id="Icon-menu"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
                }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
                }}
            open={open}
            onClose={handleClose}
           >   
            <ImageList rowHeight='auto' className={classes.imageList} cols={4}>
               {Object.keys(icons).map((ico)=>(
                <ImageListItem onClick={handleClose} className={classes.imageListItem} cols={1} key={ico}>
                  <button className={classes.iconbut} value={ico} onClick={e=>handleChange(e.currentTarget.value)} >
                    <NodeIcons icon={ico}/> 
                  </button>
                </ImageListItem>
                ))}
            </ImageList>
          </StyledMenu>
    </div>
  );
}