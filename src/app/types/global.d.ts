declare module '*.scss' {
	// нужно для того, чтобы не было ошибки типов, потому что тс не понимает,
	// что из scss файлов импортируется
	interface IClassNames {
		[className: string]: string;
	}
	const classNames: IClassNames;
	export = classNames;
}
