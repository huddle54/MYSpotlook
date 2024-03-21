import React, { useRef, useEffect, useState } from "react";
import {
  Dimensions,
  Animated,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Portal } from "react-native-paper";
import { useTheme } from "../../config/ThemeProvider";

const ProfileBottomSheet = ({
  show,
  onDismiss,
  enableBackdropDismiss,
  children,
}) => {
  const { dark, colors, setScheme } = useTheme();
  const bottomSheetHeight = Dimensions.get("window").height * 0.5;
  const deviceWidth = Dimensions.get("window").width;
  const [open, setOpen] = useState(show);
  const bottom = useRef(new Animated.Value(-bottomSheetHeight)).current;

  const onGesture = (event) => {
    if (event.nativeEvent.translationY > 0) {
      bottom.setValue(-event.nativeEvent.translationY);
    }
  };
  const onGestureEnd = (event) => {
    if (event.nativeEvent.translationY > bottomSheetHeight / 2) {
      onDismiss();
    } else {
      bottom.setValue(0);
    }
  };

  useEffect(() => {
    if (show) {
      setOpen(show);
      Animated.timing(bottom, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(bottom, {
        toValue: -bottomSheetHeight,
        duration: 250,
        useNativeDriver: false,
      }).start(() => {
        setOpen(false);
      });
    }
  }, [show]);
  const styles = StyleSheet.create({
    root: {
      position: "absolute",
      left: 0,
      right: 0,
      zIndex: 110,
      backgroundColor: colors.sheetBackground,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      // borderBottomLeftRadius: 20,
      // borderBottomRightRadius: 20,
      overflow: "hidden",
    },
    header: {
      height: 33,
      backgroundColor: colors.sheetHeader,
    },
    common: {
      shadowColor: "#000",
      shadowOffset: { width: 0 },
      shadowOpacity: 0.24,
      shadowRadius: 4,
      elevation: 0,
    },
    backDrop: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 0,
      backgroundColor: "rgba(0,0,0,0.2)",
    },
  });

  if (!open) {
    return null;
  }
  return (
    <Portal>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Pressable
          style={styles.backDrop}
          onPress={enableBackdropDismiss ? onDismiss : undefined}
        />
        <Animated.View
          style={[
            styles.root,
            {
              height: bottomSheetHeight,
              bottom: bottom,
              shadowOffset: {
                height: -3,
              },
            },
            styles.common,
          ]}
        >
          <PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd}>
            <View
              style={[
                styles.header,
                {
                  shadowOffset: {
                    height: 3,
                    position: "relative",
                  },
                },
                styles.common,
              ]}
            >
              <View
                style={{
                  width: 40,
                  height: 4,
                  position: "absolute",
                  top: 15,
                  left: (deviceWidth - 45) / 2,
                  zIndex: 110,
                  borderRadius: 1.5,
                  backgroundColor: colors.sheetHeaderbar,
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
                onPress={onDismiss}
              />
            </View>
          </PanGestureHandler>
          {children}
        </Animated.View>
      </GestureHandlerRootView>
    </Portal>
  );
};

export default ProfileBottomSheet;
