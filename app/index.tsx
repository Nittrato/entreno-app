import {
	View,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { ROUTINE } from '../lib/data';
import { ExerciseCard } from '../components/ExerciseCard';
import { CircularProgress } from '../components/ProgressBar';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react-nativejs';
import { useState, useMemo, useEffect } from 'react';
import { useStore } from '../lib/store';
import { FadeSlideView, ScaleButton } from '../components/AnimatedElements';
import Texto from '../components/Texto';

export default function Home() {
	const dayNames = [
		'Lunes',
		'Martes',
		'Miércoles',
		'Jueves',
		'Viernes',
		'Sábado',
		'Domingo',
	];
	const dayShort = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
	const monthNames = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre',
	];

	const now = new Date();
	const todayIndex = now.getDay() === 0 ? 6 : now.getDay() - 1;

	const [selectedDay, setSelectedDay] = useState<string>(dayNames[todayIndex]);
	const [weekOffset, setWeekOffset] = useState<number>(0);

	const { getMonthlyProgress, isCompleted } = useStore();

	// Calculate current month/year based on displayed week
	const displayDate = useMemo(() => {
		const d = new Date(now);
		d.setDate(now.getDate() + weekOffset);
		return {
			month: monthNames[d.getMonth()],
			monthIndex: d.getMonth(),
			year: d.getFullYear(),
		};
	}, [weekOffset]);

	const currentDayRoutine = useMemo(() => {
		return ROUTINE.find(r => r.day === selectedDay);
	}, [selectedDay]);

	// Calculate day dates for completion checking
	const weekData = useMemo(() => {
		const startOfWeek = new Date(now);
		startOfWeek.setDate(now.getDate() - todayIndex + weekOffset);

		return dayNames.map((_, i) => {
			const d = new Date(startOfWeek);
			d.setDate(startOfWeek.getDate() + i);
			return {
				number: d.getDate(),
				dateStr: d.toISOString().split('T')[0],
			};
		});
	}, [weekOffset, todayIndex, now, dayNames]);

	// Find the dateStr for the currently selected day
	const selectedDateStr = useMemo(() => {
		const dayIndex = dayNames.indexOf(selectedDay);
		return weekData[dayIndex]?.dateStr || '';
	}, [selectedDay, weekData, dayNames]);

	// Progress calculation for the displayed month
	const allExercisesWithSeries = useMemo(
		() =>
			ROUTINE.flatMap(r =>
				r.exercises.map(ex => ({ id: ex.id, total: ex.series }))
			),
		[]
	);
	const monthlyProgress = getMonthlyProgress(
		allExercisesWithSeries,
		displayDate.monthIndex,
		displayDate.year
	);

	const handleDayPress = (day: string) => {
		setSelectedDay(day);
	};

	return (
		<ScrollView
			className="flex-1 bg-fondo"
			showsVerticalScrollIndicator={false}
		>
			
				{/* Header */}
				<View className="pt-16 px-6 mb-8">
					<Texto className="text-segundario text-h2">
						Resumen de actividad
					</Texto>
				</View>

				{/* Progress Card */}
				<FadeSlideView>
					<View className="mx-6 p-6 bg-card rounded-rounded2 border border-border flex-row items-center justify-between mb-10">
					<View>
						<Texto className="text-primario text-h3 mb-1">
							Progreso Mensual
						</Texto>
						<Texto className="text-segundario text-h4 ">
							{displayDate.month} {displayDate.year}
						</Texto>
					</View>
					<CircularProgress
						progress={monthlyProgress}
						size={80}
						strokeWidth={8}
					>
						<Texto className="text-primario text-h3">
							{Math.round(monthlyProgress * 100)}%
						</Texto>
					</CircularProgress>
				</View>
				</FadeSlideView>

				{/* Calendar Header */}
				<View className="mx-6 flex-row justify-between items-center mb-6">
					<Texto className="text-segundario text-h3">
						{displayDate.month} {displayDate.year}
					</Texto>
					<View className="flex-row gap-4">
						<ScaleButton
						onPress={() => setWeekOffset(prev => prev - 7)}
						className="w-10 h-10 bg-card rounded-full items-center justify-center border border-border"
					>
						<ArrowLeft2 size={15} color="#7faa96" />
					</ScaleButton>
					<ScaleButton
						onPress={() => setWeekOffset(prev => prev + 7)}
						className="w-10 h-10 bg-card rounded-full items-center justify-center border border-border"
					>
						<ArrowRight2 size={15} color="#7faa96" />
					</ScaleButton>
					</View>
				</View>

				{/* Full Grid Calendar */}
				<View className="mx-6 flex-row justify-between mb-10">
					{dayNames.map((day, index) => {
						const isSelected = day === selectedDay;
						const routine = ROUTINE.find(r => r.day === day);
						const dayExercisesWithTotal =
							routine?.exercises.map(ex => ({
								id: ex.id,
								total: ex.series,
							})) || [];
						const { number, dateStr } = weekData[index];
						const isCompletedOverall =
							dayExercisesWithTotal.length > 0 &&
							dayExercisesWithTotal.every(ex =>
								isCompleted(ex.id, ex.total, dateStr)
							);
						return (
							<TouchableOpacity
								key={day}
								onPress={() => handleDayPress(day)}
								style={{ width: '13%' }}
								className={`py-5 rounded-3xl items-center gap-1 justify-center border ${
									isSelected
										? 'bg-color border-color'
										: 'bg-card border-border'
								}`}
							>
								<Texto
									className={`text-base  mb-1 ${isSelected ? 'text-fondo' : 'text-segundario'}`}
								>
									{dayShort[index]}
								</Texto>
								<Texto
									className={`text-base font-bold ${isSelected ? 'text-fondo' : 'text-segundario'}`}
								>
									{number}
								</Texto>
								{isCompletedOverall && !isSelected && (
									<View className="absolute -bottom-1 w-1 h-1 bg-color rounded-full" />
								)}
							</TouchableOpacity>
						);
					})}
				</View>

				{/* Exercises List */}
				<FadeSlideView>
					<View className="mx-6" key={selectedDay}>
					<Texto className="text-segundario text-h3 mb-6">
						{selectedDay}
						{currentDayRoutine?.title && ` - ${currentDayRoutine.title}`}
					</Texto>

					{(currentDayRoutine?.exercises?.length ?? 0) > 0 ? (
						currentDayRoutine?.exercises?.map(ex => (
							<ExerciseCard
								key={ex.id}
								exercise={ex}
								date={selectedDateStr}
							/>
						))
					) : (
						<View className="items-center py-10">
							<Texto className="text-segundario text-h3">
								Hoy es día de descanso
							</Texto>
						</View>
					)}
				</View>
				</FadeSlideView>
			
		</ScrollView>
	);
}