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
`

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 32px;
`

export const PropertiesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`
