import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode;
    element?: HTMLElement;
}
/* модальные окна или тултипы должны находится на верхнем уровне, чтобы не было ошибок, если две модалки находится рядом */
/* портал физически переносит children компонент в element компонент */
/* пример переноса модалки в боди */
export function Portal(props: PortalProps) {
    const {
        children,
        element = document.body,
    } = props;
    return createPortal(children, element);
}
