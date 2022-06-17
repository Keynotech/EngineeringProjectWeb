/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import React, { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import CloseIcon from "@mui/icons-material/Close"
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { useTheme } from "styled-components"
import { hideTaskPage } from "../../../store/features/layoutSlice"
import Checkbox from "../TaskCheckbox/TaskCheckbox"
import TitleInput from "./TitleInput"
import DescriptionInput from "./DescriptionInput"
import PriorityPicker from "../../Pickers/PriorityPicker/PriorityPicker"
import DatePicker from "../../Pickers/DatePicker/DatePicker"
import TagPicker from "../../Pickers/TagPicker/TagPicker"
import ProjectPicker from "../../Pickers/ProjectPicker/ProjectPicker"
import { formatDateTimeToDisplay } from "../../../utils/dateConvert"
import {
  Wrapper,
  Container,
  HeaderContainer,
  TitleContainer,
  DetailsContainer,
  SectionHeader,
  PropertiesContainer,
  PropertieList,
  SectionContainer,
  Footer,
  TagsContainer,
  FooterContainer,
} from "./TaskPage.style"
import AttachmentList from "../../Attachment/AttachmentList"
import useSingleTaskQuery from "../../../hooks/query/useSingleTaskQuery"
import useDeleteTask from "../../../hooks/mutation/useDeleteTask"
import useUpdateTask from "../../../hooks/mutation/useUpdateTask"
import FileUpload from "../../Attachment/FileUpload/FileUpload"
import {
  DropdownMenu,
  DropdownItemMenu,
} from "../../../components/DropdownMenu"
import useGetTaskTags from "../../../hooks/query/useGetTaskTags"
import Chip from "../../../components/Chip/Chip"

function TaskPage() {
  // Others
  // ===========================================================================
  const theme = useTheme()
  const navigate = useNavigate()
  const goBack = () => navigate("../")
  const { t } = useTranslation()

  // Queries
  // ===========================================================================
  let { taskId } = useParams()
  const task = useSingleTaskQuery(taskId)
  const taskTags = useGetTaskTags(task && task.isSuccess ? task.data.tags : [])

  // Local State
  // ===========================================================================

  const [menuIsOpen, toggleMenu] = useState(false)

  // Selectors
  // ===========================================================================
  const isOpen = useSelector((state) => state.layout.taskPageVisibility)

  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _hideTaskPage = () => dispatch(hideTaskPage())

  // Mutations
  // ===========================================================================
  const updateTaskMutation = useUpdateTask(taskId)
  const deleteTaskMutation = useDeleteTask(taskId)

  const deleteTask = () => {
    deleteTaskMutation.mutate()
    goBack()
  }
  const changeDesc = (value) =>
    updateTaskMutation.mutate({ description: value })
  const changeTitle = (value) => updateTaskMutation.mutate({ title: value })
  const changePriority = (value) =>
    updateTaskMutation.mutate({ priority: value })
  const changeDueDate = (value) => updateTaskMutation.mutate({ dueDate: value })
  const changeStatus = () =>
    updateTaskMutation.mutate({ status: !task.data.status })
  const changeTags = (value) => updateTaskMutation.mutate({ tags: value }) // [TODO] mutates every time, even if the data hasnt changed
  const changeProject = (value) => updateTaskMutation.mutate({ project: value })
  const removeTag = (tagId) => {
    const index = task.data.tags.findIndex((tag) => tag === tagId)
    const newData = [
      ...task.data.tags.slice(0, index),
      ...task.data.tags.slice(index + 1),
    ]
    updateTaskMutation.mutate({ tags: newData })
  }
  // ref
  // ===========================================================================
  const fileUploadRef = useRef()
  const openUpload = () => fileUploadRef.current.openUpload()

  // Hooks
  // ===========================================================================

  useEffect(() => {
    toggleMenu(false)
  }, [taskId])

  useEffect(() => {
    if (task.isError) {
      _hideTaskPage()
      goBack()
    }
  }, [task.isError])

  // TaskMenuFunction
  // ===========================================================================

  const goToProject = () => {
    _hideTaskPage()
    if (task.project !== null) {
      navigate(`/project/${task.project}`)
    } else {
      navigate("/inbox")
    }
  }

  let tags = null
  if (taskTags) {
    tags = taskTags?.map((tag) => (
      <Chip
        onClick={() => navigate(`/tag/${tag._id}/tasks/${taskId}`)}
        label={tag?.tagName}
        key={tag?._id}
        variant="outlined"
        size="small"
        clickable
        onDelete={() => removeTag(tag._id)}
      />
    ))
  }

  return task && task.isSuccess ? (
    <>
      {isOpen ? <FileUpload ref={fileUploadRef} taskId={taskId} /> : null}

      <Wrapper>
        <Container>
          <HeaderContainer>
            <Checkbox
              checked={task.data.status}
              onChange={changeStatus}
              priority={task.data.priority}
            />

            <CloseIcon
              onClick={() => {
                _hideTaskPage()
                goBack()
              }}
              sx={{ cursor: "pointer", color: theme.textTertiary }}
            />
          </HeaderContainer>
          <DetailsContainer>
            <TitleContainer>
              <TitleInput
                id="task-title"
                name="task-title"
                value={task.data.title}
                onChange={changeTitle}
                placeholder={t("task.title")}
                maxLength={100}
                multiline
                fontSize="22px"
                fontWeight={500}
              />
            </TitleContainer>
            <PropertiesContainer>
              <PropertieList>
                <DatePicker
                  onChange={changeDueDate}
                  value={task.data.dueDate}
                  variant="medium"
                />
                <ProjectPicker
                  onChange={changeProject}
                  variant="medium"
                  value={task.data.project}
                />
              </PropertieList>
              <PropertieList style={{ paddingLeft: "8px" }}>
                <PriorityPicker
                  onChange={changePriority}
                  value={task.data.priority}
                  variant="medium"
                />
                <TagPicker
                  onChange={changeTags}
                  variant="medium"
                  currentTags={task.data.tags}
                  value={`${task.data.tags.length} ${
                    task.data.tags.length !== 1 ? "tags" : "tag"
                  }`}
                />
              </PropertieList>
            </PropertiesContainer>

            <SectionContainer>
              <DescriptionInput
                id="task-description"
                name="task-description"
                value={task.data.description}
                onChange={changeDesc}
                placeholder={t("task.desc")}
                multiline
                maxRows={20}
                minRows={5}
                maxLength={10000}
                fontSize="14px"
              />
              <TagsContainer>{tags}</TagsContainer>
            </SectionContainer>

            <SectionContainer>
              <SectionHeader>
                {t("attachments.attachments")}{" "}
                {task.data.files ? `(${task.data.files.length})` : null}
              </SectionHeader>

              <AttachmentList
                attachments={task.data.files}
                taskId={task.data._id}
                openUpload={openUpload}
              />
            </SectionContainer>
          </DetailsContainer>

          <Footer>
            <FooterContainer>
              <div>
                {t("task.updatedAt")}{" "}
                {formatDateTimeToDisplay(task.data.updated)}
              </div>

              <DropdownMenu
                isOpen={menuIsOpen}
                outsideClick={() => {
                  toggleMenu(false)
                }}
                toggle={
                  <MoreHorizIcon
                    color="inherit"
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => toggleMenu(!menuIsOpen)}
                  />
                }
              >
                <DropdownItemMenu
                  leftIcon={
                    <ForwardOutlinedIcon color="inherit" fontSize="inehrit" />
                  }
                  label={t("task.taskMenu.goToProject")}
                  onClick={goToProject}
                />
                <DropdownItemMenu
                  leftIcon={
                    <DeleteOutlineOutlinedIcon
                      color="inherit"
                      fontSize="inehrit"
                    />
                  }
                  label={t("task.taskMenu.delete")}
                  onClick={deleteTask}
                />
              </DropdownMenu>
            </FooterContainer>
          </Footer>
        </Container>
      </Wrapper>
    </>
  ) : null
}

export default TaskPage

/*
          <DropdownItemMenu
                leftIcon={
                  <ContentCopyOutlinedIcon color="inherit" fontSize="inehrit" />
                }
                label={t("task.taskMenu.duplicate")}
              />
 

*/
