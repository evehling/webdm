import React from 'react';

const Card = ({ text, idx, nextQ, question }) => {
    let onClick = () => {
        if(nextQ && typeof idx === 'number')
            nextQ(idx);
    };

    return (
        <div className={question ? "card-container border-green" : "card-container"} onClick={onClick}>
            <h4>{text}</h4>
        </div>
    );
};

export default Card;