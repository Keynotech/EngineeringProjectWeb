/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useTheme } from "styled-components"
import { useMutation, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import ClearIcon from "@mui/icons-material/Clear"
import Checkbox from "../../../components/button/Checkbox"
import {
  Wrapper,
  Container,
  Main,
  CheckboxContainer,
  PropertiesContainer,
  Buttons,
  TagsContainer,
  DetailsContainer,
} from "./TaskInput.style"
import {
  hideTaskInput,
  showTaskPage,
} from "../../../store/features/layoutSlice"
import TextInput from "../../../components/input/TextInput"
import DatePicker from "../../../components/picker/DatePicker/DatePicker"
import PriorityPicker from "../../../components/picker/PriorityPicker/PriorityPicker"
import SubmitButton from "../../../components/button/SubmitButton"
import CancelButton from "../../../components/button/CancelButton"
import TagPicker from "../../../components/picker/TagPicker/TagPicker"
import TagDisplayInTask from "../../Tag/TagDisplayInTask/TagDisplayInTask"

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

  // State Hooks
  // ===========================================================================
  const [title, setTitle] = useState("")
  const [isDone, setIsDone] = useState(false)
  const [dueDate, setDueDate] = useState()
  const [priority, setPriority] = useState(1)
  const [tags, setTags] = useState([])

  // Handlers
  // ===========================================================================

  const toggleIsdone = () => setIsDone(!isDone)

  const clearInput = () => {
    setTitle("")
    setIsDone(false)
    setDueDate()
    setPriority(1)
    setTags([])
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
          tags,
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

  // Effect Hooks
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
              onClick={clearInput}
            />
          </Main>
          <DetailsContainer>
            <TagsContainer>
              {tags?.map((tag) => (
                <TagDisplayInTask key={tag} tagId={tag} />
              ))}
            </TagsContainer>
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
          </DetailsContainer>
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
