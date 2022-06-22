/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import styled, { css } from "styled-components"
import SearchIcon from "@mui/icons-material/Search"
import ClearIcon from "@mui/icons-material/Clear"
import { useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import Dialog from "../../components/Dialog/Dialog"
import TextInput from "../../../components/TextInput/TextInput"
import { hideQuickFind, showTaskPage } from "../../store/features/layoutSlice"
import TaskItem from "../Task/TaskItem/TaskItem"
import ProjectIcon from "../Project/ProjectIcon/ProjectIcon"
import TagIcon from "../Tag/TagIcon/TagIcon"
import SingleItem from "../../components/SingleItem/SingleItem"

const Wrapper = styled.div`
  width: min(600px, 90vw);
  height: min(600px, 90vh);
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Input = styled.div`
  width: 100%;
  height: 48px;
  padding: 8px 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid ${(props) => props.theme.tertiary};
`

const EmptySearch = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  padding: 40px 0;
  position: relative;
`

const EmptySearchLabel = styled.span`
  font-size: 22px;
  position: relative;
  bottom: 40px;
`

const Image = styled.img`
  position: absolute;
  transform: scale(0.5);
`

const SearchResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  padding: 8px 15px;
`

const SearchResultList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const SearchItem = styled.span`
  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }

  ${({ border }) =>
    border &&
    css`
      border-bottom: 1px solid ${(props) => props.theme.tertiary};
    `};

  ${({ padding }) =>
    padding &&
    css`
      padding: 10px 0px;
    `};
`

function QuickFind() {
  const { t } = useTranslation()
  // Local State
  // ===========================================================================
  const [searchText, setSearchText] = useState("")
  const [searchedTasks, setSearchedTasks] = useState([])
  const [searchedProjects, setSearchedProjects] = useState([])
  const [searchedTags, setSearchedTags] = useState([])

  const clearSearch = () => {
    setSearchText("")
    setSearchedTags([])
    setSearchedProjects([])
    setSearchedTasks([])
  }

  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const hide = () => dispatch(hideQuickFind())
  const openTaskPage = () => dispatch(showTaskPage())

  // Navigate
  // ===========================================================================
  const navigate = useNavigate()
  const goToTaskPage = (task) => {
    hide()
    if (task.project) {
      navigate(`/project/${task.project}/tasks/${task._id}`)
    } else {
      navigate(`/inbox/tasks/${task._id}`)
    }
    openTaskPage()
  }

  const goToTagPage = (tag) => {
    hide()
    navigate(`/tag/${tag._id}`)
  }

  const goToProjectPage = (project) => {
    hide()
    navigate(`/project/${project._id}`)
  }

  // Query Data
  // ===========================================================================
  const queryClient = useQueryClient()
  const tasksData = queryClient.getQueryData(["tasks"])
  const projectsData = queryClient.getQueryData(["projects"])
  const tagsData = queryClient.getQueryData(["tags"])

  useEffect(() => {
    if (searchText) {
      setSearchedTasks(() =>
        tasksData.filter((elem) => elem.title.match(searchText))
      )
      setSearchedTags(() =>
        tagsData.filter((elem) => elem.tagName.match(searchText))
      )

      setSearchedProjects(() =>
        projectsData.filter((elem) => elem.projectName.match(searchText))
      )
    } else if (!searchText) {
      clearSearch()
    }
  }, [searchText])

  return (
    <Dialog onOutsideClick={hide} dialogName={t("quickFind.title")}>
      <Wrapper>
        <Input>
          <SearchIcon sx={{ fontSize: "18px" }} />
          <TextInput
            autoFocus
            multiline={false}
            id="quick-find"
            name="quick-find"
            placeholder={t("quickFind.search")}
            value={searchText}
            fontSize="16px"
            onChange={(val) => setSearchText(val)}
          />
          <ClearIcon
            onClick={clearSearch}
            sx={{ fontSize: "18px", cursor: "pointer" }}
          />
        </Input>

        {!searchText ? (
          <EmptySearch>
            <Image
              alt="loading-screen"
              src={`${process.env.PUBLIC_URL}/assets/undraw_searching_re_3ra9.svg`}
            />
            <EmptySearchLabel>{t("quickFind.searchItems")}</EmptySearchLabel>
          </EmptySearch>
        ) : (
          <SearchResultWrapper>
            {searchedTasks.length
              ? searchedTasks.map((task) => (
                  <SearchItem
                    key={task._id}
                    type="button"
                    onClick={() => goToTaskPage(task)}
                  >
                    <TaskItem displayCheckbox={false} task={task} disableTag />
                  </SearchItem>
                ))
              : null}
            {searchedProjects.length ? (
              <SearchResultList>
                {searchedProjects.map((project) => (
                  <SearchItem
                    border
                    padding
                    key={project._id}
                    type="button"
                    onClick={() => goToProjectPage(project)}
                  >
                    <SingleItem
                      name={project.projectName}
                      icon={<ProjectIcon />}
                    />
                  </SearchItem>
                ))}
              </SearchResultList>
            ) : null}
            {searchedTags.length ? (
              <SearchResultList>
                {searchedTags.map((tag) => (
                  <SearchItem
                    border
                    padding
                    key={tag._id}
                    type="button"
                    onClick={() => goToTagPage(tag)}
                  >
                    <SingleItem name={tag.tagName} icon={<TagIcon />} />
                  </SearchItem>
                ))}
              </SearchResultList>
            ) : null}
          </SearchResultWrapper>
        )}
      </Wrapper>
    </Dialog>
  )
}
export default QuickFind