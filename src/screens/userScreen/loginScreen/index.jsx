import React, { useMemo } from "react";
import { Box, useToast, Input, Button } from "native-base";
import { login } from "@/services/User/login";
import { useForm, Controller } from "react-hook-form";
import { createStyle } from "./style";
import { SCREENS_NAME } from "@/constants/screen";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { userAccountActions } from "@/store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { BackHandler } from "react-native";
import { marginBottom } from "styled-system";

const LoginScreen = () => {
  const styles = useMemo(() => {
    return createStyle();
  }, []);

  const toast = useToast();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    login({
      userName: data.userName,
      password: data.password,
    })
      .then((res) => {
        if (res?.data?.result !== "OK") {
          toast.show({
            description: res?.data?.result,
            status: "error",
            placement: "top",
            isClosable: true,
          });
          return;
        }

        dispatch(userAccountActions.setIsLogin(true));
        dispatch(userAccountActions.setCode(res?.data?.code));
        navigation.replace(SCREENS_NAME.LIST_ORDER);
      })
      .catch((err) => console.log(err));
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  return (
    <Box style={styles.container}>

    <Box style={styles.box}>
    <Controller
        control={control}
        name="userName"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            onChangeText={onChange}
            value={value}
            size="sm"
            placeholder="T??n ng?????i d??ng"
            style={styles.input}
          />
        )}
      />
    </Box>
    <Box style={styles.box}>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            onChangeText={onChange}
            value={value}
            size="sm"
            placeholder="M???t kh???u"
            style={styles.input}
            secureTextEntry={true}
          />
        )}
      />
    </Box>

      <Button style={styles.btnSubmit} onPress={handleSubmit(onSubmit)}>
        ????ng nh???p
      </Button>
    </Box>
  );
};

export default LoginScreen;
