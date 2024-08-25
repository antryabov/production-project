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
        if (callback) {
            const options = {
            // рут это там, где находится скролл
                root: wrapperRef.current,
                rootMargin: '0px',
                threshold: 1.0,
            };

            observer.current = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);

            observer.current.observe(triggerRef.current);
        }
        return () => {
            // объект реф, где ссылка на объект меняться не будет, поэтому, создавать под реф отдельную переменную не надо
            if (observer.current && triggerRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.current.unobserve(triggerRef.current);
            }
        };
    }, [callback, triggerRef, wrapperRef]);
}
