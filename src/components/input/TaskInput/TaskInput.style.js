import styled from "styled-components"

export const Wrapper = styled.div`
  position: relative;
  padding: 10px 8px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.secondary};
  background-color: ${(props) => props.theme.primary};
  transition: all 0.25s cubic-bezier(0.42, 0, 1, 1);
`

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-direction: column;
  gap: 10px;
`

export const Main = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 24px;
`

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 32px;
`

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`

export const PropertiesContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: nowrap;
`
export const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px 8px;
  gap: 10px;
`
