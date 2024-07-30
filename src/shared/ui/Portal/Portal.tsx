import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode;
    element?: HTMLElement;
}
/* модальные окна или тултипы должны находится на верхнем уровне, чтобы не было */
/* физически он переносит children в element */
export function Portal(props: PortalProps) {
    const {
        children,
        element = document.body,
    } = props;
    return createPortal(children, element);
}
