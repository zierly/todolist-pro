/*
 * @Author: 自迩
 * @Date: 2022-06-06 21:01:15
 * @LastEditTime: 2022-06-07 20:16:54
 * @LastEditors: your name
 * @Description:
 * @FilePath: \todolist\src\App.js
 */

import './App.css';
import {Link, Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import axios from 'axios'
import HomePage from './pages/homePage';
import UserInfoPage from './pages/userInfoPage';
import UserTodoPage from './pages/userTodoPage'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'

function App() {
  return (
    <div className="App">
      {/* <Link to = "/userTodoPage">userTodoPage</Link>
      <Link to = "/userInfoPage">userInfoPage</Link> */}


    <Routes>
      <Route path = "/" element = {<Navigate to = "/homePage"/>}></Route>
      <Route path = "/homePage" element = {<HomePage/>}></Route>
      <Route path = "/userTodoPage" element = {<UserTodoPage/>}></Route>
      <Route path = "/userInfoPage" element = {<UserInfoPage/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
