import styled from "styled-components";
import { StylingConfig } from "../types/form.types";

const StyledContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const applyStyles = (
  stylingConfig: StylingConfig,
  tailwindClasses: string,
  inlineStyles: React.CSSProperties,
  externalClassName: string
) => {
  switch (stylingConfig.styling) {
    case "tailwind":
      return { className: tailwindClasses };
    case "inline":
      return { style: inlineStyles };
    case "styled":
      return { as: StyledContainer };
    case "external":
      return { className: externalClassName };
    default:
      return {};
  }
};
