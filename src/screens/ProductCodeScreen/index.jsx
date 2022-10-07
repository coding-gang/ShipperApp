import React,{ useMemo,useState} from "react";
import { Text, View, useToast} from "native-base";
import { createStyles } from "./style";
import { Pressable, TextInput } from "react-native";
import { useSelector } from "react-redux";
import { addOrderInfo } from "@/services/addOrderInfo";

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
          title: res?.data?.result === "OK" ? "Đã thêm đơn hàng thành công !" : "Đơn hàng này không tồn tại !",
          status: res?.data?.result === "OK" ? "success" : "error",
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