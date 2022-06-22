import React from "react"
import PropTypes from "prop-types"
import AppleIcon from "@mui/icons-material/Apple"
import SocialAuthButton from "../../components/SocialAuthButton"

function AppleAuthBtn({ onClick }) {
  return (
    <SocialAuthButton
      onClick={onClick}
      icon={<AppleIcon color="inherit" />}
      text="Continue with Apple"
    />
  )
}

AppleAuthBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default AppleAuthBtn
