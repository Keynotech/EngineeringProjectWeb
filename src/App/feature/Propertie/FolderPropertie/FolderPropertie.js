/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react"
import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined"
import MediumPropertie from "../../../components/PropertieLayout/MediumPropertie"
import IconPropertie from "../../../components/PropertieLayout/IconPropertie"
import StandardPropertie from "../../../components/PropertieLayout/StandardPropertie"
import useSingleFolderQuery from "../../../hooks/query/useSingleFolderQuery"

function FolderPropertie({ value, onClick, variant, displayIcon }) {
  const { t } = useTranslation()
  const folder = useSingleFolderQuery(value)

  if (variant === "icon") {
    return (
      <IconPropertie
        icon={<FolderOutlinedIcon fontSize="inherit" color="inherit" />}
        onClick={onClick}
      />
    )
  }
  if (variant === "medium") {
    return (
      <MediumPropertie
        icon={<FolderOutlinedIcon fontSize="inherit" color="inherit" />}
        onClick={onClick}
        label={t("picker.folder.folder")}
        value={folder ? folder.folderName : t("picker.folder.none")}
      />
    )
  }

  return (
    <StandardPropertie
      icon={<FolderOutlinedIcon fontSize="inherit" color="inherit" />}
      onClick={onClick}
      value={folder ? folder.folderName : t("picker.folder.none")}
      displayIcon={displayIcon}
    />
  )
}

FolderPropertie.propTypes = {
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["icon", "standard", "medium"]),
  value: PropTypes.string,
  displayIcon: PropTypes.bool,
}

export default FolderPropertie
