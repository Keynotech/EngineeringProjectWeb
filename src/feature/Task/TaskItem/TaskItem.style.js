import styled, { css } from "styled-components"
import { Link } from "react-router-dom"

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  transition: all 0.25s cubic-bezier(0.42, 0, 1, 1);
  padding: 10px 8px;
  box-sizing: border-box;
  border-bottom: 1px solid ${(props) => props.theme.secondary};

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
  margin-bottom: 4px;
  height: 24px;
  width: 100%;
`

const DatePropertie = styled.span`
  flex-shrink: 0;
  margin-right: 8px;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 12px;
  background-color: ${(props) => props.theme.tertiary};
  color: ${(props) => props.theme.textTertiary};

  ${({ isOverdue }) =>
    isOverdue &&
    css`
      color: ${(props) => props.theme.textError};
    `}
`

const Title = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.textPrimary};
  margin-right: 8px;
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
  margin-right: 8px;
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
  DatePropertie,
  PropertiesIcons,
  Description,
  DescriptionInner,
}
