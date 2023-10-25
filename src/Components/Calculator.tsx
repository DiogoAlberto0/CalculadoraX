import style from './Calculator.module.css'

import { Button } from './Button'
import { useState } from 'react'

    interface Calculator {
        num1: number,
        num2: number,
        display: number,
        operator: '+' | '-' | '*' | '/' | '',
        isOperating: boolean,
        point: boolean
    }
const Calculator =  () => {

    const [ calculator, setCalculator ] = useState<Calculator>({
        num1:0,
        num2:0,
        display: 0,
        operator: '',
        isOperating: false,
        point: false
    })

    const [ history, setHistory] = useState('')

    const setDisplay = (value: number) => {
        console.log('Foi')
        setCalculator((prevState) => {
            const calc = {...prevState}

                if(!calc.isOperating) {
                    if(calc.point) {
                        calc.display = Number(`${calc.display}.${value}`)
                    } else {
                        calc.display = Number(`${calc.display}${value}`)
                    }
                } else {
                    calc.num1 = calc.display
                    
                    calc.display = value
                    calc.isOperating = false
                }

    
            return calc
        })
    }

    const setPoint = () => {
        setCalculator(prevState => {
            prevState.point = true

            return {...prevState}
        })
    }

    const setOperator = (value: '+' | '-' | '*' | '/' | '') => {
        console.log('Foi')
        setHistory(prevState => `${prevState} ${calculator.display} ${value}`)
        setCalculator((prevState) => {
            const calc = {...prevState}
            if(calc.num1 != 0) {
                if(calc.operator == '+') {
                    calc.display = calc.num1 + calc.display
                }
                if(calc.operator == '-') {
                    calc.display = calc.num1 - calc.display
                }
                if(calc.operator == '*') {
                    calc.display = calc.num1 * calc.display
                }
                if(calc.operator == '/') {
                    calc.display = calc.num1 / calc.display
                }
    
                calc.num1 = 0
            }
            calc.operator = value
            calc.isOperating = true
            return calc
        })

    }

    const setResult = () => {
        setCalculator(prevState => {
            const calc = {...prevState}
            
            if(calc.operator == '+') {
                calc.display = calc.num1 + calc.display
            }
            if(calc.operator == '-') {
                calc.display = calc.num1 - calc.display
            }
            if(calc.operator == '*') {
                calc.display = calc.num1 * calc.display
            }
            if(calc.operator == '/') {
                calc.display = calc.num1 / calc.display
            }

            calc.num1 = 0
            
            return calc
        })
    }

    const deleteLastDigit = () => {
        setCalculator( prevState => {
            const display = prevState.display.toString()

            const withoutLastDigit = display.slice(0, display.length - 1)
            console.log(withoutLastDigit)
            return  {...prevState, display: Number(withoutLastDigit)}
        })
    }
    const resetCalculator = () => {
        setCalculator({
            num1:0,
            num2:0,
            display: 0,
            operator: '',
            isOperating: false,
            point: false
        })
    }


    return( 
        <main className={style.calculator}>
            <div className={style.display}>
                <p>{history}</p>
                <h1>={calculator.display}</h1>
            </div>
            <div className={style.keyboard}>
                <div>
                    <Button content="Ac" variation="tertiary" onClick={resetCalculator}/>
                    <Button content="backSpace" variation="tertiary" onClick={deleteLastDigit}/>
                    <Button content="/" variation="secondary" onClick={() => setOperator('/')}/>
                    <Button content="*" variation="secondary" onClick={() => setOperator('*')}/>
                </div>
                <div>
                    <Button content="7" variation="primary" onClick={() => setDisplay((7))} />
                    <Button content="8" variation="primary"  onClick={() => setDisplay((8))} />
                    <Button content="9" variation="primary"  onClick={() => setDisplay((9))} />
                    <Button content="-" variation="secondary" onClick={() => setOperator('-')} />
                </div>
                <div className={style.group3}>
                    <div>
                        <div>
                            <Button content="4" variation="primary"  onClick={() => setDisplay((4))}/>
                            <Button content="5" variation="primary"  onClick={() => setDisplay((5))}/>
                            <Button content="6" variation="primary"  onClick={() => setDisplay((6))}/>

                        </div>
                        <div>
                            <Button content="1" variation="primary"  onClick={() => setDisplay((1))}/>
                            <Button content="2" variation="primary" onClick={() => setDisplay((2))} />
                            <Button content="3" variation="primary" onClick={() => setDisplay((3))}/>
                        </div>
                    </div>
                    <Button content="+" variation="secondary" higher onClick={() => setOperator('+')}/>

                </div>
                <div className={style.group4}>
                    <Button content="0" variation="primary" wider onClick={() => setDisplay((0))}/>
                    <Button content="." variation="primary"  onClick={() => setPoint()}/>
                    <Button content="=" variation="fourth" higher onClick={() => setResult()}/>
                </div>

            </div>

        </main>
    )
}

export {
    Calculator
}