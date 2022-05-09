/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useTheme } from "styled-components"
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
import useCreateTask from "../../../hooks/mutation/useCreateTask"

function TaskInput() {
  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _hideTaskInput = () => {
    dispatch(hideTaskInput())
  }

  // State Hooks
  // ===========================================================================
  const [title, setTitle] = useState("")
  const [status, setStatus] = useState(false)
  const [dueDate, setDueDate] = useState()
  const [priority, setPriority] = useState(1)
  const [tags, setTags] = useState([])

  // Handlers
  // ===========================================================================

  const toggleIsdone = () => setStatus(!status)

  const clearInput = () => {
    setTitle("")
    setStatus(false)
    setDueDate()
    setPriority(1)
    setTags([])
  }

  // Mutations
  // ===========================================================================
  const createTask = useCreateTask()

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
                checked={status}
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
              <PriorityPicker
                value={priority}
                onChange={(value) => setPriority(value)}
              />
              <DatePicker
                value={dueDate}
                onChange={(value) => setDueDate(value)}
                dropdownTo="left"
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
              status,
              dueDate,
              priority,
              tags,
            })
            _hideTaskInput()
          }}
        />
      </Buttons>
    </li>
  )
}

export default TaskInput
