import React, { useState, useEffect, useMemo } from "react";
import { Text, View, Box } from "native-base";
import { StyleSheet } from "react-native";
import { SCREENS_NAME } from "@/constants/screen";
import { useNavigation } from "@react-navigation/native";
import { getOrderInfoById } from "@/services/getOrderInfoById";
import { useSelector, useDispatch } from "react-redux";
import { orderInfoActions } from "@/store/orderInfoReducer/index";
import { createStyles } from "./style";
import { useToast } from "native-base";
import { useCameraDevices } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';

const BarcodeScanScreen = () => {
  const styles = useMemo(() => {
    return createStyles();
  }, []);

  const [hasPermission, setHasPermission] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isData, setIsData] = useState(false);
  const toast = useToast();
  const code = useSelector((state) => state.userAccount.code);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.CODE_128], {
    checkInverted: true,
  });

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const handleBarCodeScanned = (data) => {
    if(data){
      console.log(data);
      getOrderInfoById({ order: data, code: code }).then((res) => {
        if (res.ok) {
          console.log(res.data);
          navigation.navigate({
            name: SCREENS_NAME.DETAIL_ORDER_INFO,
            params: {
              orderInfo: res.data,
            },
          });
          dispatch(orderInfoActions.setResponseData(res.data));
        } else {
          console.log(counter);
          if (counter > 10) {
            setCounter(0);
            toast.show({
              baseStyle: {
                display: "flex",
                flexWrap: "wrap",
                fontSize: 11,
              },
              title: res.status,
              status: "error",
              placement: "top",
              isClosable: true,
            });
          } else {
            setCounter(counter + 1);
          }
        }
      });
    }
  
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Box style={styles.container}>
      <View style={{ flex: 1 }}>
      {
      device != null &&
    hasPermission && (
      <>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
        {
          barcodes.map((barcode,idx)=>{
            if(isData){
              return;
            }else{
              setIsData(true);
              handleBarCodeScanned(barcode.displayValue)
            } 
             })
        }
      </>
    )
      }
      </View>
    </Box>
  );
};

export default BarcodeScanScreen;
