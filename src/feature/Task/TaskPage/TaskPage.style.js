import styled from "styled-components"

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
  align-items: center;
  min-height: 48px;
  max-height: 48px;
  padding: 0 15px;
  margin-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.tertiary};
`

export const TitleContainer = styled.div`
  min-height: 24px;
`

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  color: ${(props) => props.theme.textSecondary};
  background-color: ${(props) => props.theme.background};
  padding: 0 15px;
  width: 100%;
  box-sizing: border-box;
  flex: 1;
  position: relative;
`

export const PropertiesContainer = styled.section`
  flex-wrap: wrap;
  display: flex;
`

export const PropertieList = styled.div`
  flex-wrap: wrap;
  width: 50%;
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
  border-top: 1px solid ${(props) => props.theme.tertiary};
`

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 15px;
  color: ${(props) => props.theme.textTertiary};
`
