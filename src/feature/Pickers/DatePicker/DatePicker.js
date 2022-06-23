/* eslint-disable import/order */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import { add, format } from "date-fns"
import { CalendarPicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import styled from "styled-components"
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined"
import DoNotDisturbOutlinedIcon from "@mui/icons-material/DoNotDisturbOutlined"
import NextWeekOutlinedIcon from "@mui/icons-material/NextWeekOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import Popover from "../../../components/Popover/Popover"
import CancelButton from "../../../components/button/CancelButton"
import SubmitButton from "../../../components/button/SubmitButton"
import DateOption from "./DateOption"
import DatePropertie from "../../Propertie/DatePropertie/DatePropertie"
import useIsOpen from "../../../hooks/useIsOpen"

const Calendar = styled(CalendarPicker)`
  max-width: 290px;

  & .PrivatePickersSlideTransition-root {
    min-height: 200px;
  }
`

const DisplayValue = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  padding: 0 10px;
  height: 40px;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.tertiary};
`

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 14px;
`

const ButtonsWrapper = styled.div`
  padding: 8px 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: center;
`

function DatePicker({ value, onChange, backgroundColor, variant }) {
  const [date, setDate] = useState(null)
  const { isOpen, hide, show } = useIsOpen()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { t } = useTranslation()

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
    setDate(value)
    show()
  }

  const handleClose = () => {
    onChange(date)
    setAnchorEl(null)
    hide(false)
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
    setDate(dates[0].value.toISOString())
  }

  const setNextWeek = () => {
    setDate(dates[1].value.toISOString())
  }

  const setNextMonth = () => {
    setDate(dates[2].value.toISOString())
  }

  const setNoDate = () => {
    setDate(dates[3].value)
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
          <DisplayValue>
            {date ? format(new Date(date), "LLL do yyyy") : "Select date"}
          </DisplayValue>
          <Calendar
            disableHighlightToday
            showDaysOutsideCurrentMonth
            allowSameDateSelection
            minDate={new Date()}
            value={value}
            onChange={(newValue) => {
              setDate(newValue.toISOString())
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
          <ButtonsWrapper>
            <CancelButton
              style={{ width: "100%" }}
              type="button"
              onClick={hide}
              text={t("cancel")}
            />
            <SubmitButton
              style={{ width: "100%" }}
              text="Done"
              type="submit"
              disabled={false}
              onClick={() => {
                onChange(date)
                hide()
              }}
            />
          </ButtonsWrapper>
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
