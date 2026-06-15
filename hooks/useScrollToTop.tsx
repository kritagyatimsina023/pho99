// @/hooks/useScrollToTop.ts
import { useCallback } from "react";
import { useLenis } from "@/provider/lenisProvider";

export const useScrollToTop = (percent = 0, behavior: ScrollBehavior = "smooth") => {
    const lenisCtx = useLenis();

    return useCallback(() => {
        const top = document.documentElement.scrollHeight * (percent / 100);
        if (lenisCtx && lenisCtx.lenis) {
            lenisCtx.lenis.scrollTo(top, { immediate: behavior !== "smooth" });
        } else {
            window.scrollTo({
                top,
                behavior,
            });
        }
    }, [percent, behavior, lenisCtx]);
};