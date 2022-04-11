import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Today from "../../pages/App/Today/Today"
import Inbox from "../../pages/App/Inbox/Inbox"
import AppLayout from "../layout/AppLayout"

function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate replace to="/today" />} />
          <Route path="*" element={<Navigate replace to="/" />} />
          <Route path="/today" element={<Today />} />
          <Route path="/inbox" element={<Inbox />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Navigation
