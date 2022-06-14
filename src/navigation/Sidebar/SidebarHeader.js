/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { useSelector, useDispatch } from "react-redux"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import MenuOpenIcon from "@mui/icons-material/MenuOpen"
import { Avatar } from "@mui/material"
import styled, { css, useTheme } from "styled-components"
import { hideSidebar } from "../../store/features/layoutSlice"
import { mq } from "../../utils/mq"

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 48px;
  margin-bottom: 5px;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 4px 10px 4px 15px;
  width: 100%;
`

const UserName = styled.span`
  flex: 1;
  font-weight: 700;
  font-size: ${(props) => props.fontSize || "14px"};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const SidebarToggle = styled.div`
  ${({ isSidebarVisible }) =>
    !isSidebarVisible &&
    css`
      visibility: visible;
      transform: scaleX(-1);
    `}

  @media ${mq.phone} {
    display: none;
  }
`

const SettingsButton = styled.div``

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 14px;
  height: 100%;
`

function stringToColor(string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = "#"

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */
  return color
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      height: 24,
      width: 24,
      fontSize: "14px",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[0][1]}`,
  }
}

function SidebarHeader() {
  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _hideSidebar = () => dispatch(hideSidebar())

  // Selectors
  // ===========================================================================
  const isVisible = useSelector((state) => state.layout.sidebarVisibility)

  const theme = useTheme()

  return (
    <Wrapper>
      <Container
        direction="row"
        justify="space-between"
        padding="5px 10px 5px 20px"
        width="100%"
        gap="14px"
        alignItems="center"
        background="green"
      >
        <Avatar variant="rounded" {...stringAvatar("sampleemail@amu.edu.pl")} />
        <UserName>sampleemail@amu.edu.pl</UserName>
        <ButtonsContainer>
          <SettingsButton>
            <SettingsOutlinedIcon
              sx={{ color: theme.textSecondary, fontSize: "22px" }}
            />
          </SettingsButton>
          <SidebarToggle onClick={_hideSidebar} isSidebarVisible={isVisible}>
            <MenuOpenIcon
              sx={{ color: theme.textSecondary, fontSize: "22px" }}
            />
          </SidebarToggle>
        </ButtonsContainer>
      </Container>
    </Wrapper>
  )
}

export default SidebarHeader
