import React from "react"
import { Route, Routes, Outlet } from "react-router-dom"
import styled from "styled-components"
import PropTypes, { element } from "prop-types"
import TaskPage from "../item/Task/TaskPage/TaskPage"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  gap: 10px;
`
const Container = styled.div`
  width: 100%;
  padding-bottom: 120px;
`

function MainLayout({ children }) {
  return (
    <Wrapper>
      <Container>
        {children}
        <Outlet />
      </Container>
      <Routes>
        <Route path="tasks/:taskId" element={<TaskPage />} />
      </Routes>
    </Wrapper>
  )
}

MainLayout.propTypes = {
  children: PropTypes.arrayOf(element).isRequired,
}

export default MainLayout
