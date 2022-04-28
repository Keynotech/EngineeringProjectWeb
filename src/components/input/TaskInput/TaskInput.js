/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useTheme } from "styled-components"
import { useMutation, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import ClearIcon from "@mui/icons-material/Clear"
import Checkbox from "../../button/Checkbox"
import {
  Wrapper,
  Container,
  Main,
  CheckboxContainer,
  PropertiesContainer,
} from "./TaskInput.style"
import {
  hideTaskInput,
  showTaskPage,
} from "../../../app/store/features/layoutSlice"
import TextInput from "../TextInput"
import DatePicker from "../../picker/DatePicker/DatePicker"
import PriorityPicker from "../../picker/PriorityPicker/PriorityPicker"

function TaskInput() {
  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _hideTaskInput = () => {
    dispatch(hideTaskInput())
  }
  const _showTaskPage = () => {
    dispatch(showTaskPage())
  }

  // Selectors &   Locale state
  // ===========================================================================
  const [title, setTitle] = useState("")
  const [isDone, setIsDone] = useState(false)
  const [dueDate, setDueDate] = useState()
  const [priority, setPriority] = useState(1)

  const toggleIsdone = () => setIsDone(!isDone)

  const clearInput = () => {
    setTitle("")
    setIsDone(false)
    setDueDate()
    setPriority(1)
  }

  // Mutations
  // ===========================================================================
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const createTask = useMutation(
    () =>
      fetch(`http://192.168.0.159:5000/tasks/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ title, status: isDone, dueDate, priority }),
      }).then((res) => res.json()),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["tasks"])
        queryClient.setQueriesData(["tasks", data._id], data)
        navigate(`tasks/${data._id}`)
        _showTaskPage()
      },
    }
  )

  // Hooks
  // ===========================================================================

  useEffect(() => {
    clearInput()
  }, [])

  // Others  // ===========================================================================
  const theme = useTheme()

  return (
    <li>
      <Wrapper>
        <Container>
          <Main>
            <CheckboxContainer>
              <Checkbox
                checked={isDone}
                onChange={toggleIsdone}
                priority={priority}
              />
            </CheckboxContainer>
            <TextInput
              value={title}
              onChange={(value) => setTitle(value)}
              placeholder="Create new task"
              fontSize="14px"
              autoFocus
            />
            <button
              style={{
                width: "120px",
                borderRadius: "4px",
                border: "1px solid black",
              }}
              type="submit"
              onClick={() => {
                createTask.mutate({
                  title,
                  isDone,
                  dueDate,
                  priority,
                })
                _hideTaskInput()
              }}
            >
              Create new task
            </button>
            <ClearIcon
              sx={{
                color: theme.textTertiary,
              }}
              onClick={_hideTaskInput}
            />
          </Main>
          <PropertiesContainer>
            <DatePicker
              value={dueDate}
              onChange={(value) => setDueDate(value)}
              dropdownTo="left"
            />
            <PriorityPicker
              value={priority}
              onChange={(value) => setPriority(value)}
            />
          </PropertiesContainer>
        </Container>
      </Wrapper>
    </li>
  )
}

export default TaskInput
