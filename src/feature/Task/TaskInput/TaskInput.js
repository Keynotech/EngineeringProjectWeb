/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import PropTypes from "prop-types"
import { useTheme } from "styled-components"
import {
  Wrapper,
  Form,
  Main,
  PropertiesContainer,
  Overlay,
} from "./TaskInput.style"
import { hideTaskInput } from "../../../store/features/layoutSlice"
import TextInput from "../../../components/TextInput/TextInput"
import DatePicker from "../../Pickers/DatePicker/DatePicker"
import PriorityPicker from "../../Pickers/PriorityPicker/PriorityPicker"
import TagPicker from "../../Pickers/TagPicker/TagPicker"
import useCreateTask from "../../../hooks/mutation/useCreateTask"
import DatePropertie from "../../Pickers/DatePicker/DatePropertie"
import ProjectPicker from "../../Pickers/ProjectPicker/ProjectPicker"
import ProjectPropertie from "../../Pickers/ProjectPicker/ProjectPropertie"

function TaskInput({ priority, project, tag, dueDate }) {
  // Local state
  // ===========================================================================
  const [isFocus, setFocus] = useState(false)

  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _hideTaskInput = () => {
    dispatch(hideTaskInput())
  }

  // Mutations
  // ===========================================================================
  const createTask = useCreateTask()

  // Validation
  // ===========================================================================
  const CreateTagSchema = Yup.object().shape({
    title: Yup.string().max(100, "Max 100 characters").required(""),
  })

  // Forms
  // ===========================================================================
  const formik = useFormik({
    initialValues: {
      title: "",
      status: false,
      dueDate,
      priority,
      tags: tag,
      project,
    },
    validationSchema: CreateTagSchema,

    onSubmit: (values) => {
      createTask.mutate({
        title: values.title,
        status: values.status,
        dueDate: values.dueDate,
        priority: values.priority,
        tags: values.tags,
        project: values.project,
      })
      formik.resetForm()
    },
  })

  // Others  // ===========================================================================
  const theme = useTheme()

  return (
    <>
      <Wrapper>
        <Form onSubmit={formik.handleSubmit}>
          <Main isFocus={isFocus}>
            {formik.values.dueDate ? (
              <DatePropertie
                displayIcon={false}
                backgroundColor={theme.tertiary}
                value={formik.values.dueDate}
              />
            ) : null}
            {formik.values.project ? (
              <ProjectPropertie
                displayIcon={false}
                backgroundColor={theme.tertiary}
                value={formik.values.project}
              />
            ) : null}

            <TextInput
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              id="title"
              name="title"
              value={formik.values.title}
              onChange={(val) => {
                formik.setFieldValue("title", val)
              }}
              placeholder="Create new task, press enter to save."
              fontSize="18px"
              autoFocus
              multiline={false}
              maxLength={100}
            />
            <PropertiesContainer>
              <ProjectPicker
                id="project"
                name="project"
                value={formik.values.project}
                onChange={(val) => {
                  formik.setFieldValue("project", val)
                }}
                displayValue={false}
                iconSize={20}
              />
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
        </Form>
      </Wrapper>
      <Overlay
        onClick={() => {
          _hideTaskInput()
        }}
      />
    </>
  )
}

TaskInput.propTypes = {
  priority: PropTypes.number,
  project: PropTypes.string,
  tag: PropTypes.arrayOf(PropTypes.string),
  dueDate: PropTypes.oneOfType([Date, PropTypes.string]),
}

TaskInput.defaultProps = {
  priority: 1,
  project: null,
  tag: [],
  dueDate: null,
}

export default TaskInput
