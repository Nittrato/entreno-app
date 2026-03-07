import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import '../global.css';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
	const [loaded, error] = useFonts({
		GoogleSans: require('../assets/fonts/GoogleSansFlex.ttf'),
	});

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	return (
		<SafeAreaProvider
			style={{
				flex: 1,
				backgroundColor: '#0E1A11',
				paddingTop: Constants.statusBarHeight,
			}}
		>
			<StatusBar style="light" />
			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: { backgroundColor: '#0E1A11' },
					animation: 'fade_from_bottom',
				}}
			/>
		</SafeAreaProvider>
	);
}
