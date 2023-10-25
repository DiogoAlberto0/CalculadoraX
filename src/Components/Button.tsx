import style from  './Button.module.css'

import backspaceIcon from '../assets/backspace.png'

import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    content: string,
    variation:string,
    higher?: boolean,
    wider?: boolean
}
const Button = ( {content, variation, higher, wider, ...props }: ButtonProps ) => {

    const setType = (type:string) => {
        switch(type){
            case 'primary': {
                return style.primary
            }
            case 'secondary': {
                return style.secondary
            }
            case 'tertiary': {
                return style.tertiary
            }
            case 'fourth': {
                return style.fourth
            }
        }
    }

    const Teste = () => {
        if(content == 'backSpace') {
            return <img src={backspaceIcon} alt=""/>
        } else {
            return <p>{content}</p>
        }
    }

    return(
        <button 
            className={`${style.button} ${setType(variation)} ${higher? style.higher: ''} ${wider? style.wider: ''}`}
            {...props}
        >
            <Teste/>
        </button>
    )
}

export { Button }