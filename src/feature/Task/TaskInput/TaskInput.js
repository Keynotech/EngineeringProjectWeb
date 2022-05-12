import React from "react"
import OutsideClickHandler from "react-outside-click-handler"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { useTheme } from "styled-components"
import {
  Wrapper,
  Form,
  Main,
  PropertiesContainer,
  Buttons,
  Footer,
} from "./TaskInput.style"
import { hideTaskInput } from "../../../store/features/layoutSlice"
import TextInput from "../../../components/input/TextInput"
import DatePicker from "../../../components/picker/DatePicker/DatePicker"
import PriorityPicker from "../../../components/picker/PriorityPicker/PriorityPicker"
import SubmitButton from "../../../components/button/SubmitButton"
import CancelButton from "../../../components/button/CancelButton"
import TagPicker from "../../../components/picker/TagPicker/TagPicker"
import useCreateTask from "../../../hooks/mutation/useCreateTask"
import DatePropertie from "../../../components/picker/DatePicker/DatePropertie"
import TextError from "../../../components/text/TextError"

function TaskInput() {
  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _hideTaskInput = () => dispatch(hideTaskInput())

  // Mutations
  // ===========================================================================
  const createTask = useCreateTask()

  // State Hooks
  // ===========================================================================
  const isOpen = useSelector((state) => state.layout.taskInputVisibility)

  // Validation
  // ===========================================================================
  const CreateTagSchema = Yup.object().shape({
    title: Yup.string().max(50, "Max 50 characters").required(""),
  })

  // Forms
  // ===========================================================================
  const formik = useFormik({
    initialValues: {
      title: "",
      status: false,
      dueDate: null,
      priority: 1,
      tags: [],
    },
    validationSchema: CreateTagSchema,

    onSubmit: (values) => {
      createTask.mutate({
        title: values.title,
        status: values.status,
        dueDate: values.dueDate,
        priority: values.priority,
        tags: values.tags,
      })
      _hideTaskInput()
    },
  })

  // Others  // ===========================================================================
  const theme = useTheme()

  return (
    <li>
      <OutsideClickHandler disabled={!isOpen} onOutsideClick={_hideTaskInput}>
        <Wrapper>
          <Form onSubmit={formik.handleSubmit}>
            <Main>
              {formik.values.dueDate ? (
                <DatePropertie
                  displayIcon={false}
                  backgroundColor={theme.tertiary}
                  value={formik.values.dueDate}
                />
              ) : null}
              <TextInput
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                placeholder="Create new task"
                fontSize="14px"
                autoFocus
                multiline={false}
              />
              <PropertiesContainer>
                <PriorityPicker
                  id="priority"
                  name="priority"
                  value={formik.values.priority}
                  onChange={(val) => {
                    formik.setFieldValue("priority", val)
                  }}
                  displayValue={false}
                  iconSize={20}
                />
                <DatePicker
                  id="dueDate"
                  name="dueDate"
                  value={formik.values.dueDate}
                  onChange={(val) => {
                    formik.setFieldValue("dueDate", val)
                  }}
                  displayValue={false}
                  iconSize={20}
                />
                <TagPicker
                  id="tags"
                  name="tags"
                  currentTags={formik.values.tags}
                  onChange={(val) => {
                    formik.setFieldValue("tags", val)
                  }}
                  displayValue={false}
                  sa
                  iconSize={20}
                />
              </PropertiesContainer>
            </Main>
            <Footer>
              <TextError value={formik.errors.title} />
              <Buttons>
                <CancelButton
                  type="button"
                  text="Cancel"
                  onClick={_hideTaskInput}
                />
                <SubmitButton
                  text="Create"
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                />
              </Buttons>
            </Footer>
          </Form>
        </Wrapper>
      </OutsideClickHandler>
    </li>
  )
}

export default TaskInput
