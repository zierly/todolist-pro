/*
 * @Author: 自迩
 * @Date: 2022-06-06 21:26:30
 * @LastEditTime: 2022-06-08 15:35:31
 * @LastEditors: your name
 * @Description:
 * @FilePath: \todolist\src\pages\userTodoPage\index.jsx
 */
import './index.css'
import React, {useState,useEffect} from 'react'
import { useParams, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import Avatar from '@mui/material/Avatar';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

/**
 * @description: 通过用户名生成不同的颜色
 * @param {*} string 用户名
 * @return {*} 生成的颜色
 */
 function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

/**
 * @description:通过用户名生成不同的颜色的头像
 * @param {*} name 用户名
 * @return {*} 头像组件参数
 */
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,

  };
}

export default function UserTodoPage() {
  // let {id} = useParams()
  let {state} = useLocation()

  console.log(state);
  return (
    <>
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              User todo page
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div className='user-box-todopage' >
        <Avatar  {...stringAvatar(state.name)} />
        <span>{state.name}</span>
      </div>

      <Stack direction="column" spacing={2} sx = {{border: 1, borderColor: 'secondary.main', borderRadius: 3, paddingTop:'30px', paddingLeft:'30px'}}>
      {
        state.userTodos.map( item => {
          return (
            <div key = {item.id}>
              <Chip
              label={item.title}
              icon={item.completed ? <DoneIcon /> : <PriorityHighIcon/>}
              variant="outlined"
            />
            </div>
          )
        })
      }
      </Stack>

    </>

  )
}
