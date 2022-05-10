import React, { useState, useEffect } from "react"
import OutsideClickHandler from "react-outside-click-handler"
import { useDispatch, useSelector } from "react-redux"
import { useTheme } from "styled-components"
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
  Footer,
} from "./TaskInput.style"
import { hideTaskInput } from "../../../store/features/layoutSlice"
import TextInput from "../../../components/input/TextInput"
import DatePicker from "../../../components/picker/DatePicker/DatePicker"
import PriorityPicker from "../../../components/picker/PriorityPicker/PriorityPicker"
import SubmitButton from "../../../components/button/SubmitButton"
import CancelButton from "../../../components/button/CancelButton"
import TagPicker from "../../../components/picker/TagPicker/TagPicker"
import TagDisplayInTask from "../../Tag/TagDisplayInTask/TagDisplayInTask"
import useCreateTask from "../../../hooks/mutation/useCreateTask"
import DatePropertie from "../../../components/picker/DatePicker/DatePropertie"

function TaskInput() {
  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _hideTaskInput = () => dispatch(hideTaskInput())

  // State Hooks
  // ===========================================================================
  const [title, setTitle] = useState("")
  const [status, setStatus] = useState(false)
  const [dueDate, setDueDate] = useState()
  const [priority, setPriority] = useState(1)
  const [tags, setTags] = useState([])
  const isOpen = useSelector((state) => state.layout.taskInputVisibility)

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
      <OutsideClickHandler disabled={!isOpen} onOutsideClick={_hideTaskInput}>
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
              {dueDate ? <DatePropertie value={dueDate} /> : null}
              <TextInput
                value={title}
                onChange={(value) => setTitle(value)}
                placeholder="Create new task"
                fontSize="14px"
                autoFocus
                multiline={false}
              />
              <PropertiesContainer>
                <PriorityPicker
                  value={priority}
                  onChange={(value) => setPriority(value)}
                  displayValue={false}
                  iconSize={20}
                />
                <DatePicker
                  value={dueDate}
                  onChange={(value) => setDueDate(value)}
                  displayValue={false}
                  iconSize={20}
                />
                <TagPicker
                  currentTags={tags}
                  onChange={(value) => setTags([...value])}
                  displayValue={false}
                  iconSize={20}
                />
              </PropertiesContainer>
              <ClearIcon
                sx={{
                  color: theme.textTertiary,
                }}
                onClick={clearInput}
              />
            </Main>
            <Footer>
              <TagsContainer>
                {tags?.map((tag) => (
                  <TagDisplayInTask key={tag} tagId={tag} />
                ))}
              </TagsContainer>
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
            </Footer>
          </Container>
        </Wrapper>
      </OutsideClickHandler>
    </li>
  )
}

export default TaskInput
