import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { CardGradientsProps } from './types';
/**
 * @param { number } itemHeight The height of the item
 * @param { number } itemWidth The width of the item
 * @description This atom component is used to create the gradients on the movie card
 */
const CardGradients: React.FC<CardGradientsProps> = (props) => {

  const { itemHeight, itemWidth } = props; 

  return (
    <>
      <LinearGradient
        colors={["rgba(0,0,0,0.7)", "#00000000"]}
        start={[1, 0]}
        end={[1, 0.5]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: itemHeight * 0.3,
        }} />

      <LinearGradient
        colors={["rgba(0,0,0,0.2)", "#00000000"]}
        start={[0, 1]}
        end={[0, 0]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: itemHeight * 0.3,
        }} />

      <LinearGradient
        colors={["rgba(0,0,0,.6)", "#00000000"]}
        start={[0, 0.5]}
        end={[1, 0.5]}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: itemWidth * 0.7,
        }} />

      <LinearGradient
        colors={["rgba(0,0,0,.6)", "#00000000"]}
        start={[1, 0]}
        end={[0, 0]}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: itemWidth * 0.3,
        }} />
    </>
  );
}

export default CardGradients;