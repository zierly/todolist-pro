/*
 * @Author: 自迩
 * @Date: 2022-06-06 21:23:44
 * @LastEditTime: 2022-06-07 22:28:27
 * @LastEditors: your name
 * @Description:
 * @FilePath: \todolist\src\pages\homePage\index.jsx
 */
import './index.css'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import axios from 'axios';


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
      <div>HomePage</div>
      <Stack direction="row" spacing={2}>
        {
          userList.map( item => {
            return <Avatar key = {item.id} {...stringAvatar(item.name)}/>
          })
        }
      </Stack>
      <Stack direction="column" spacing={1} >
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
