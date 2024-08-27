type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

interface ViewStyle {
	padding: number;
}

interface FontStyle {
	family: string;
	weight: FontWeight;
	size: number;
}

export type { ViewStyle, FontStyle, FontWeight };
