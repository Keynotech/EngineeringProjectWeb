/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react"
import PropTypes from "prop-types"
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined"
import MediumPropertie from "../../../components/PropertieLayout/MediumPropertie"
import IconPropertie from "../../../components/PropertieLayout/IconPropertie"
import StandardPropertie from "../../../components/PropertieLayout/StandardPropertie"
import useSingleProjectQuery from "../../../hooks/query/useSingleProjectQuery"

function ProjectPropertie({ value, onClick, variant, displayIcon }) {
  const project = useSingleProjectQuery(value)

  if (variant === "icon") {
    return (
      <IconPropertie
        icon={<InboxOutlinedIcon fontSize="inherit" color="inherit" />}
        onClick={onClick}
      />
    )
  }
  if (variant === "medium") {
    return (
      <MediumPropertie
        icon={<InboxOutlinedIcon fontSize="inherit" color="inherit" />}
        onClick={onClick}
        label="Project"
        value={project ? project.projectName : "Inbox"}
      />
    )
  }

  return (
    <StandardPropertie
      icon={<InboxOutlinedIcon fontSize="inherit" color="inherit" />}
      onClick={onClick}
      value={project ? project.projectName : "Inbox"}
      displayIcon={displayIcon}
    />
  )
}

ProjectPropertie.propTypes = {
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["icon", "standard", "medium"]),
  value: PropTypes.string,
  displayIcon: PropTypes.bool,
}

export default ProjectPropertie
