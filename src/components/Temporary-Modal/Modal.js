import React from 'react';
import './Modal.css';
import Backdrop from './Backdrop';

const modal = props => {


    return (
        <>
                    <Backdrop show={props.show} modalClosed={props.modalClosed}/>

        <div className="Modal"
            style={{transform:props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity : props.show?1:0}}
        >
            {props.children}
        </div>

        </>
    );
};


export default modal;