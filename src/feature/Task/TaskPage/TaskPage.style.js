import styled, { css } from "styled-components"

export const Wrapper = styled.div`
  width: 100%;
  max-height: 100vh;
  height: 100vh;
  overflow-y: auto;
  background-color: ${(props) => props.theme.background};
  border-left: 1px solid ${(props) => props.theme.tertiary};
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

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 15px;
  margin-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.tertiary};
`

export const TitleContainer = styled.div`
  min-height: 24px;
`

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  color: ${(props) => props.theme.textSecondary};
  background-color: ${(props) => props.theme.background};
  padding: 0 15px;
  width: 100%;
  box-sizing: border-box;
  flex: 1;
`

export const PropertiesContainer = styled.section`
  flex-wrap: wrap;
  display: flex;
`

export const PropertieList = styled.div`
  flex-wrap: wrap;
  width: 50%;
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

export const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 8px;
`

export const Footer = styled.div`
  position: sticky;
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
  color: ${(props) => props.theme.textTertiary};
`

export const AttachmentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 8px;
`

export const AttachmentItem = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 12px;
  border-radius: 5px;
  border: 2px dotted ${(props) => props.theme.tertiary};
  width: 100px;
  height: 80px;
  margin-bottom: 8px;

  svg {
    color: ${(props) => props.theme.brandColor};
  }

  ${({ isFile }) =>
    isFile &&
    css`
      border: 1px solid ${(props) => props.theme.tertiary};
    `}
`
export const AttachmentItemInner = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
  max-height: 100%;
  word-break: break-all;

  p {
    font-size: 12px;
    color: ${(props) => props.theme.textTertiary};

    :hover {
      text-decoration: underline;
      text-decoration-color: ${(props) => props.theme.textTertiary};
    }
  }
`
