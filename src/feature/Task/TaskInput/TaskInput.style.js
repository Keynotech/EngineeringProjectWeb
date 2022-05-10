import styled from "styled-components"

export const Wrapper = styled.div`
  position: relative;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.secondary};
  transition: all 0.25s cubic-bezier(0.42, 0, 1, 1);
  background-color: ${(props) => props.theme.primary};
  margin-bottom: 20px;
`

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-direction: column;
  gap: 6px;
`

export const Main = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 30px;
  gap: 8px;
`

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 24px;
`

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 30px;
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
  justify-content: space-between;
  gap: 8px;
`
