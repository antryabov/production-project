import { fireEvent, screen } from '@testing-library/react';
import { withTranslation } from 'react-i18next';
import { renderWithTransalation } from 'shared/lib/tests/renderWithTransalation/renderWithTransalation';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
    test('Test render', () => {
        // функция хелпер для рендера компонента с оберткой
        renderWithTransalation(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('Test toggle', () => {
        renderWithTransalation(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        const toggleBtn = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('sidebar')).not.toHaveClass('collapsed');
        fireEvent.click(toggleBtn);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
