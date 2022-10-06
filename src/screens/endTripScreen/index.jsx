import React, { useMemo, useState, useEffect } from "react";
import { createStyles } from "./style";
import { ScrollView, View, Text, Pressable,PermissionsAndroid } from "react-native";
import { useToast } from "native-base";
import Banknote from "@/components/Banknote/index";
import { getCurrencyString } from "@/helper/formater";
import { endTrip,endTripTransfer } from "@/services/endTrip/index";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { SCREENS_NAME } from "@/constants/screen";
import BankTransfer from "@/components/BankTransfer/index";

function EndTripScreen() {
  const styles = useMemo(() => {
    return createStyles();
  }, []);
   
  const [data, setData] = useState(() => [
    { curencyValue: 500000, amount: 0 },
    { curencyValue: 200000, amount: 0 },
    { curencyValue: 100000, amount: 0 },
    { curencyValue: 50000, amount: 0 },
    { curencyValue: 20000, amount: 0 },
    { curencyValue: 10000, amount: 0 },
    { curencyValue: 5000, amount: 0 },
    { curencyValue: 2000, amount: 0 },
    { curencyValue: 1000, amount: 0 },
  ]);
 
  const code = useSelector((state) => state.userAccount.code);

  const [totalMoney, setTotalMoney] = useState(() => 0);
  const [isDisableSubmitButton, setIsDisableSubmitButton] = useState(
    () => true
  );

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const toast = useToast();
  const navigation = useNavigation();
  const[amountTransfer,setAmountTransfer] = useState('');
  const[imageDataBill,setImageDataBill] = useState('');

  const inputTextChangedHandle = (value, index) => {
    let newData = data;
    const newValue = value ? parseInt(value) : 0;
    newData[index].amount = newValue;
    setData(newData);
    setTotalMoney(calTotalMoney());
    forceUpdate();
  };

  const btnPressHandle = (type, index) => {
    let newData = [];
    switch (type) {
      case "decrease":
        newData = data;
        if (newData[index].amount > 0) newData[index].amount -= 1;
        setData(newData);
        setTotalMoney(calTotalMoney());
        forceUpdate();
        break;
      case "increase":
        newData = data;
        newData[index].amount += 1;
        setData(newData);
        setTotalMoney(calTotalMoney());
        forceUpdate();
        break;
      default:
        alert(". . .");
        break;
    }
  };

  const calTotalMoney = () => {
    let total = 0;
    data.forEach((item) => {
      if (item.amount > 0) {
        total += item.amount * item.curencyValue;
      }
    });
    return total;
  };

  const handleSubmitButtonPressed = () => {
   let moneyStr = "0";

    if(amountTransfer !== "" && imageDataBill !== ""){
      if(totalMoney > 0){
        const filterData = data
        .filter((item) => item.amount > 0)
        .map((item) => `${item.curencyValue / 1000}-${item.amount}`);
         moneyStr = filterData.join("_");
      }
      endTripTransfer({transferMoney: amountTransfer, transferImage: imageDataBill,moneyStr: moneyStr, code: code}).then(res=>{
        toast.show({
          baseStyle: {
            display: "flex",
            flexWrap: "wrap",
            fontSize: 11,
          },
          title: res?.data?.result === "OK" ? "Thành công" : "Thất bại",
          status: res?.data?.result === "OK" ? "success" : "error",
          placement: "top",
          isClosable: true,
        });
        if (res?.data?.result === "OK") {
          setTimeout(() => {
            navigation.navigate("Chờ giao");
          }, 1300);
        }
      })
    }

     if(totalMoney > 0 && moneyStr === "0"){
      const filterData = data
      .filter((item) => item.amount > 0)
      .map((item) => `${item.curencyValue / 1000}-${item.amount}`);
       moneyStr = filterData.join("_");
       endTrip({ moneyStr: moneyStr, code: code }).then(res =>{
        toast.show({
          baseStyle: {
            display: "flex",
            flexWrap: "wrap",
            fontSize: 11,
          },
          title: res?.data?.result === "OK" ? "Nộp tiền mặt thành công" : "Nộp tiền mặt thất bại",
          status: res?.data?.result === "OK" ? "success" : "error",
          placement: "top",
          isClosable: true,
        });
        if (res?.data?.result === "OK") {
          setTimeout(() => {
            navigation.navigate("Chờ giao");
          }, 1300);
        }
    })
    }
      setAmountTransfer('');
      setImageDataBill('');
      setIsDisableSubmitButton(false);
}


  return (
    <>
      <ScrollView style={styles.container}>
      <View style={{alignItems: "center", flexDirection: "column"}}>
         <Text style={{color:"#000000"}}>--------------TIỀN MẶT--------------</Text>
      </View>
        {data.map((item, index) => {
          return (
            <Banknote
              key={index}
              curencyValue={item.curencyValue}
              amount={item.amount}
              btnDecsHandle={() => btnPressHandle("decrease", index)}
              btnIncsHandle={() => btnPressHandle("increase", index)}
              onChangeTextHandle={(value) =>
                inputTextChangedHandle(value, index)
              }
            ></Banknote>
          );
        })}
      <BankTransfer
         stateAmountTransfer = {setAmountTransfer}
         stateImageBill = {setImageDataBill}
      >
      </BankTransfer> 
      </ScrollView>
      <View style={styles.footerView}>
        <Text style={styles.footerText}>
          {totalMoney > 0
            ? `Tổng: ${getCurrencyString(totalMoney)}đ`
            : "Chưa chọn tiền"}
        </Text>
        <Pressable
          onPress={() => handleSubmitButtonPressed()}
        >
          <Text
            style={
              totalMoney !== 0 || amountTransfer !== "" && imageDataBill !== "" || !isDisableSubmitButton
                ? styles.submitButton
                : styles.submitButtonDisable
            }
          >
            {"Nộp tiền"}
          </Text>
        </Pressable>
      </View>
    </>
  );
}


export default EndTripScreen;
