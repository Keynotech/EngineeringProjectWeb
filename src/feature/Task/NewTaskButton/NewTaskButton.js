import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTheme } from "styled-components"
import AddIcon from "@mui/icons-material/Add"
import { Button, Icon } from "./NewTaskButton.style"
import { showTaskInput } from "../../../store/features/layoutSlice"

function NewTaskButton() {
  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _showTaskInput = () => dispatch(showTaskInput())

  // Selectors
  // ===========================================================================
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
        <AddIcon sx={{ color: theme.background, fontSize: "32px" }} />
      </Icon>
    </Button>
  )
}

export default NewTaskButton
