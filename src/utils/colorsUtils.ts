import { availableColors, colorsCssValues } from "../data/products";

export const colorToEnglish = (color: string) => {
   
    const index = availableColors.indexOf(color);
    return index !== -1 ? colorsCssValues[index] : color;
}
