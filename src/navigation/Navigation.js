import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import Today from "../App/pages/Today/Today"
import Inbox from "../App/pages/Inbox/Inbox"
import Upcoming from "../App/pages/Upcoming/Upcoming"
import AppLayout from "../App/layout/AppLayout/AppLayout"
import TaskPage from "../App/feature/Task/TaskPage/TaskPage"
import TagPage from "../App/pages/TagPage/TagPage"
import ProjectPage from "../App/pages/ProjectPage/ProjectPage"
import AuthPageLayout from "../Auth/layout/AuthPageLayout"

function Navigation() {
  const user = useSelector((state) => state.auth.userToken)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate replace to="/" />} />
        <Route path="/" element={<Navigate replace to="/auth" />} />
        <Route path="/auth" element={<AuthPageLayout user={user} />}>
          <Route path="login" />
          <Route path="signup" />
          <Route path="reset" />
        </Route>
        <Route path="/app" element={<AppLayout user={user} />}>
          <Route path="/app" element={<Navigate replace to="today" />} />
          <Route path="today/*" element={<Today />}>
            <Route path="tasks/:taskId" element={<TaskPage />} />
          </Route>
          <Route path="inbox/*" element={<Inbox />}>
            <Route path="tasks/:taskId" element={<TaskPage />} />
          </Route>
          <Route path="upcoming/*" element={<Upcoming />}>
            <Route path="tasks/:taskId" element={<TaskPage />} />
          </Route>
          <Route path="tag/:tagId" element={<TagPage />}>
            <Route path="tasks/:taskId" element={<TaskPage />} />
          </Route>
          <Route path="project/:projectId" element={<ProjectPage />}>
            <Route path="tasks/:taskId" element={<TaskPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Navigation
