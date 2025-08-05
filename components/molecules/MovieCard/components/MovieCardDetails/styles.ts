import { StyleSheet } from "react-native";
import { SPACING } from "@/constants";
/** @description Styles for the MovieCardDetails component */
export const styles = StyleSheet.create({

  movieCardDetailsContainer: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING + 2,
    flexDirection: 'column', 
  },

  overviewTitleTextStyle: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    fontFamily: 'Lexend'
  },

  overviewTextStyle: {
    color: "#ccc",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Lexend',
    fontWeight: '400'
  },

  viewMoreDetailsTextStyle: {
    color: '#FFD700',
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Lexend',
    fontWeight: '500'
  },

  separator: {
    marginVertical: SPACING - 5,
    marginLeft: -SPACING,
    marginRight: -SPACING,
  }

})