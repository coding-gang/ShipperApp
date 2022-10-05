import { StyleSheet, Dimensions } from "react-native";
import { colorPalletter } from "@/assets/theme/color";
const WINDOW_WIDTH = Dimensions.get("window").width;
export function createStyles() {
  return StyleSheet.create({
    container: {
      //   width: 0.7 * WINDOW_WIDTH,
      height: 0.75 * WINDOW_WIDTH,
      marginTop: 20,
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flex: 1,
    },
    viewAmountTransfer: {
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    txtAmountTransfer: {
      width: 0.3 * WINDOW_WIDTH,
      height: 0.1 * WINDOW_WIDTH,
      borderColor: colorPalletter.gray[500],
      borderWidth: 1,
      marginLeft: 4,
      fontSize: 16,
      fontWeight: "bold",
      color: colorPalletter.gray[600],
      textAlign: "center",
      textAlignVertical: "center",
    },
    txtLable: {
      fontWeight: "bold",
    },
    viewImage: {
      marginTop:10,
      justifyContent: "center",
      alignItems: "center",
      borderColor: colorPalletter.gray[500],
      borderWidth: 1,
      width: 0.88 * WINDOW_WIDTH,
      height: 0.5 * WINDOW_WIDTH,
    },
    billImage: {
      width: WINDOW_WIDTH * 0.5,
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 20,
      paddingTop: 10,
      paddingBottom: 10,
      marginTop: 10,
      borderRadius: 8,
      color: "white",
      borderWidth: 1,
      borderColor: colorPalletter.gray[500],
      backgroundColor: colorPalletter.green[500],
    },
  });
  
}