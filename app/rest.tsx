import { View, Animated } from 'react-native';
import Texto from '../components/Texto';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ROUTINE } from '../lib/data';
import { CircularProgress } from '../components/ProgressBar';
import { Refresh2, Pause, Play, Next, Add } from 'iconsax-react-nativejs';
import { useState, useEffect } from 'react';
import { ExerciseCard } from '../components/ExerciseCard';
import { ScaleButton, FadeSlideView } from '../components/AnimatedElements';
import { TouchableOpacity } from 'react-native';

export default function RestScreen() {
	const { nextId, duration, date } = useLocalSearchParams<{
		nextId: string;
		duration: string;
		date: string;
	}>();
	const router = useRouter();

	const [timeLeft, setTimeLeft] = useState<number>(
		parseInt(duration ?? '60') || 60
	);
	const [isActive, setIsActive] = useState<boolean>(true);
	const pulseAnim = useState(new Animated.Value(1))[0];

	const triggerPulse = () => {
		Animated.sequence([
			Animated.timing(pulseAnim, {
				toValue: 1.05,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.spring(pulseAnim, {
				toValue: 1,
				friction: 3,
				useNativeDriver: true,
			}),
		]).start();
	};

	const nextExercise = ROUTINE.flatMap(r => r.exercises).find(
		ex => ex.id === nextId
	);

	useEffect(() => {
		let interval = null;
		if (isActive && timeLeft > 0) {
			interval = setInterval(() => {
				setTimeLeft(time => time - 1);
				triggerPulse();
			}, 1000);
		} else if (timeLeft === 0) {
			// Added this condition to handle auto-finish
			clearInterval(interval);
			handleSkip(); // Changed to handleSkip as per new code
		}
		return () => clearInterval(interval);
	}, [isActive, timeLeft]);

	const formatTime = seconds => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
	};

	const handleSkip = () => {
		if (nextId) {
			router.replace({
				pathname: `/exercise/${nextId}`,
				params: { date },
			});
		} else {
			router.replace('/');
		}
	};

	return (
		<View className="flex-1 bg-fondo">
			{/* Header Controls */}
			<View className="flex-row items-center justify-between p-5">
				<TouchableOpacity
					onPress={() => router.back()}
					activeOpacity={0.6}
					className="w-boton h-boton bg-card rounded-rounded items-center justify-center border border-border z-10"
				>
					<Add
						
						color="#FFFFFF"
						size={20}
						style={{ transform: [{ rotate: '45deg' }] }}
					/>
				</TouchableOpacity>
				<Texto className="text-segundario absolute left-0 right-0 text-center text-h3">Descanso</Texto>
			</View>

			<View className="items-center px-5 py-12 gap-12">
				<FadeSlideView>
					<Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
						<CircularProgress
							progress={timeLeft / (parseInt(duration) || 60)}
							size={320}
							strokeWidth={20}
						>
							<Texto className="text-segundario text-[6rem]">
								{formatTime(timeLeft)}
							</Texto>
						</CircularProgress>
					</Animated.View>
				</FadeSlideView>

				{/* Controls */}
				<View className="flex-row items-center justify-around w-full mt-14 px-5">
					<ScaleButton
						onPress={() => setTimeLeft(parseInt(duration) || 60)}
						className="w-boton h-boton bg-card rounded-rounded items-center justify-center border border-border"
					>
						<Refresh2 size={24} color="#7faa96" />
					</ScaleButton>

					<ScaleButton
						onPress={() => setIsActive(!isActive)}
						className="w-36 h-24 bg-color rounded-rounded2 items-center justify-center shadow-xl shadow-color/60"
					>
						{isActive ? (
							<Pause size={40} color="#0a1810" variant="Bold" />
						) : (
							<Play size={40} color="#0a1810" variant="Bold" />
						)}
					</ScaleButton>

					<ScaleButton
						onPress={handleSkip}
						className="w-boton h-boton bg-card rounded-rounded items-center justify-center border border-border"
					>
						<Next size={24} color="#7faa96" variant="Bold" />
					</ScaleButton>
				</View>
			</View>

			{/* Next Exercise Preview */}
			{nextExercise && (
				<FadeSlideView className="mt-16 w-full px-5">
					<Texto className="text-segundario text-h3 mb-4 ">
						Siguiente ejercicio
					</Texto>
					<ExerciseCard exercise={nextExercise} date={date} />
				</FadeSlideView>
			)}
		</View>
	);
}
