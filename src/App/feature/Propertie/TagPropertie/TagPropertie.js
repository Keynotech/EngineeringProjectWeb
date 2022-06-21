/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react"
import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined"
import { useTheme } from "styled-components"
import MediumPropertie from "../../../components/PropertieLayout/MediumPropertie"
import IconPropertie from "../../../components/PropertieLayout/IconPropertie"
import StandardPropertie from "../../../components/PropertieLayout/StandardPropertie"

function TagPropertie({ value, onClick, variant }) {
  const { t } = useTranslation()

  if (variant === "icon") {
    return (
      <IconPropertie
        icon={<LocalOfferOutlinedIcon fontSize="inherit" color="inherit" />}
        onClick={onClick}
      />
    )
  }
  if (variant === "medium") {
    return (
      <MediumPropertie
        icon={<LocalOfferOutlinedIcon fontSize="inherit" color="inherit" />}
        onClick={onClick}
        label={t("picker.tag.addTag")}
        value={value}
      />
    )
  }

  return (
    <StandardPropertie
      icon={<LocalOfferOutlinedIcon fontSize="inherit" color="inherit" />}
      onClick={onClick}
      label={t("picker.tag.addTag")}
      value={value}
    />
  )
}

TagPropertie.propTypes = {
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["icon", "standard", "medium"]),
  value: PropTypes.string,
}

export default TagPropertie
