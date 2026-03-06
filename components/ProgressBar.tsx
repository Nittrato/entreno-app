import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface ProgressBarProps {
	progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
	return (
		<View className="h-1.5 w-full bg-border rounded-full overflow-hidden">
			<View
				className="h-full bg-color"
				style={{ width: `${progress * 100}%` }}
			/>
		</View>
	);
};

interface CircularProgressProps {
	progress: number;
	size?: number;
	strokeWidth?: number;
	children?: React.ReactNode;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
	progress,
	size = 160,
	strokeWidth = 10,
	children,
}) => {
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = circumference - progress * circumference;

	return (
		<View
			style={{
				width: size,
				height: size,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Svg
				width={size}
				height={size}
				style={{ transform: [{ rotate: '-90deg' }] }}
			>
				<Circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke="#101e16ff"
					strokeWidth={strokeWidth}
					fill="transparent"
				/>
				<Circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke="#21c063ff"
					strokeWidth={strokeWidth}
					fill="transparent"
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					strokeLinecap="round"
				/>
			</Svg>
			<View style={{ position: 'absolute' }}>{children}</View>
		</View>
	);
};
