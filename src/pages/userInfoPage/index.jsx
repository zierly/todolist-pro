/*
 * @Author: 自迩
 * @Date: 2022-06-06 21:25:54
 * @LastEditTime: 2022-06-09 22:30:36
 * @LastEditors: your name
 * @Description:
 * @FilePath: \todolist\src\pages\userInfoPage\index.jsx
 */
import React, {useState,useEffect, useLayoutEffect} from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
      m: 1,
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,

  };
}

const theme = createTheme();


export default function UserInfoPage() {
  let [userInfo, setUserInfo] = useState({getData:false})
  let {state} = useLocation()
  useEffect(() => {
    axios.get(`/users/${state.userId}`).then(value => {
      userInfo = {...value.data,getData: true}
      setUserInfo(JSON.parse(JSON.stringify(userInfo)))
      // console.log(userInfo)
    })
  },[])
  console.log(userInfo);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  console.log('@@@@')
  return (
    <div>
      <Box sx={{ flexGrow: 1}}>
          <AppBar position="fixed">
            <Toolbar variant="dense">
              <Typography variant="h6" color="inherit" component="div">
                User info page
              </Typography>
            </Toolbar>
          </AppBar>
      </Box>
      <ThemeProvider theme={theme}>
        {
          !userInfo.getData ? <div>loading...</div> : (
          <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar  {...stringAvatar(userInfo.name)} />
            <Typography component="h1" variant="h5">
              {userInfo.name}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="username"
                    id="username"
                    label="username"
                    defaultValue={userInfo.username}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="email"
                    name="email"
                    defaultValue={userInfo.email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="phone"
                    type="phone"
                    id="phone"
                    defaultValue={userInfo.phone}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="website"
                    label="website"
                    type="website"
                    id="website"
                    defaultValue={userInfo.website}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="website"
                    label="website"
                    type="website"
                    id="website"
                    defaultValue={userInfo.website}
                  />
                </Grid>


              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Container>
          )
        }

      </ThemeProvider>

    </div>

  )
}
