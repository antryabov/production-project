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

declare const __IS_DEV__: boolean;
