import styled from "styled-components"
import { Link } from "react-router-dom"
import { mq } from "../../../utils/mq"

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 8px;
  box-sizing: border-box;
  border-bottom: 1px solid ${(props) => props.theme.secondary};
`

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  width: 32px;
`

const StyledLink = styled(Link)`
  min-width: 0px;
  max-width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: default;
`

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  height: 32px;
  width: 100%;
  cursor: pointer;
`
const Title = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.textPrimary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media ${mq.laptop} {
    font-size: 14px;
  }
`

const PropertiesIcons = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  overflow: hidden;
  gap: 10px;
  font-size: 14px;
`

export const TagsContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  gap: 8px;
  overflow: hidden;
`

const Description = styled.div`
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
  MainContainer,
  Title,
  PropertiesIcons,
  Description,
  DescriptionInner,
}
