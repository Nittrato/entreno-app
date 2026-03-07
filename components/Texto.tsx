import { Text as RNText, TextProps } from 'react-native';

export default function Texto({ className, ...props }: TextProps) {
	return (
		<RNText
			className={`font-sans ${className || ''}`}
			{...props}
		/>
	);
}
