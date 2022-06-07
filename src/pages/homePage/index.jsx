/*
 * @Author: 自迩
 * @Date: 2022-06-06 21:23:44
 * @LastEditTime: 2022-06-08 00:06:27
 * @LastEditors: your name
 * @Description:
 * @FilePath: \todolist\src\pages\homePage\index.jsx
 */
import './index.css'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';



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
      margin:'0 auto',
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,

  };
}


export default function HomePage() {
  let navigate = useNavigate()
  let [userList, setUserList] = useState([])
  let [todosList, setTodosList] = useState([])
  useLayoutEffect(() => {
    axios.get('/users').then(value => {
      console.log(value.data);
      setUserList(value.data)
    })
    axios.get('/todos').then(value => {
      console.log(value.data);
      setTodosList(value.data)
    })
  }, [])

  console.log("@@@");

  return (
    <div>
      <Box sx={{ flexGrow: 1}}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>

          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Home page
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>

      <h2>User List</h2>
      <Stack direction="row" spacing={2} sx = {{border: 2, borderColor: 'primary.main', borderRadius: 3, height: 100, paddingTop:'30px'}}>
          {
            userList.map( item => {
              return (<div className='user-box'>
                        <Avatar key = {item.id} {...stringAvatar(item.name)} />
                        <div className='user-name'>{item.name}</div>
                      </div>)
            })
          }
      </Stack>
      <h2>Todo List</h2>
      <Stack direction="column" spacing={2} sx = {{border: 1, borderColor: 'secondary.main', borderRadius: 3, paddingTop:'30px', paddingLeft:'30px'}}>
        {
            todosList.map( item => {
              console.log();
            return <Chip
                    key = {item.id}
                    avatar={<Avatar {...stringAvatar(userList[item.userId - 1].name)} style = {{color: 'white'}}/>}
                    label={item.title}
                    variant="outlined"
                    sx={{width: 'fit-content'}}/>
          })
        }
      </Stack>
      {/* <button onClick={() => {
        navigate('/userTodoPage')
      }}>userTodoPage</button> */}

    </div>

  )
}
