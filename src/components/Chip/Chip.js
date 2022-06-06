/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
import React from "react"
import styled, { css } from "styled-components"
import PropTypes from "prop-types"
import ClearIcon from "@mui/icons-material/Clear"

const ChipLabel = styled.span`
  padding-left: 10px;
  padding-right: 10px;
  font-weight: 400;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 16px;

  ${({ ownerState }) =>
    ownerState.size === "small" &&
    css`
      font-size: 12px;
      line-height: 14px;
      padding-left: 6px;
      padding-right: 6px;
    `};
`

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  margin-right: 5px;
`

const DeleteIconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.secondary};
  border-radius: 25px;
  margin-left: 5px;
  margin-right: 5px;

  &:hover {
    background-color: ${(props) => props.theme.tertiary};
  }
`

const ChipWrapper = styled.div`
  max-width: 100px;
  height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.tertiary};
  color: ${(props) => props.theme.textTertiary};

  ${({ ownerState }) =>
    (ownerState.variant === "filled" &&
      css`
        background-color: ${(props) => props.theme.tertiary};
      `) ||
    (ownerState.variant === "outlined" &&
      css`
        background-color: transparent;
      `)}

  ${({ ownerState }) =>
    ownerState.size === "small" &&
    css`
      height: 18px;
    `};

  ${({ ownerState }) =>
    ownerState.clickable === true &&
    css`
      cursor: pointer;
    `}

  ${DeleteIconWrapper} {
    height: 18px;
    width: 18px;
    font-size: 16px;
    ${({ ownerState }) =>
      ownerState.size === "small" &&
      css`
        height: 16px;
        width: 16px;
        font-size: 14px;
      `}
  }

  ${IconWrapper} {
    height: 20px;
    width: 20px;
    font-size: 16px;
    ${({ ownerState }) =>
      ownerState.size === "small" &&
      css`
        height: 16px;
        width: 16px;
        font-size: 14px;
      `}
  }
`

function Chip({
  label,
  icon: iconProp,
  variant: variantProp,
  onDelete,
  onClick,
  clickable,
  size,
}) {
  const ownerState = {
    variant: variantProp,
    clickable,

    size,
  }

  let icon = null
  if (iconProp) {
    icon = <IconWrapper>{iconProp}</IconWrapper>
  }

  const handleDeleteIconClick = (event) => {
    event.stopPropagation()
    if (onDelete) {
      onDelete()
    }
  }

  let deleteIcon = null
  if (onDelete) {
    deleteIcon = (
      <DeleteIconWrapper onClick={handleDeleteIconClick}>
        <ClearIcon fontSize="inherit" />
      </DeleteIconWrapper>
    )
  }

  const _onClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (onClick) {
      onClick()
    }
  }

  return (
    <ChipWrapper onClick={_onClick} ownerState={ownerState}>
      {icon}
      <ChipLabel ownerState={ownerState}> {label}</ChipLabel>
      {deleteIcon}
    </ChipWrapper>
  )
}

Chip.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.element,
  variant: PropTypes.oneOf(["filled", "outlined"]),
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
  clickable: PropTypes.bool,
  size: PropTypes.string,
}

Chip.defaultProps = {
  icon: null,
  variant: "filled",
  clickable: false,
}

export default Chip
