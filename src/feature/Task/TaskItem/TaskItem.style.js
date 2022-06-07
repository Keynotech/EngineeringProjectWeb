import styled from "styled-components"
import { Link } from "react-router-dom"
import { mq } from "../../../utils/mq"

const StyledLink = styled(Link)`
  cursor: default;
`

const Wrapper = styled.div`
  padding: 10px 8px;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: 1px solid ${(props) => props.theme.tertiary};
`

const CheckboxContainer = styled.div`
  display: flex;
  height: 22px;
  min-width: 32px;
  align-items: center;
`

const MainWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0px;
  max-width: 100%;
  gap: 2px;
`

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  height: 22px;
`

const Title = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.textPrimary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const PropertiesIcons = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  overflow: hidden;
  gap: 10px;
  font-size: 14px;
`

const AdditionalContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 22px;
  gap: 6px;
  min-width: 0px;
  max-width: 100%;
`

const TagsContainer = styled.div`
  flex-shrink: 0;

  @media ${mq.tablet} {
    display: flex;
    flex-direction: row;
    flex-shrink: 1;
    gap: 8px;
    overflow: hidden;
  }
`

const ProjectInfo = styled.div`
  flex-shrink: 1;
  overflow: hidden;
  position: relative;
  left: -5px;
`

const Description = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const DescriptionInner = styled.span`
  font-size: 12px;
  line-height: 18px;
  color: ${(props) => props.theme.textTertiary};
`

export {
  Wrapper,
  StyledLink,
  CheckboxContainer,
  MainWrapper,
  MainContainer,
  Title,
  TagsContainer,
  PropertiesIcons,
  ProjectInfo,
  AdditionalContainer,
  Description,
  DescriptionInner,
}
