/*
 * @Author: 自迩
 * @Date: 2022-06-08 09:24:45
 * @LastEditTime: 2022-06-08 15:03:54
 * @LastEditors: your name
 * @Description:
 * @FilePath: \todolist\src\components\UserList\index.jsx
 */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


export default function UserList(props) {
  let {userList, todoList, stringAvatar} = props
  let navigate = useNavigate()
  function queryUser(id, name){
    return () => {
      let userTodos = todoList.filter( item => item.userId === id)
      // navigate(`/userTodoPage/${id}`)
      navigate('/userTodoPage', {state: {id, name, userTodos}})
    }
  }
  return (
    <Stack direction="row" spacing={2} sx = {{border: 2, borderColor: 'primary.main', borderRadius: 3, height: 100, paddingTop:'30px'}}>
          {
            userList.map( item => {
              return (<div key = {item.id} className='user-box' onClick={queryUser(item.id, item.name)}>
                        <Avatar  {...stringAvatar(item.name)} />
                        <div className='user-name'>{item.name}</div>
                      </div>)
            })
          }
      </Stack>
  )
}
