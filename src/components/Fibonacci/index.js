import React, { Component } from 'react'

class Fibonacci extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numInicial: '',
            qtd: '',
            resultado: [],
            resposta: false
        }
    }

    renderFibonacci = (numInicial, qtd) => {
        // validação para números negativos
        if (numInicial < 0 || qtd < 0) {
            this.setState({ resultado: 'Digite apenas números positivos', resposta: 'error' })
        } else {
            // declaração de variáveis
            let soma = 0
            let anterior = 0
            let proximo = 1
            let arrayFibonacci = []

            for (let i = 0; i < (Number(numInicial) + Number(qtd)); i++) {
                soma = anterior + proximo
                arrayFibonacci.push(anterior)
                anterior = proximo
                proximo = soma
            }

            if (arrayFibonacci.indexOf(numInicial) !== -1) {
                const inicio = arrayFibonacci.indexOf(numInicial)
                const final = Number(arrayFibonacci.indexOf(numInicial)) + Number(qtd)
                this.setState({ resultado: arrayFibonacci.slice(inicio, final), resposta: true })
            } else {
                const calc = Number(numInicial) < Number(qtd) ? 1 : 0
                const inicio = arrayFibonacci.indexOf(arrayFibonacci.find(item => item > numInicial)) - Number(calc)
                const final = (arrayFibonacci.indexOf(arrayFibonacci.find(item => item > numInicial)) + Number(qtd)) - Number(calc)
                this.setState({ resultado: arrayFibonacci.slice(inicio, final), resposta: true })
            }
        }
    }

    onChangeNumInicial = (e) => {
        this.setState({ numInicial: e.target.value })
    }

    onChangeQtd = (e) => {
        this.setState({ qtd: e.target.value })
    }

    render() {
        const { numInicial, qtd, resultado, resposta } = this.state;
        const isDisabled = numInicial === '' || qtd === '' ? true : false
        return (
            <div className='contentTab fibonacci'>
                <h3>3 - Desenvolva uma função que recebe duas variáveis do tipo número (numInicial, qtd) utilizando essas propriedades, retorne um array com a sequência de fibonnacci que deve iniciar do número indicado na <span>numInicial</span> (incluindo o próprio número caso esse faça parte da sequência) e possuir a quantidade de números indicado na <span>qtd</span>.</h3>
                <div className='form'>
                    <label>
                        <span>Número inicial</span>
                        <input type='number' value={numInicial} onChange={(e) => this.onChangeNumInicial(e)} />
                    </label>
                    <label>
                        <span>Quantidade</span>
                        <input type='number' value={qtd} onChange={(e) => this.onChangeQtd(e)} />
                    </label>
                    <button className='btn' disabled={isDisabled} onClick={() => this.renderFibonacci(numInicial, qtd)}>Gerar Fibonacci</button>
                </div>
                <div className='resultado'>
                    <p>
                        {
                            resposta && resposta !== 'error'
                                ? `Resposta: [${resultado}]`
                                : resultado
                        }
                    </p>
                </div>
            </div>
        )
    }
}

export default Fibonacci
