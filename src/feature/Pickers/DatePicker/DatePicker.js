/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import { add } from "date-fns"
import { CalendarPicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import styled from "styled-components"
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined"
import DoNotDisturbOutlinedIcon from "@mui/icons-material/DoNotDisturbOutlined"
import NextWeekOutlinedIcon from "@mui/icons-material/NextWeekOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import Popover from "../../../components/Popover/Popover"
import DateOption from "./DateOption"
import DatePropertie from "../../Propertie/DatePropertie/DatePropertie"

const Calendar = styled(CalendarPicker)`
  max-width: 290px;
  & .PrivatePickersSlideTransition-root {
    min-height: 200px;
  }
`

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 14px;
`

function DatePicker({ value, onChange, backgroundColor, variant }) {
  const [isOpen, setIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { t } = useTranslation()

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
    setIsOpen(true)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setIsOpen(false)
  }

  const togglePopover = (e) => {
    if (isOpen) {
      handleClose(e)
    } else {
      handleOpen(e)
    }
  }

  const dates = [
    {
      title: t("picker.date.tomorrow"),
      value: add(new Date(), {
        days: 1,
      }),
    },
    {
      title: t("picker.date.nextWeek"),
      value: add(new Date(), {
        weeks: 1,
      }),
    },
    {
      title: t("picker.date.nextMonth"),
      value: add(new Date(), {
        months: 1,
      }),
    },
    {
      title: value ? t("picker.date.remove") : t("picker.date.noDate"),
      value: null,
    },
  ]

  const setTomorrow = () => {
    onChange(dates[0].value.toISOString())
    setIsOpen(false)
  }

  const setNextWeek = () => {
    onChange(dates[1].value.toISOString())
    setIsOpen(false)
  }

  const setNextMonth = () => {
    onChange(dates[2].value.toISOString())
    setIsOpen(false)
  }

  const setNoDate = () => {
    onChange(dates[3].value)
    setIsOpen(false)
  }

  return (
    <>
      <DatePropertie
        onClick={togglePopover}
        value={value}
        backgroundColor={backgroundColor}
        variant={variant}
      />

      <Popover isOpen={isOpen} anchorEl={anchorEl} onOutsideClick={handleClose}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Calendar
            showDaysOutsideCurrentMonth
            allowSameDateSelection
            minDate={new Date()}
            value={value}
            onChange={(newValue) => {
              onChange(newValue.toISOString())
              setIsOpen(false)
            }}
          />
          <OptionsWrapper>
            <DateOption
              onClick={setTomorrow}
              title={dates[0].title}
              icon={<WbSunnyOutlinedIcon fontSize="inherit" color="inherit" />}
              value={dates[0].value}
            />
            <DateOption
              onClick={setNextWeek}
              title={dates[1].title}
              icon={<NextWeekOutlinedIcon fontSize="inherit" color="inherit" />}
              value={dates[1].value}
            />
            <DateOption
              onClick={setNextMonth}
              title={dates[2].title}
              icon={<DarkModeOutlinedIcon fontSize="inherit" color="inherit" />}
              value={dates[2].value}
            />
            <DateOption
              onClick={setNoDate}
              title={dates[3].title}
              icon={
                <DoNotDisturbOutlinedIcon fontSize="inherit" color="inherit" />
              }
              value={dates[3].value}
            />
          </OptionsWrapper>
        </LocalizationProvider>
      </Popover>
    </>
  )
}

DatePicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string,
  variant: PropTypes.oneOf(["icon", "standard", "medium"]),
}

DatePicker.defaultProps = {
  value: "",
  variant: "standard",
}

export default DatePicker
