/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useTheme } from "styled-components"
import Checkbox from "../../../components/button/Checkbox"

function TaskCheckbox({ checked, onChange, priority }) {
  const [color, setColor] = useState()
  const theme = useTheme()

  useEffect(() => {
    switch (priority) {
      case 1:
        setColor(theme.priority1)
        break
      case 2:
        setColor(theme.priority2)
        break
      case 3:
        setColor(theme.priority3)
        break
      case 4:
        setColor(theme.priority4)
        break
      case undefined:
        setColor(theme.priority1)
        break
      default:
        setColor(theme.priority1)
        break
    }
  }, [priority])

  return <Checkbox checked={checked} onChange={onChange} color={color} />
}

TaskCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  priority: PropTypes.number,
}

TaskCheckbox.defaultProps = {
  priority: 1,
}

export default TaskCheckbox
