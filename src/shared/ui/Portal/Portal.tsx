import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode;
    element?: HTMLElement;
}
/* модальные окна или тултипы должны находится на верхнем уровне, чтобы не было ошибок.Бывает, когда две модалки находится рядом */
// что могут быть проблемы
/* портал физически переносит children компонент в element компонент */
/* пример переноса модалки в боди */
export function Portal(props: PortalProps) {
    const {
        children,
        element = document.body,
    } = props;
    return createPortal(children, element);
}
