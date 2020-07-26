import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SliderBox } from "react-native-image-slider-box";

function CarouselSlider({ images }) {
  const [imagesSlider, setImages] = useState(images);
  return <SliderBox images={imagesSlider} />;
}

const styles = StyleSheet.create({
  container: {},
});

export default CarouselSlider;
