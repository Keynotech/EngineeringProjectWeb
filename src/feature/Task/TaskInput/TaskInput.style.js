import styled from "styled-components"
import zIndex from "../../../utils/zIndex"

export const Wrapper = styled.div`
  position: relative;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.secondary};
  background-color: ${(props) => props.theme.primary};
  margin-bottom: 20px;
  z-index: 801;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 15px;
`

export const Main = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 30px;
`

export const PropertiesContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
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

export const Overlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: ${zIndex.level8};
  opacity: 0.2;
`
