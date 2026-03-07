import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import Texto from '../../components/Texto';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ROUTINE } from '../../lib/data';
import {
	ArrowLeft2,
	TickCircle,
	Timer1,
	Weight,
	Chart,
} from 'iconsax-react-nativejs';
import { ExerciseCard } from '../../components/ExerciseCard';
import { useStore } from '../../lib/store';
import { LinearGradient } from 'expo-linear-gradient';
import { FadeSlideView, ScaleButton } from '../../components/AnimatedElements';

export default function ExerciseDetail() {
	const { id, date } = useLocalSearchParams<{ id: string; date: string }>();
	const router = useRouter();
	const { completeSeries, getSeriesCompleted } = useStore();

	const exercise = ROUTINE.flatMap(r => r.exercises).find(ex => ex.id === id);
	if (!exercise) return null;

	const currentRoutine = ROUTINE.find(r =>
		r.exercises.some(ex => ex.id === id)
	);
	const exerciseIndex = currentRoutine?.exercises.indexOf(exercise);
	const nextExercises =
		currentRoutine?.exercises.slice(exerciseIndex + 1) || [];

	const seriesDone = getSeriesCompleted(exercise.id, date);

	const handleComplete = () => {
		completeSeries(exercise.id, date);
		const newCount = seriesDone + 1;

		if (newCount < exercise.series) {
			// Stay on same exercise, but rest
			router.push({
				pathname: '/rest',
				params: {
					nextId: exercise.id,
					duration: exercise.rest,
					date: date,
				},
			});
			return;
		}

		// Exercise finished, go to next or home
		if (nextExercises.length === 0) {
			router.replace('/');
			return;
		}

		router.push({
			pathname: '/rest',
			params: {
				nextId: nextExercises[0]?.id,
				duration: exercise.rest,
				date: date,
			},
		});
	};

	return (
		<ScrollView
			className="flex-1 bg-fondo"
			contentContainerStyle={{ paddingBottom: 100 }}
		>
			{/* Hero Section */}
			<View className="relative h-[680px]">
				<Image
					source={
						typeof exercise.image === 'string'
							? { uri: exercise.image }
							: exercise.image
					}
					className="w-full h-full"
					resizeMode="cover"
				/>

				<LinearGradient
					colors={[
						'transparent',
						'#0E1A11',
					]}
					className="absolute inset-0"
				/>

				{/* Header Controls */}
				<TouchableOpacity
					className="absolute backdrop-blur-md web:anim bg-fondo/60 top-6 left-6 w-boton h-boton rounded-full items-center justify-center z-10"
					onPress={() => router.back()}
					activeOpacity={0.8}
				>
					<ArrowLeft2 color="white" className="icon" />
				</TouchableOpacity>

				{/* Title & Description Overlay */}
				<View className="absolute bottom-0 left-6 right-6">
					<View className="bg-color/10 self-start px-2 py-1 rounded-xl mb-3">
						<Texto className="text-color text-base">
							{exercise.location}
						</Texto>
					</View>
					<Texto className="text-primario text-h1 font-bold mb-4">
						{exercise.name}
					</Texto>
					<Texto className="text-segundario text-h4 leading-7">
						{exercise.description}
					</Texto>
				</View>
			</View>

			<View className="mx-6 mt-10">
				<FadeSlideView distance={30}>
					{/* Stats Cards */}
					<View className="flex-row justify-between mb-6 gap-4">
						<View className="bg-card border border-border rounded-rounded2 h-boton2 flex-1 flex-row items-center justify-center">
							<Chart size={20} color="#21c063" variant="Bold" />
							<Texto className="text-segundario ml-2 text-h4">
								{exercise.level}
							</Texto>
						</View>
						<View className="bg-card border border-border rounded-rounded2 h-boton2 flex-1 flex-row items-center justify-center">
							<Timer1
								size={20}
								color="#4e9effff"
								variant="Bold"
							/>
							<Texto className="text-segundario ml-2 text-h4">
								{exercise.rest} sec
							</Texto>
						</View>
						<View className="bg-card border border-border rounded-rounded2 h-boton2 flex-1 flex-row items-center justify-center">
							<Weight size={20} color="#F4C714" variant="Bold" />
							<Texto className="text-segundario ml-2 text-h4">
								{exercise.series}x{exercise.reps}
							</Texto>
						</View>
					</View>
				</FadeSlideView>

				{/* Action Button */}
				<ScaleButton
					onPress={handleComplete}
					className="h-boton2 rounded-rounded2 flex-row items-center justify-center mb-12 border border-border overflow-hidden relative bg-card "
				>
					<View
						style={{
							width: `${(seriesDone / exercise.series) * 100}%`,
						}}
						className="absolute left-0 top-0 bottom-0 bg-color"
					/>
					<View className="flex-row items-center justify-center z-10 w-full ">
						<Texto
							className={`${seriesDone / exercise.series > 0.5 ? 'text-fondo font-bold' : 'text-segundario font-bold'} text-h3 mr-2`}
						>
							{`Completar Serie ${Math.min(seriesDone + 1, exercise.series)}/${exercise.series}`}
						</Texto>
						<TickCircle
							size={24}
							color={
								seriesDone / exercise.series > 0.5
									? '#0e1a11'
									: '#7faa96'
							}
							variant="Bold"
						/>
					</View>
				</ScaleButton>

				{/* Next Exercises */}
				<View>
					<Texto className="text-segundario text-h3 mb-6">
						Siguientes ejercicios
					</Texto>
					{nextExercises.map(ex => (
						<ExerciseCard key={ex.id} exercise={ex} date={date} />
					))}
					{nextExercises.length === 0 && (
						<Texto className="text-segundario">
							Último ejercicio del día
						</Texto>
					)}
				</View>
			</View>
		</ScrollView>
	);
}
