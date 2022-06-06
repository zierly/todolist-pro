/*
 * @Author: 自迩
 * @Date: 2022-06-06 21:23:44
 * @LastEditTime: 2022-06-06 23:07:59
 * @LastEditors: your name
 * @Description:
 * @FilePath: \todolist\src\pages\homePage\index.jsx
 */
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  let navigate = useNavigate()
  return (
    <div>
      <div>HomePage</div>

      <button onClick={() => {
        navigate('/userTodoPage')
      }}>userTodoPage</button>
      <button onClick={() => {
        navigate('/userInfoPage')
      }}>userInfoPage</button>

    </div>

  )
}
