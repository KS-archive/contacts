import { RefObject, useLayoutEffect, useRef } from "react";
import { useVirtual } from "react-virtual";

type Options<T extends HTMLElement> = Omit<Parameters<typeof useVirtual>[0], "parentRef"> & {
  parentRef: RefObject<T>;
};

type EventType = keyof HTMLElementEventMap;

export function useVirtualWindow<T extends HTMLElement>(options: Options<T>) {
  const sizeKey = options.horizontal ? "width" : "height";

  const virtualizedRef = options.parentRef;
  const virtualizedBounds = useRef({ top: 0, left: 0 });

  const scrollListenerRef = useRef(() => {});

  const mockedParentRef = useRef({
    get scrollLeft() {
      return window.scrollX - virtualizedBounds.current.left;
    },

    get scrollTop() {
      return window.scrollY - virtualizedBounds.current.top;
    },

    getBoundingClientRect: () => ({
      width: window.innerWidth,
      height: window.innerHeight,
    }),

    addEventListener: (type: EventType, listener: EventListener, eventOptions?: boolean | AddEventListenerOptions) => {
      if (type === "scroll") {
        const proxiedListener: any = listener;

        scrollListenerRef.current = () => {
          const bodyOffset = parseInt(document.body.style.top || "0", 10);

          const target = {
            scrollLeft: window.scrollX - virtualizedBounds.current.left,
            scrollTop: window.scrollY - virtualizedBounds.current.top - bodyOffset,
          };

          proxiedListener({ target });
        };

        scrollListenerRef.current();
      }

      return document.addEventListener(type, listener, eventOptions);
    },

    removeEventListener: (type: EventType, listener: EventListener, eventOptions?: boolean | EventListenerOptions) => {
      const listenerToRemove = type === "scroll" ? scrollListenerRef.current : listener;
      return document.removeEventListener(type, listenerToRemove, eventOptions);
    },
  });

  useLayoutEffect(() => {
    const onResize = () => {
      if (virtualizedRef.current) {
        const rect = virtualizedRef.current.getBoundingClientRect();

        virtualizedBounds.current = {
          left: rect.left + window.scrollX,
          top: rect.top + window.scrollY,
        };
      }
    };

    onResize();

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [virtualizedRef, sizeKey]);

  return useVirtual({
    ...options,
    parentRef: mockedParentRef,
  });
}
