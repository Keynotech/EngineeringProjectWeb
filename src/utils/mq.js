/* eslint-disable import/prefer-default-export */
export const size = {
  desktopXL: 1800,
  desktopL: 1400,
  desktop: 1200,
  laptop: 1024,
  tablet: 768,
  phone: 480,
}

export const mq = {
  desktopXL: `(min-width: ${size.desktopXL}px)`,
  desktopL: `(min-width: ${size.desktopL}px)`,
  desktop: `(min-width: ${size.desktop}px)`,
  laptop: `(min-width: ${size.laptop}px)`,
  tablet: `(min-width: ${size.tablet}px)`,
  phone: `(min-width: ${size.phone}px)`,
}
