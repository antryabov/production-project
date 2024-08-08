import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from 'shared/config/i18n/i18nForTests';
import { MemoryRouter } from 'react-router-dom';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';

export interface componentRenderOptions {
    route?: string
    // deep partial позволяет проигнорировать ненужные поля в стейте и взять необходимые
    initialState?: DeepPartial<StateSchema>
}

// оборачивает тестируемый компонент в обертку для роутера и переводов
// потому что компонент рендерится изолированно

// Memory Router специальный компонент для тестирования(нужен, если в тестах есть роутинг)
export function componentRender(component: ReactNode, options: componentRenderOptions = {}) {
    const {
        route = '/',
        initialState,
    } = options;

    return render(
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider initialState={initialState}>
                <I18nextProvider i18n={i18nForTests}>
                    {component}
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>,
    );
}
