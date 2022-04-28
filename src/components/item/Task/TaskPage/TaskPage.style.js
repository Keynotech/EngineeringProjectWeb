import styled, { css } from "styled-components"

export const Wrapper = styled.div`
  position: fixed;
  top: 49px;
  right: -450px;
  width: min(420px, 100vw);
  height: calc(100vh - 48px);
  overflow-y: auto;
  background-color: ${(props) => props.theme.background};
  border-left: 1px solid ${(props) => props.theme.secondary};
  transition: right 0.25s cubic-bezier(0.42, 0, 1, 1);
  &::-webkit-scrollbar {
    display: none;
  }

  ${({ isVisible }) =>
    isVisible &&
    css`
      right: 0px;
    `}
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 15px 15px;
  margin-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.secondary};
`
export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
`

export const TitleContainer = styled.div`
  flex: 1;
  min-height: 24px;
  padding: 0 15px;
`
export const Title = styled.span``

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  max-width: 100%;
  color: ${(props) => props.theme.textSecondary};
  padding: 0 15px;
`

export const SectionHeader = styled.span`
  font-weight: 600;
`

export const PropertiesContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
`

export const Propertie = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 20px;
  gap: 5px;
  color: ${(props) => props.theme.textTertiary};
  font-size: 18px;
  padding: 2px 6px;
  border: 1px solid ${(props) => props.theme.tertiary};
  border-radius: 5px;
`
export const PropertieValue = styled.span`
  font-size: 12px;
`

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
export const Footer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  font-size: 12px;
  color: ${(props) => props.theme.textTertiary};
`

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 15px;
`

export const AttachmentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
`

export const Attachment = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px 28px;
  border-radius: 5px;
  border: 2px dotted ${(props) => props.theme.tertiary};

  ${({ isFile }) =>
    isFile &&
    css`
      border: 1px solid ${(props) => props.theme.tertiary};
    `}

  p {
    font-size: 12px;
    color: ${(props) => props.theme.textTertiary};

    :hover {
      text-decoration: underline;
      text-decoration-color: ${(props) => props.theme.textTertiary};
    }
  }
  svg {
    color: ${(props) => props.theme.brandColor};
  }
`
