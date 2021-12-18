import { extendTheme } from 'native-base';
import Colors, { palette } from '../colors';

export const BaseTheme = extendTheme({

	components: {
		Button: {
			baseStyle: {
				borderRadius: 0,
				// padding: 12,
			},
			defaultProps: {

			},

		},
		Text: {
			defaultProps: {
				fontSize: 'lg',
			},
		},

		Input: {
			defaultProps: {
				size: "lg",
				variant: "underlined"
			},
			sizes: {
				"md": {
					p: 1
				}
			}
		},
		Box: {
			baseStyle: ({ colorMode }) => {
				return {
					// backgroundColor: colorMode === 'dark' ? 'app.700' : '#fff',
				};
			},
		}
	},
	fontWeights: {
		hairline: 100,
		thin: 200,
		light: 300,
		normal: 400,
		medium: 500,
		semibold: 600,
		bold: 700,
		extrabold: 800,
		black: 900,
	},
	fontSizes: {
		xxs: 10,
		xs: 12,
		sm: 14,
		md: 16,
		lg: 18,
		xl: 20,
		'2xl': 24,
		'3xl': 30,
		'4xl': 36,
		'5xl': 48,
		'6xl': 60,
		'7xl': 72,
		'8xl': 96,
		'9xl': 128,
	},

	colors: {
		primary: palette.primary,
		secondary: palette.secondary,
		slateGray: {
			50: '#f3f2f2',
			100: '#d8d8d8',
			200: '#bebebe',
			300: '#a3a3a3',
			400: '#898989',
			500: '#6f6f6f',
			600: '#565656',
			700: '#3e3e3e',
			800: '#252525',
			900: '#0d0c0d',
		},

	},
	Pressable: {
		cursor: 'pointer',
	},

	config: {
		// Changing initialColorMode to 'dark'
		initialColorMode: 'light',
	},
});
