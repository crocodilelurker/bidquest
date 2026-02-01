import React from 'react';

const Loader = ({ size = "50px", color = "#fff" }) => {
    return (
        <>
            <div className="loader" style={{ width: size, '--loader-color': color }}></div>
            <style>{`
                .loader {
                    aspect-ratio: 1;
                    border-radius: 50%;
                    background: 
                        radial-gradient(farthest-side, var(--loader-color) 94%, #0000) top/8px 8px no-repeat,
                        conic-gradient(#0000 30%, var(--loader-color));
                    -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
                    animation: l13 1s infinite linear;
                }
                @keyframes l13 { 
                    100% { transform: rotate(1turn) } 
                }
            `}</style>
        </>
    );
};

export default Loader;
