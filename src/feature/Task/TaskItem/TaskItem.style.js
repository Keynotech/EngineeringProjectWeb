import styled, { css } from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: relative;
  transition: all 0.25s cubic-bezier(0.42, 0, 1, 1);
  padding: 10px 8px;
  border-bottom: 1px solid ${(props) => props.theme.secondary};

  &:hover {
    background-color: aliceblue;
    border-radius: 4px;
  }
`

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 24px;
  min-width: 32px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  width: 100%;
  min-width: 0px;
`

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
  min-height: 24px;
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
`

const PropertiesIcons = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 2;
  overflow: hidden;
  gap: 10px;
  font-size: 14px;
  margin-right: 8px;
`

const DetailsContainer = styled.div`
  display: none;
  ${({ displayTasksDetails }) =>
    displayTasksDetails &&
    css`
      display: flex;
      flex-direction: column;
    `}
`
export const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  //justify-content: flex-end;
  gap: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`

const Description = styled.div`
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
  Content,
  CheckboxContainer,
  MainContainer,
  Title,
  DatePropertie,
  PropertiesIcons,
  DetailsContainer,
  Description,
  DescriptionInner,
}
