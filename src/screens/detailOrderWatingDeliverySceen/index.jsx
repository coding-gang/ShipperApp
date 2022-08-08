import React, { useMemo, useEffect, useState } from 'react';
import { Box, Text, Pressable, useToast } from 'native-base';
import { createStyles } from './style';
import { ScrollView, Linking,Alert,PermissionsAndroid,Platform} from 'react-native';
import { getDetailOrder,sendImageDelivery } from '@/services';
import { useRoute, useNavigation } from '@react-navigation/core';
import LoadingComponent from '@/components/Loading/index';
import { changeStatus } from '@/services/changeStatus';
import { useSelector, useDispatch } from 'react-redux';
import { SCREENS_NAME } from '@/constants/screen';
import { listOrderActions } from '@/store/listOrderReducer';
import ImagePicker from 'react-native-image-crop-picker';
import CallLogs from "react-native-call-log";

//chờ giao
function DetailOrderWaitingDeliveryScreen() {
  const styles = useMemo(() => {
    return createStyles();
  }, []);

  const toast = useToast();
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { id, tab } = route?.params;

  const [isGettingData, setIsGettingData] = useState(false);
  const [shopInfo, setShopInfo] = useState();
  const [count,setCount] =useState(0);
  const codeFromRedux = useSelector((state) => state.userAccount.code);



  

  const requestCameraPermission = async () => { 
    if (Platform.OS === 'android') {
     try {
     
          setCount(1);
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs camera permission',
            },
          );
          // If CAMERA Permission is granted
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn(err);
          return false;
        }
      }
    }

      const requestCallLogPermission = async () => {
        if (Platform.OS === "android") {
          try {
            setCount(1);
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
              {
                title: "Call Permission",
                message: "App needs call log permission",
              }
            );
            // If CAMERA Permission is granted
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
            console.warn(err);
            return false;
          }
        }
      };

  const requestExternalWritePermission = async () => {
      if (Platform.OS === 'android') {

        try {
          
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'External Storage Write Permission',
   
              message: 'App needs write permission',
            },
          );
   
          // If WRITE_EXTERNAL_STORAGE Permission is granted
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn(err);
   
          alert('Write permission err', err);
        }

        return false;
      } else return true;
    };
   
    const captureImage = async () => {

      let options = {
        width: 300,
        height: 400,
        includeBase64:true
      };
      
      let isCameraPermitted = await requestCameraPermission();
    
      if (isCameraPermitted ) {
        let isStoragePermitted = await requestExternalWritePermission();
          if(isStoragePermitted){

            ImagePicker.openCamera(options).then(image => {
              sendImageDelivery({ id: id, image:image.data})
              .then(res =>{
                   console.log(res);
                   //
              })
              .catch((err) => {
                console.log(err);
              });
            });
          }
      } else {
         if(count > 1){
          Alert.alert(
            'Permission camera phone',
            'allow camera permission in settings',
            [
              {
                text: 'Huỷ',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => openSettings()},
            ],
            
          );
         }
    
      }
    };

    const confirmCaptureImage = () =>{
      Alert.alert(
        'Xác nhận đơn hàng',
        'Chụp hình đơn hàng trước khi chuyển trạng thái đơn hàng',
        [
          {
            text: 'Huỷ',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => captureImage() },
        ],
      );
    }

    

  const handleChangeStatus = (id, status) => {
    changeStatus({ id: id, status: status, code: codeFromRedux })
      .then((res) => {
        if (res?.data?.msg === 'Error') {
          toast.show({
            title: 'Đã có lỗi xảy ra !',
            status: 'error',
            placement: 'top',
            isClosable: true,
          });
          return;
        }

        toast.show({
          baseStyle: {
            display: 'flex',
            flexWrap: 'wrap',
            fontSize: 11,
          },
          title: 'Cập nhật thành công !',
          status: 'success',
          placement: 'top',
          isClosable: true,
        });

        setTimeout(() => {
          navigation.replace(SCREENS_NAME.HOME_NAVIGATOR);
          dispatch(listOrderActions.setIsReloadGettingDataDG(true));
          dispatch(listOrderActions.setIsReloadGettingDataTL(true));
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsGettingData(true);
    let isComponentMounted = true;

    getDetailOrder({ id: id, tab: tab })
      .then((res) => {
        if (!isComponentMounted) {
          return;
        }

        const response = res?.data;

        setShopInfo(response);
        setIsGettingData(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        isComponentMounted = false;
      });

    return () => {
      isComponentMounted = false;
    };
  }, [id, tab]);


 const handleSendCallLog = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: "Call Log Example",
          message: "Access your call logs",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
    
      if (granted) {
        console.log(CallLogs);
        CallLogs.load(5).then((c) => console.log(c));
      } else {
        console.log("Call Log permission denied");
      }
    } catch (e) {
      console.log(e);
    }
  };
 

  return (
    <>
      {isGettingData ? (
        <LoadingComponent />
      ) : (
        <Box style={styles.container}>
          <ScrollView>
            <Box style={styles.guestInfoSection}>
              <Pressable
                onPress={() => Linking.openURL(`tel:${shopInfo?.DienThoaiKH}`)}
              >
                <Text style={styles.guestInfoPhoneNumber}>
                  {shopInfo?.Ma} {"-"} {shopInfo?.DienThoaiKH}
                </Text>
              </Pressable>

              <Text style={styles.guestInfoName}>
                {"Người mua:"} <Text>{shopInfo?.TenKH}</Text>
              </Text>
              <Text style={styles.guestInfoAddr}>{shopInfo?.DiaChiKH}</Text>
              <Text style={styles.guestInfoStatus}>
                {"Trạng thái: "}
                <Text style={styles.guestInfoStatusInner}>{"CHỜ GIAO"}</Text>
              </Text>
            </Box>

            <Box style={styles.priceSection}>
              <Text style={styles.priceText1}>
                {"Thu hộ:"}{" "}
                <Text>
                  {shopInfo?.ThuHo} {" đ"}
                </Text>
              </Text>
              <Text style={styles.priceShipText}>
                {"Tiền ship: "}{" "}
                <Text>
                  {shopInfo?.TienShip} {" đ"}
                </Text>
              </Text>
              <Text style={styles.summaryPrice}>
                {"Tổng cộng: "}
                <Text style={styles.summaryPriceNumber}>
                  {shopInfo?.TongCong} {" đ"}
                </Text>
              </Text>
            </Box>

            <Box style={styles.orderInfoSection}>
              <Text style={styles.orderInfoTextTitle}>
                {shopInfo?.KhoiLuong} {"-"} {shopInfo?.KichThuoc}
              </Text>
              <Text>{"1 tham cho be, 2 khăn mặt, 2 nước xả vải comfort."}</Text>
              <Text>
                {"Tổng cộng: "}
                <Text>{"375.000 đ"}</Text>
              </Text>
            </Box>

            <Box style={styles.sellerInfoSecction}>
              <Text style={styles.sellerInfoTitleInner}>
                {"Người bán: "}
                <Text>{shopInfo?.TenShop}</Text>
              </Text>
              <Text style={styles.sellerPhoneNumberInner}>
                {shopInfo?.DienThoaiShop}
              </Text>
            </Box>
          </ScrollView>

          <Box style={styles.btnGroupBottom}>
            <Box style={styles.btnGroupButtonTitle}>
              <Text style={styles.btnGroupButtonTitleInner}>
                {"Chuyển trạng thái đơn hàng này sang"}
              </Text>
            </Box>
            <Box style={styles.btnGroupInner}>
              <Pressable
                style={styles.btnInner1}
                onPress={() => handleSendCallLog()}
              >
                <Box style={styles.btnTextTitle}>
                  <Text style={styles.btnTextTitleInner}>{"Đã giao"}</Text>
                </Box>
              </Pressable>
              <Pressable
                style={styles.btnInner2}
                onPress={() => handleChangeStatus(shopInfo?.DonHangID, "DGCT")}
              >
                <Box style={styles.btnTextTitle}>
                  <Text style={styles.btnTextTitleInner}>
                    {"Đã giao 1 phần"}
                  </Text>
                </Box>
              </Pressable>
              <Pressable
                style={styles.btnInner3}
                onPress={() => handleChangeStatus(shopInfo?.DonHangID, "CT")}
              >
                <Box style={styles.btnTextTitle}>
                  <Text style={styles.btnTextTitleInner}>{"Chờ trả"}</Text>
                </Box>
              </Pressable>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default DetailOrderWaitingDeliveryScreen;
