import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { DollarSign } from 'react-native-feather';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

import { ReactNode } from 'react';

const AnimatedSplashScreen = ({ children }: { children: ReactNode }) => {
  const animation = useRef(new Animated.Value(1)).current;
  const [isAppReady, setIsAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  useEffect(() => {
    // Simulate an async task to prepare the app
    const prepareApp = async () => {
      // Perform any necessary setup or data fetching here
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsAppReady(true);
    };

    prepareApp();
  }, []);


  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: '#000000',
              opacity: animation,
            },
          ]}>
          <Animated.View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              transform: [{
                scale: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.85, 1],
                })
              }]
            }}>
            <View style={styles.logoContainer}>
              <DollarSign stroke="#276EF1" width={64} height={64} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>ExchangePro</Text>
              <Text style={styles.subtitle}>Smart Currency Exchange</Text>
            </View>
          </Animated.View>
        </Animated.View>
      )}
    </View>
  );
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AnimatedSplashScreen>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AnimatedSplashScreen>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#141414',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#222',
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
    fontFamily: 'SpaceMono',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    fontFamily: 'SpaceMono',
  },
});