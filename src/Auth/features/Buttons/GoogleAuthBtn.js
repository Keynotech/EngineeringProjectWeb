import React from "react"
import PropTypes from "prop-types"
import GoogleIcon from "@mui/icons-material/Google"
import SocialAuthButton from "../../components/SocialAuthButton"

function GoogleAuthBtn({ onClick }) {
  return (
    <SocialAuthButton
      onClick={onClick}
      icon={<GoogleIcon color="inherit" />}
      text="Continue with Google"
    />
  )
}

GoogleAuthBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default GoogleAuthBtn
