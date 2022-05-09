import React, { Component } from 'react'

class Conta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            num1: '',
            num2: '',
            operador: [
                { name: 'Selecionar operador', valor: '' },
                { name: 'Divisão', value: 'divisao' },
                { name: 'Multiplicação', value: 'multiplicacao' },
                { name: 'Resto da divisão', value: 'resto-da-divisao' },
                { name: 'Soma', value: 'soma' },
                { name: 'Subtração', value: 'subtracao' }
            ],
            resultado: '',
            resposta: false,
            operadorAtual: ''
        }
    }

    onChangeNum1 = (e) => {
        this.setState({ num1: e.target.value })
    }

    onChangeNum2 = (e) => {
        this.setState({ num2: e.target.value })
    }

    onChangeOperador = (e) => {
        this.setState({ operadorAtual: e.target.value })
    }

    renderCalculo = (num1, num2, operadorAtual) => {
        const valor1 = Number(num1)
        const valor2 = Number(num2)
        if ( !isNaN(num1) && !isNaN(num2) ) {
            switch (operadorAtual) {
                case 'soma':
                    this.setState({ resultado: valor1 + valor2, resposta: true })
                    break;

                case 'subtracao':
                    this.setState({ resultado: valor1 - valor2, resposta: true })
                    break;

                case 'multiplicacao':
                    this.setState({ resultado: valor1 * valor2, resposta: true })
                    break;

                case 'divisao':
                    valor2 === 0 || valor2 === -0
                        ? this.setState({ resultado: 'Não existe divisão por 0. Digite outro número.', resposta: 'error' })
                        : this.setState({ resultado: valor1 / valor2, resposta: true })
                    break;

                case 'resto-da-divisao':
                    this.setState({ resultado: valor1 % valor2, resposta: true })
                    break;

                default:
                    this.setState({ resultado: 'Tipo inválido! Os tipos permitidos são: soma, subtracao, multiplicacao, divisao, resto-da-divisao.', resposta: 'error' })
                    break;

            }
        } else {
            this.setState({ resultado: 'Digite apenas números.', resposta: 'error' })
        }
    }

    render() {
        const { num1, num2, operador, resultado, resposta, operadorAtual } = this.state;
        const isDisabled = num1 === '' || num2 === '' ? true : false
        return (
            <div className='contentTab conta'>
                <h3>1 - Escreva uma função que receba 3 parametros (<span>numero 1</span>, <span>numero 2</span> e <span>tipo de conta</span>). Quando acionada, ela irá utilizar os dois números e irá retornar a conta solicitada, por exemplo <span>função(1, 2, "soma")</span> retorna <span>3</span>;</h3>
                <div className='form'>
                    <label>
                        <span>Número 1</span>
                        <input type='number' value={num1} onChange={(e) => this.onChangeNum1(e)} />
                    </label>
                    <label>
                        <span>Número 2</span>
                        <input type='number' value={num2} onChange={(e) => this.onChangeNum2(e)} />
                    </label>
                    <label>
                        <span>Operador</span>
                        <select onChange={(e) => this.onChangeOperador(e)}>
                            {
                                operador.map((item, idx) => (
                                    <option key={idx} value={item.value}>{item.name}</option>
                                ))
                            }
                        </select>
                    </label>
                    <button className='btn' disabled={isDisabled} onClick={() => this.renderCalculo(num1, num2, operadorAtual)}>Calcular</button>
                </div>
                <div className='resultado'>
                    {
                        resposta && resposta !== 'error'
                            ? `Resposta: ${resultado}`
                            : <p>{resultado}</p>
                    }
                </div>
            </div>
        )
    }
}

export default Conta
