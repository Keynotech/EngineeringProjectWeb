import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTheme } from "styled-components"
import AddIcon from "@mui/icons-material/Add"
import { Button, Icon } from "./NewTaskButton.style"
import { showTaskInput } from "../../../app/store/features/layoutSlice"

function NewTaskButton() {
  const dispatch = useDispatch()
  const _showTaskInput = () => dispatch(showTaskInput())
  const isTaskInputOpen = useSelector(
    (state) => state.layout.taskInputVisibility
  )
  const theme = useTheme()
  return (
    <Button
      type="button"
      onClick={() => {
        _showTaskInput()
      }}
      isTaskInputOpen={isTaskInputOpen}
    >
      <Icon>
        <AddIcon sx={{ color: theme.background, fontSize: "36px" }} />
      </Icon>
    </Button>
  )
}

export default NewTaskButton
