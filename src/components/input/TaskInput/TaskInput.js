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
  Buttons,
} from "./TaskInput.style"
import {
  hideTaskInput,
  showTaskPage,
} from "../../../app/store/features/layoutSlice"
import TextInput from "../TextInput"
import DatePicker from "../../picker/DatePicker/DatePicker"
import PriorityPicker from "../../picker/PriorityPicker/PriorityPicker"
import SubmitButton from "../../button/SubmitButton"
import CancelButton from "../../button/CancelButton"
import TagPicker from "../../picker/TagPicker/TagPicker"

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
  const [tags, setTags] = useState([])

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
        body: JSON.stringify({
          title,
          status: isDone,
          dueDate,
          priority,
          tagId: tags[0],
        }),
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
              multiline={false}
            />
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
            <TagPicker
              currentTags={tags}
              onChange={(value) => setTags([...value])}
            />
          </PropertiesContainer>
        </Container>
      </Wrapper>
      <Buttons>
        <CancelButton text="Cancel" onClick={_hideTaskInput} />
        <SubmitButton
          text="Create"
          onClick={() => {
            createTask.mutate({
              title,
              isDone,
              dueDate,
              priority,
            })
            _hideTaskInput()
          }}
        />
      </Buttons>
    </li>
  )
}

export default TaskInput
