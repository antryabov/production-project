import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from 'shared/config/i18n/i18nForTests';
import { BrowserRouter } from 'react-router-dom';

// оборачивает тестируемый компонент в обертку для роутера и переводов
// потому что компонент рендерится изолированно
export function componentRender(component: ReactNode) {
    return render(
        <BrowserRouter>
            <I18nextProvider i18n={i18nForTests}>
                {component}
            </I18nextProvider>
        </BrowserRouter>,
    );
}
