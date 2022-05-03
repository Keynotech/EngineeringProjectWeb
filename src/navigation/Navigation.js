import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Today from "../pages/App/Today/Today"
import Inbox from "../pages/App/Inbox/Inbox"
import CurrentWeek from "../pages/App/CurrentWeek/CurrentWeek"
import AppLayout from "../layout/AppLayout/AppLayout"
import TaskPage from "../feature/Task/TaskPage/TaskPage"

function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate replace to="/today" />} />
          <Route path="*" element={<Navigate replace to="/" />} />
          <Route path="/today/*" element={<Today />}>
            <Route path="tasks/:taskId" element={<TaskPage />} />
          </Route>
          <Route path="/inbox/*" element={<Inbox />}>
            <Route path="tasks/:taskId" element={<TaskPage />} />
          </Route>
          <Route path="/week/*" element={<CurrentWeek />}>
            <Route path="tasks/:taskId" element={<TaskPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Navigation
