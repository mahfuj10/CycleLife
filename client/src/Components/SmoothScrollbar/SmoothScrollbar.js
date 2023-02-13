import { useEffect } from "react";
import { Scrollbar } from "smooth-scrollbar/scrollbar";


const options = {
    damping: 0.07
};
const SmoothScroll = () => {

    useEffect(() => {
        Scrollbar.init(document.querySelector('body'), options);
    }, []);

    return null;

};

export default SmoothScroll;