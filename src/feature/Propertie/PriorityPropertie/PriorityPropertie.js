/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import StarIcon from "@mui/icons-material/Star"
import { useTheme } from "styled-components"
import MediumPropertie from "../../../components/PropertieLayout/MediumPropertie"
import IconPropertie from "../../../components/PropertieLayout/IconPropertie"
import StandardPropertie from "../../../components/PropertieLayout/StandardPropertie"

function PriorityPropertie({ value, onClick, variant, prioritiesData }) {
  const theme = useTheme()
  const { t } = useTranslation()
  const [selectedColor, setSelectedColor] = useState(theme.priority1)

  useEffect(() => {
    const active = prioritiesData.find((priority) => priority.value === value)
    setSelectedColor(active ? active.color : theme.priority1)
  }, [value])

  if (variant === "icon") {
    return (
      <IconPropertie
        icon={<StarIcon fontSize="inherit" sx={{ color: selectedColor }} />}
        onClick={onClick}
      />
    )
  }
  if (variant === "medium") {
    return (
      <MediumPropertie
        icon={<StarIcon fontSize="inherit" sx={{ color: selectedColor }} />}
        onClick={onClick}
        label={t("picker.priority.priority")}
        value={prioritiesData.find((priority) => priority.value === value).name}
      />
    )
  }

  return (
    <StandardPropertie
      icon={<StarIcon fontSize="inherit" sx={{ color: selectedColor }} />}
      onClick={onClick}
      label={t("picker.priority.priority")}
      value={prioritiesData.find((priority) => priority.value === value).name}
    />
  )
}

PriorityPropertie.propTypes = {
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["icon", "standard", "medium"]),
}

export default PriorityPropertie
