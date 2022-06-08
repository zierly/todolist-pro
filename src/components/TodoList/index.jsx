/*
 * @Author: 自迩
 * @Date: 2022-06-08 09:24:56
 * @LastEditTime: 2022-06-08 09:43:04
 * @LastEditors: your name
 * @Description:
 * @FilePath: \todolist\src\components\TodoList\index.jsx
 */
import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';



export default function TodoList(props) {
    let {userList, todoList, stringAvatar} = props
  return (
    <Stack direction="column" spacing={2} sx = {{border: 1, borderColor: 'secondary.main', borderRadius: 3, paddingTop:'30px', paddingLeft:'30px'}}>
        {
            todoList.map( item => {
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
  )
}
