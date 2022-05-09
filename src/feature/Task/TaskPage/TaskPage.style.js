import styled, { css } from "styled-components"

export const Wrapper = styled.div`
  width: 100%;
  max-height: calc(100vh - 48px);
  height: calc(100vh - 48px);
  overflow-y: auto;
  background-color: ${(props) => props.theme.background};
  border-left: 1px solid ${(props) => props.theme.secondary};

  &::-webkit-scrollbar {
    display: none;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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
  color: ${(props) => props.theme.textTertiary};
`

export const TitleContainer = styled.div`
  flex: 1;
  min-height: 32px;
  padding: 0 15px;
`

export const DetailsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  color: ${(props) => props.theme.textSecondary};
  background-color: ${(props) => props.theme.background};
  padding: 0 15px;
`
export const SectionWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const SectionHeader = styled.span`
  font-size: 14px;
  font-weight: 600;
`

export const PropertiesContainer = styled.section`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`

export const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 8px;
`

export const Footer = styled.div`
  width: 100%;
  bottom: 0;
  font-size: 12px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textTertiary};
`

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textTertiary};
`

export const AttachmentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 8px;
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

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const MenuItem = styled.button`
  display: flex;
  width: 100%;
  overflow: visible;
  flex-direction: row;
  align-items: center;
  gap: 14px;
  padding: 8px 20px 8px 12px;
  box-sizing: border-box;
  font-size: 14px;
  color: ${(props) => props.theme.textTertiary};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }
`
