/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react"
import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined"
import { useTheme } from "styled-components"
import MediumPropertie from "../../../components/PropertieLayout/MediumPropertie"
import IconPropertie from "../../../components/PropertieLayout/IconPropertie"
import StandardPropertie from "../../../components/PropertieLayout/StandardPropertie"
import useDatePropertie from "./UseDatePropertie"

function DatePropertie({
  value,
  onClick,
  variant,
  displayIcon,
  backgroundColor,
}) {
  const { date, overdue } = useDatePropertie({ value })
  const theme = useTheme()
  const { t } = useTranslation()

  const color = overdue === true ? theme.textError : null

  if (variant === "icon") {
    return (
      <IconPropertie
        icon={<CalendarTodayOutlinedIcon fontSize="inherit" color="inherit" />}
        onClick={onClick}
      />
    )
  }
  if (variant === "medium") {
    return (
      <MediumPropertie
        icon={<CalendarTodayOutlinedIcon fontSize="inherit" color="inherit" />}
        onClick={onClick}
        label={t("picker.date.dueDate")}
        value={date}
        color={color}
      />
    )
  }

  return (
    <StandardPropertie
      icon={<CalendarTodayOutlinedIcon fontSize="inherit" color="inherit" />}
      onClick={onClick}
      label={t("picker.date.dueDate")}
      value={date}
      color={color}
      displayIcon={displayIcon}
      backgroundColor={backgroundColor}
    />
  )
}

DatePropertie.propTypes = {
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["icon", "standard", "medium"]),
  displayIcon: PropTypes.bool,
}

export default DatePropertie
