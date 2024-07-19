import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/config';

export function buildDevServer(option: BuildOptions): DevServerConfiguration {
    return {
        port: option.port,
        open: true,
        // без этого свойства не будет проксироваться через корневую страницу
        // чтобы не было проблем с переходом между страницами
        historyApiFallback: true,
        // для hot module replacement
        hot: true,
    };
}
