declare module '*.scss' {
	// нужно для того, чтобы не было ошибки типов, потому что тс не понимает,
	// что из scss файлов импортируется
	interface IClassNames {
		[className: string]: string;
	}
	const classNames: IClassNames;
	export = classNames;
}

declare module '*.svg' {
	// чтобы typescirpt видел svg
	import React from 'react';

	const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
	export default SVG;
}

declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';

// глобальная переменная из PluginDefine
declare const __IS_DEV__: boolean;
declare const __API__: string;
declare const __PROJECT__: 'storybook' | 'frontend' | 'jest';

// наш собственный DeepPartial в глобальной декларации
type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;

// кастомный рекорд
type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};
