import { useEffect } from 'react';

const DisableHotkeysAndDevTools = () => {
    useEffect(() => {
        const disableDefault = (e: MouseEvent) => {
            e.preventDefault();
        };

        const disableHotkeys = (e: KeyboardEvent) => {
            if ((e.ctrlKey && e.key === 'c') || e.key === 'F12' || ctrlShiftKey(e, 'I') ||
                ctrlShiftKey(e, 'J') || ctrlShiftKey(e, 'C') || (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) ||
                e.key === 'PrintScreen') {
                e.preventDefault();
            }
        };

        const ctrlShiftKey = (e, keyCode) => {
            return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
        }

        document.addEventListener('contextmenu', disableDefault);
        document.addEventListener('keydown', disableHotkeys);

        const detectDevTools = () => {
            const devtools = /./;
            devtools.toString = function() {
                setTimeout(() => {
                    debugger; // Breakpoint when the developer tools are opened
                }, 0);
                return '';
            };
            console.log('%c', devtools);
        };

        detectDevTools();
        const intervalId = setInterval(detectDevTools, 1000);

        return () => {
            document.removeEventListener('contextmenu', disableDefault);
            document.removeEventListener('keydown', disableHotkeys);
            clearInterval(intervalId);
        };
    }, []);

    return null; // This component doesn't render anything, it just sets up the event listeners
};

export default DisableHotkeysAndDevTools;