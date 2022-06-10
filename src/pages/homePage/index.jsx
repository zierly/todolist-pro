/*
 * @Author: 自迩
 * @Date: 2022-06-06 21:23:44
 * @LastEditTime: 2022-06-10 14:07:18
 * @LastEditors: your name
 * @Description:
 * @FilePath: \todolist\src\pages\homePage\index.jsx
 */
/*
 * @Author: 自迩
 * @Date: 2022-06-06 21:23:44
 * @LastEditTime: 2022-06-10 13:58:11
 * @LastEditors: your name
 * @Description:
 * @FilePath: \todolist\src\pages\homePage\index.jsx
 */
import './index.css'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import axios from 'axios';
import TodoList from '../../components/TodoList';
import UserList from '../../components/UserList';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


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

  let [userList, setUserList] = useState([])
  let [todoList, setTodoList] = useState([])
  useLayoutEffect(() => {
    axios.get('/users').then(value => {
      // console.log(value.data);
      setUserList(value.data)
    })
    axios.get('/todos').then(value => {
      // console.log(value.data);
      setTodoList(value.data)
    })
  }, [])


  return (
    <div>
      <Box sx={{ flexGrow: 1}}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Home page
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
      {
        !(userList.length && todoList.length) ? <></> : (
          <>
          <h2>User List</h2>
          <UserList userList = {userList} todoList = {todoList} stringAvatar = {stringAvatar} />

          <h2>Todo List</h2>
          <TodoList userList = {userList} todoList = {todoList} stringAvatar = {stringAvatar}/>
          </>
        )
      }



    </div>

  )
}
