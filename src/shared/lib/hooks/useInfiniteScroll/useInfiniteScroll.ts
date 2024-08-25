import { MutableRefObject, useEffect, useRef } from 'react';

export interface UseInfiniteScrollProps {
    callback?: () => void;
    triggerRef: MutableRefObject<HTMLElement>;
    wrapperRef: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({
    callback,
    triggerRef,
    wrapperRef,
}: UseInfiniteScrollProps) {
    const observer = useRef<IntersectionObserver | null>(null);
    useEffect(() => {
        // замыкаем элементы внутри, т.к. они прилетают извне и могут быть удалены
        // сделано это, для того, чтобы иметь доступ к дом нодам в случае, если компонент уже демонтировался
        const wrapperElement = wrapperRef.current;
        const triggerElement = triggerRef.current;

        if (callback) {
            const options = {
            // рут это там, где находится скролл
                root: wrapperElement,
                rootMargin: '0px',
                threshold: 1.0,
            };

            observer.current = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);

            observer.current.observe(triggerElement);
        }
        return () => {
            // объект реф, где ссылка на объект меняться не будет, поэтому, создавать под реф отдельную переменную не надо
            if (observer.current && triggerElement) {
                // debugger;
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.current.unobserve(triggerElement);
            }
        };
    }, [callback, triggerRef, wrapperRef]);
}
