import { View, Text, Image } from 'react-native';
import { ProgressBar } from './ProgressBar';
import { useRouter } from 'expo-router';
import { useStore } from '../lib/store';
import { ScaleButton } from './AnimatedElements';

export const ExerciseCard = ({ exercise, date }) => {
	const router = useRouter();
	const { getSeriesCompleted } = useStore();
	const seriesDone = getSeriesCompleted(exercise.id, date);
	const progress = seriesDone / exercise.series;

	return (
		<ScaleButton
			onPress={() =>
				router.push({
					pathname: `/exercise/${exercise.id}`,
					params: { date },
				})
			}
			className="flex-row items-center p-4 mb-6 bg-card rounded-rounded2 border border-border gap-4"
		>
			<Image
				source={
					typeof exercise.image === 'string'
						? { uri: exercise.image }
						: exercise.image
				}
				className="w-16 h-16 rounded-3xl"
				resizeMode="cover"
			/>

			<View className="flex-1">
				<View className="flex-row justify-between items-center mb-1">
					<Text className="text-primario text-h3">
						{exercise.name}
					</Text>
					<View className="bg-color/10 px-2 py-1 rounded-xl">
						<Text className="text-color text-base">
							{exercise.location}
						</Text>
					</View>
				</View>

				<Text className="text-segundario text-base mb-6">
					{seriesDone}/{exercise.series} Series • {exercise.reps} Reps
				</Text>

				<ProgressBar progress={progress} />
			</View>
		</ScaleButton>
	);
};
