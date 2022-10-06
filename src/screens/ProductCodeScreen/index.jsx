import React,{ useMemo,useState} from "react";
import { Box, Text, View, useToast} from "native-base";
import { createStyles } from "./style";
import { Pressable, TextInput,ImageBackground,Dimensions } from "react-native";
import { getCurrencyString } from "@/helper/formater";
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector, useDispatch } from "react-redux";
import { addOrderInfo } from "@/services/addOrderInfo";

const WINDOW_WIDTH = Dimensions.get("window").width;
const ProductCodeScreen = () => {
    const styles = useMemo(() => {
      return createStyles();
    }, []);
    const toast = useToast();
    const [order, setOrder] = useState();
    const userCode = useSelector((state) => state.userAccount.code);
    const addOrderProduct = (orderCode) => {
      addOrderInfo({ order: orderCode, code: userCode }).then((res) => {
        toast.show({
          baseStyle: {
            display: "flex",
            flexWrap: "wrap",
            fontSize: 11,
          },
          title: res.ok ? "Thêm thành công" : "Thêm thất bại",
          status: res.ok ? "success" : "error",
          placement: "top",
          isClosable: true,
        });
      })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.txtHeader}>THÊM ĐƠN HÀNG BĂNG MÃ</Text>
            <View style={styles.inputView}>
                <Text style={styles.txtCode}>Mã đơn hàng</Text>
                <TextInput style={styles.txtInput}
                    onChangeText={(value) =>{
                    setOrder(value)
          }}
          value={order}
                />
                <Pressable onPress={() => addOrderProduct(order)}>
                    <Text style={styles.btnAdd}>{"Thêm"}</Text>
                </Pressable>
            </View>  
        </View>
    );
}


export default ProductCodeScreen;