import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance;

export const getLenis = () => lenisInstance;

export default function SmoothScroll({ children }) {
    useEffect(() => {
        lenisInstance = new Lenis({
            duration: 1.2,
            smooth: true,
        });
        
        function raf(time) {
            lenisInstance.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenisInstance.destroy();
        };
    }, []);

    return children;
};

