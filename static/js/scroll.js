const hideScrollbar = () => {
    document.body.style.overflow = 'hidden';
    // reserve space for scrollbar
    document.body.style.paddingRight = '5px';
};

const showScrollbar = () => {
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0';
}  

