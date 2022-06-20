/* eslint-disable react/require-default-props */
import React from "react"
import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import styled, { useTheme } from "styled-components"
import StarIcon from "@mui/icons-material/Star"
import Popover from "../../../components/Popover/Popover"
import useIsOpen from "../../../hooks/useIsOpen"
import PriorityPropertie from "../../Propertie/PriorityPropertie/PriorityPropertie"
import PickerItem from "../PickerItem"

const Wrapper = styled.div`
  width: 200px;
  max-width: 90vw;
`

function PriorityPicker({ value, onChange, variant }) {
  // Others
  // ===========================================================================
  const theme = useTheme()
  const { t } = useTranslation()

  const prioritiesData = [
    { name: t("picker.priority.urgent"), value: 4, color: theme.priority4 },
    { name: t("picker.priority.high"), value: 3, color: theme.priority3 },
    { name: t("picker.priority.medium"), value: 2, color: theme.priority2 },
    { name: t("picker.priority.low"), value: 1, color: theme.priority1 },
  ]

  // State Hooks
  // ===========================================================================
  const { isOpen, hide, show } = useIsOpen()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
    show()
  }

  const handleClose = () => {
    setAnchorEl(null)
    hide()
  }

  const togglePopover = (e) => {
    if (isOpen) {
      handleClose()
    } else {
      handleOpen(e)
    }
  }

  return (
    <>
      <PriorityPropertie
        prioritiesData={prioritiesData}
        value={value}
        onClick={togglePopover}
        variant={variant}
      />
      <Popover isOpen={isOpen} anchorEl={anchorEl} onOutsideClick={handleClose}>
        <Wrapper>
          {prioritiesData.map((priority) => (
            <PickerItem
              isActive={value === priority.value || false}
              key={priority.value}
              onClick={() => {
                onChange(priority.value)
                hide()
              }}
              icon={
                <StarIcon fontSize="inherit" sx={{ color: priority.color }} />
              }
              name={priority.name}
            />
          ))}
        </Wrapper>
      </Popover>
    </>
  )
}

PriorityPicker.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.string,
}

export default PriorityPicker
