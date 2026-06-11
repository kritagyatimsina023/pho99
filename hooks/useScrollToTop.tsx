// @/hooks/useScrollToTop.ts
import { useCallback } from "react";

export const useScrollToTop = (percent = 0, behavior: ScrollBehavior = "smooth") => {
    return useCallback(() => {
        window.scrollTo({
            top: document.documentElement.scrollHeight * (percent / 100),
            behavior,
        });
    }, [percent, behavior]);
};