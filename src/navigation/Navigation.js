import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Today from "../App/pages/Today/Today"
import Inbox from "../App/pages/Inbox/Inbox"
import Upcoming from "../App/pages/Upcoming/Upcoming"
import AppLayout from "../App/layout/AppLayout/AppLayout"
import TaskPage from "../App/feature/Task/TaskPage/TaskPage"
import TagPage from "../App/pages/TagPage/TagPage"
import ProjectPage from "../App/pages/ProjectPage/ProjectPage"

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
