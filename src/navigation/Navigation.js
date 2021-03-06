import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Today from "../pages/App/Today/Today"
import Inbox from "../pages/App/Inbox/Inbox"
import Upcoming from "../pages/App/Upcoming/Upcoming"
import AppLayout from "../layout/AppLayout/AppLayout"
import TaskPage from "../feature/Task/TaskPage/TaskPage"
import TagPage from "../pages/App/TagPage/TagPage"
import ProjectPage from "../pages/App/ProjectPage/ProjectPage"

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
          <Route path="/upcoming/*" element={<Upcoming />}>
            <Route path="tasks/:taskId" element={<TaskPage />} />
          </Route>
          <Route path="/tag/:tagId" element={<TagPage />}>
            <Route path="tasks/:taskId" element={<TaskPage />} />
          </Route>
          <Route path="/project/:projectId" element={<ProjectPage />}>
            <Route path="tasks/:taskId" element={<TaskPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Navigation
