import { DayRoutine } from './types';

export const ROUTINE: DayRoutine[] = [
	{
		day: 'Lunes',
		title: 'Espalda & Bíceps',
		exercises: [
			{
				id: 'l-1',
				name: 'Dominadas pronas',
				description:
					'El movimiento fundamental de tracción vertical. Mantén el core firme, evita el balanceo y busca que la barbilla supere la barra en cada repetición. Enfócate en la retracción escapular al inicio del movimiento para maximizar la activación del dorsal ancho.',
				series: 5,
				reps: '4–6',
				rest: 120,
				location: 'Casa',
				level: 'Intermedio',
				image: 'https://images.pexels.com/photos/33777755/pexels-photo-33777755.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
			},
			{
				id: 'l-2',
				name: 'Scap pull-ups',
				description:
					'Ejercicio esencial para la salud del hombro y la fuerza de tracción básica. Desde una posición de colgado pasivo, activa exclusivamente las escápulas tirando de ellas hacia abajo y hacia atrás sin doblar los brazos. Controla el descenso para mejorar la estabilidad.',
				series: 3,
				reps: '8–10',
				rest: 60,
				location: 'Casa',
				level: 'Principiante',
				image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1000&auto=format&fit=crop',
			},
			{
				id: 'l-4',
				name: 'Jalón al pecho',
				description:
					'Alternativa controlada para construir masa en la espalda. Mantén el torso ligeramente inclinado hacia atrás, pecho hacia arriba y tira de la barra hacia la parte superior del esternón. Imagina que llevas los codos hacia tus bolsillos traseros.',
				series: 4,
				reps: '8–12',
				rest: 90,
				location: 'Gym',
				level: 'Principiante',
				image: 'https://images.pexels.com/photos/32085381/pexels-photo-32085381.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
			},
			{
				id: 'l-6',
				name: 'Curl bíceps con pesas',
				description:
					'Aislamiento máximo del bíceps braquial. Utiliza un rango de movimiento completo, extendiendo los brazos por completo en la parte inferior y apretando el músculo en la parte superior. Evita usar el impulso del cuerpo.',
				series: 3,
				reps: '10–12',
				rest: 60,
				location: 'Gym',
				level: 'Principiante',
				image: 'https://images.pexels.com/photos/6455960/pexels-photo-6455960.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
			},
		],
	},
	{
		day: 'Martes',
		title: 'Piernas & Core',
		exercises: [
			{
				id: 'm-1',
				name: 'Sentadilla',
				description:
					'El rey de los ejercicios de pierna. Baja de forma controlada rompiendo el paralelo si tu movilidad lo permite. Mantén el peso distribuido en la mitad del pie y el talón, y empuja con fuerza hacia arriba manteniendo el pecho erguido.',
				series: 4,
				reps: '8–10',
				rest: 120,
				location: 'Gym',
				level: 'Intermedio',
				image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
			},
			{
				id: 'm-2',
				name: 'Prensa',
				description:
					'Permite manejar cargas pesadas minimizando la fatiga lumbar. Coloca los pies a la anchura de los hombros y baja la plataforma hasta que tus rodillas formen un ángulo de 90 grados. No bloquees las rodillas al extenderlas.',
				series: 3,
				reps: '10–12',
				rest: 90,
				location: 'Gym',
				level: 'Principiante',
				image: 'https://images.pexels.com/photos/13965336/pexels-photo-13965336.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
			},
			{
				id: 'm-3',
				name: 'Curl femoral',
				description:
					'Fortalecimiento de la cadena posterior. Asegúrate de que el rodillo esté justo por encima de los talones. Realiza una contracción explosiva y un descenso lento para maximizar el daño muscular controlado y el crecimiento.',
				series: 3,
				reps: '10–12',
				rest: 60,
				location: 'Gym',
				level: 'Principiante',
				image: 'https://images.pexels.com/photos/9152548/pexels-photo-9152548.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
			},
		],
	},
	{
		day: 'Miércoles',
		title: 'Descanso',
		exercises: [],
	},
	{
		day: 'Jueves',
		title: 'Pecho, Hombros & Tríceps',
		exercises: [
			{
				id: 'j-1',
				name: 'Flexiones',
				description:
					'Técnica de empuje horizontal pura. Manos ligeramente más anchas que los hombros, cuerpo como una tabla y pecho rozando el suelo. Codos a 45 grados respecto al torso para proteger el manguito rotador.',
				series: 4,
				reps: '12–15',
				rest: 90,
				location: 'Casa',
				level: 'Principiante',
				image: 'https://images.pexels.com/photos/4162495/pexels-photo-4162495.jpeg?q=80&w=1000&auto=format&fit=crop',
			},
			{
				id: 'j-2',
				name: 'Flexiones explosivas',
				description:
					'Desarrollo de potencia en el tren superior. Desciende lentamente y empuja con tal fuerza que tus manos se despeguen del suelo. Mantén la estructura rígida al aterrizar para absorber el impacto correctamente.',
				series: 3,
				reps: '3–5',
				rest: 120,
				location: 'Casa',
				level: 'Avanzado',
				image: 'https://images.pexels.com/photos/4804335/pexels-photo-4804335.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
			},
			{
				id: 'j-3',
				name: 'Press banca',
				description:
					'Hipertrofia de pectoral mayor. Realiza un arco lumbar ligero y mantén las escápulas retraídas contra el banco. Baja la barra hasta la parte media del pecho y empuja hacia arriba bloqueando ligeramente al final.',
				series: 4,
				reps: '8–10',
				rest: 120,
				location: 'Gym',
				level: 'Intermedio',
				image: 'https://images.pexels.com/photos/7289245/pexels-photo-7289245.jpeg?q=80&w=1000&auto=format&fit=crop',
			},
			{
				id: 'j-4',
				name: 'Press hombros máquina',
				description:
					'Enfoque en deltoides laterales y frontales. Ajusta el asiento para que los agarres queden a la altura de las orejas. Empuja de forma vertical sin arquear excesivamente la espalda.',
				series: 3,
				reps: '10–12',
				rest: 90,
				location: 'Gym',
				level: 'Principiante',
				image: 'https://images.pexels.com/photos/4164758/pexels-photo-4164758.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
			},
			{
				id: 'j-5',
				name: 'Tríceps en polea',
				description:
					'Aislamiento de la cabeza larga y lateral del tríceps. Codos pegados a las costillas en todo momento. Extiende los brazos completamente hacia abajo y siente el estiramiento en la parte superior.',
				series: 3,
				reps: '10–12',
				rest: 60,
				location: 'Gym',
				level: 'Principiante',
				image: 'https://images.pexels.com/photos/17898138/pexels-photo-17898138.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
			},
		],
	},
	{
		day: 'Viernes',
		title: 'Descanso',
		exercises: [],
	},
	{
		day: 'Sábado',
		title: 'Skill & Muscle Up Prep',
		exercises: [
			{
				id: 's-1',
				name: 'Dominadas explosivas',
				description:
					'Clave para el Muscle Up. Tira con explosividad intentando llevar la barra por debajo del pecho o hasta la cintura. Usa un tirón en forma de "C" para generar el espacio necesario para la transición.',
				series: 5,
				reps: '3–5',
				rest: 120,
				location: 'Casa',
				level: 'Avanzado',
				image: 'https://images.pexels.com/photos/13993573/pexels-photo-13993573.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
			},
			{
				id: 's-2',
				name: 'Fondos en barra recta',
				description:
					'La fase final del Muscle Up. Mantén el cuerpo ligeramente inclinado hacia adelante y baja hasta que el pecho toque la barra. Sube con potencia extendiendo los brazos por completo.',
				series: 4,
				reps: '6–10',
				rest: 120,
				location: 'Casa',
				level: 'Intermedio',
				image: 'https://images.pexels.com/photos/4803710/pexels-photo-4803710.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
			},
			{
				id: 's-3',
				name: 'False grip hang',
				description:
					'Fortalecimiento de la transición en anillas o barra. Coloca el talón de la palma sobre la barra y mantén la posición. Es doloroso inicialmente pero crucial para evitar lesiones en la muñeca al rotar.',
				series: 3,
				reps: '20–30s',
				rest: 60,
				location: 'Casa',
				level: 'Intermedio',
				image: 'https://images.pexels.com/photos/7259822/pexels-photo-7259822.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
			},
		],
	},
	{
		day: 'Domingo',
		title: 'Descanso',
		exercises: [],
	},
];
