import { StyleSheet, Dimensions } from "react-native";
import { colorPalletter } from "@/assets/theme/color";
const WINDOW_WIDTH = Dimensions.get("window").width;
export function createStyles() {
  return StyleSheet.create({
    container: {
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flex: 1,
    },
     txtHeader: {
      fontWeight: "bold",
      fontSize: 18,
      marginTop:30
    },
    inputView: {
        flex: 1,
        marginTop: 80,
         display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    txtCode: {
        marginLeft:-250,
        fontSize:16,
        fontWeight:"bold"
    },
     txtInput: {
        marginTop:10,
      width: 0.9 * WINDOW_WIDTH,
      borderColor: colorPalletter.gray[500],
      borderWidth: 1,
      marginLeft: 4,
      fontSize: 16,
      fontWeight: "bold",
      color: colorPalletter.gray[600],
      textAlign: "center",
      textAlignVertical: "center",
    },
    btnAdd: {
        
      width: WINDOW_WIDTH * 0.3,
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
    }
  });
  
}