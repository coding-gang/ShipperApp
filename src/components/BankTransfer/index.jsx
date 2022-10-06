import React,{ useMemo,useState} from "react";
import { Box, Text, View } from "native-base";
import { createStyles } from "./style";
import { Pressable, TextInput,ImageBackground,Dimensions } from "react-native";
import { getCurrencyString } from "@/helper/formater";
import ImagePicker from 'react-native-image-crop-picker';
const WINDOW_WIDTH = Dimensions.get("window").width;
const BankTransfer = ({stateAmountTransfer,stateImageBill}) =>{
    const styles = useMemo(() => {
      return createStyles();
    }, []);
    const [amount, setAmount] = useState();
    const [hideButtonImage, setHideButtonImage] = useState(false);
    const [image, setImage] = useState({});
    return (
      <Box style={styles.container}>
        <Text>--------------CHUYỂN KHOẢN NGÂN HÀNG--------------</Text>
        <View style={styles.viewAmountTransfer}>
          <Text style={styles.txtLable}>Số tiền </Text>
          <TextInput 
          style={styles.txtAmountTransfer} 
          keyboardType="numeric"
          onChangeText={(value) =>{
                    if(!isNaN(value) && value !== ""){
            let formatValue = getCurrencyString(value);
            setAmount(formatValue);
                  // bỏ dấu phẩy -> chuyển sang number
            let revertNumber  = formatValue.replace(/\,/g,'');
            revertNumber = parseInt(revertNumber,10);
            stateAmountTransfer(revertNumber);
          }else{
            if(value !== ""){
              // bỏ dấu phẩy -> chuyển sang number -> formatCurrency
            value = value.replace(/\,/g,'');
            value = parseInt(value,10);
            stateAmountTransfer(value);
            let formatValue = getCurrencyString(value); 
            setAmount(formatValue);       
            }else{
              setAmount('');
              stateAmountTransfer('');     
            }
          }
          }}
          value={amount}
          />
          <Text style={styles.txtLable}> K</Text>
        </View>
        <View style={styles.viewImage}>
          <Pressable 
          onPress={() =>
                    ImagePicker.openPicker({
                    width: 400,
                    height: 400,
                    cropping: true,
                    includeBase64: true
                  }).then(image => {
                    setImage(image);
                    setHideButtonImage(true);
                    stateImageBill(image.data);
                  })
          }>
         { !hideButtonImage ? 
         <Text style={styles.billImage}>{"Hình biên lai"}</Text> :
         <ImageBackground
          source={{uri: `data:${image.mime ? image.mime : ''};base64,${image.data ? image.data : ''}`}} 
          style = {{width: 0.88 * WINDOW_WIDTH, height: 0.5 * WINDOW_WIDTH}}
          >
          </ImageBackground>
          }
        
          </Pressable>
        </View>
      </Box>
    );
}

export default BankTransfer;