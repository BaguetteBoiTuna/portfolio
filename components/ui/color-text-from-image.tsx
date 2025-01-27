import React from "react";
import { useExtractColors } from "react-extract-colors";
import tinycolor from "tinycolor2";

const ColorTextFromImage: React.FC<{
  imageUrl: string;
  text: string;
  className?: string;
}> = ({ imageUrl, text, className }) => {
  const { dominantColor, loading, error } = useExtractColors(imageUrl);

  const getSafeColor = (hex: string) => {
    const color = tinycolor(hex);
    if (!color.isValid()) return "#ffffff";
    if (color.isDark()) return color.lighten(50).toHexString();
    return hex;
  };

  if (loading || error) return <span className={className}>{text}</span>;

  const defaultColor = "#ffffff";
  const textColor = dominantColor ? getSafeColor(dominantColor) : defaultColor;

  return (
    <span className={className} style={{ color: textColor }}>
      {text}
    </span>
  );
};

export default ColorTextFromImage;
