import styled from "styled-components"
import { Link } from "react-router-dom"

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  transition: all 0.25s cubic-bezier(0.42, 0, 1, 1);
  padding: 10px 8px;
  box-sizing: border-box;
  border-bottom: 1px solid ${(props) => props.theme.tertiary};

  &:hover {
    background-color: aliceblue;
    border-radius: 4px;
  }
`

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
  width: 32px;
`

const StyledLink = styled(Link)`
  min-width: 0px;
  max-width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: default;
`

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  height: 24px;
  width: 100%;
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
