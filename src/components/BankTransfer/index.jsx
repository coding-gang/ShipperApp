import React,{ useMemo} from "react";
import { Box, Text, View } from "native-base";
import { createStyles } from "./style";
import { Pressable, TextInput } from "react-native";

const BankTransfer = ({}) =>{
    const styles = useMemo(() => {
      return createStyles();
    }, []);
    return (
      <Box style={styles.container}>
        <Text>--------------Chuyên Khoản Ngân Hàng--------------</Text>
        <View style={styles.viewAmountTransfer}>
          <Text style={styles.txtLable}>Số tiền </Text>
          <TextInput 
          style={styles.txtAmountTransfer} 
          keyboardType="numeric"
          />
          <Text style={styles.txtLable}> K</Text>
        </View>
        <View style={styles.viewImage}>
          <Pressable onPress={() => console.log("press")}>
            <Text style={styles.billImage}>{"Hình biên lai"}</Text>
          </Pressable>
        </View>
      </Box>
    );
}

export default BankTransfer;