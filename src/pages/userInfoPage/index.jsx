/*
 * @Author: 自迩
 * @Date: 2022-06-06 21:25:54
 * @LastEditTime: 2022-06-08 22:38:21
 * @LastEditors: your name
 * @Description:
 * @FilePath: \todolist\src\pages\userInfoPage\index.jsx
 */
import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function UserInfoPage() {
  let [userInfo, setUserInfo] = useState({})
  let {state} = useLocation()
  useEffect(() => {
    axios.get(`/users/${state.userId}`).then(value => {
      console.log(value.data);
      setUserInfo(value.data)
    })

  },[])
  return (
    <>
      <Box sx={{ flexGrow: 1}}>
          <AppBar position="fixed">
            <Toolbar variant="dense">
              <Typography variant="h6" color="inherit" component="div">
                User info page
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
    </>

  )
}
