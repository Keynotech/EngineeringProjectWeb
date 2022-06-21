import React from "react"
import CircularProgress from "@mui/material/CircularProgress"
import styled, { useTheme } from "styled-components"

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const LoadingLabel = styled.h1`
  font-size: 30px;
  color: ${(props) => props.theme.brandColor};
  font-weight: 600;
`

const Image = styled.img`
  position: absolute;
  transform: scale(75%);
`

const CircularWrapper = styled.div`
  top: 250px;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`

function LoadingScreen() {
  const theme = useTheme()
  return (
    <Loading>
      <Image
        alt="loading-screen"
        src={`${process.env.PUBLIC_URL}/assets/undraw_loading_re_5axr.svg`}
      />
      <CircularWrapper>
        <LoadingLabel>JetTasks</LoadingLabel>
        <CircularProgress size={40} sx={{ color: theme.brandColor }} />
      </CircularWrapper>
    </Loading>
  )
}

export default LoadingScreen
