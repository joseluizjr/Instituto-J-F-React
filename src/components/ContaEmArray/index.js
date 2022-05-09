import React, { Component } from 'react'

class ContaEmArray extends Component {
    constructor(props) {
        super(props)
        this.state = {
            operador: [
                { name: 'Selecionar operador', value: '' },
                { name: 'Divisão', value: 'divisao' },
                { name: 'Multiplicação', value: 'multiplicacao' },
                { name: 'Resto da divisão', value: 'modulo' },
                { name: 'Soma', value: 'soma' },
                { name: 'Subtração', value: 'subtracao' }
            ],
            array_1_num_1: '',
            array_1_num_2: '',
            array_1_conta: '',
            array_2_num_1: '',
            array_2_num_2: '',
            array_2_conta: '',
            resultado: '',
            resposta: false
        }
    }

    onChangeArrayNum = (tipo, e) => {
        const valor = Number(e.target.value)
        if (tipo === 'array_1_num_1') { this.setState({ array_1_num_1: valor }) }
        else if (tipo === 'array_1_num_2') { this.setState({ array_1_num_2: valor }) }
        else if (tipo === 'array_2_num_1') { this.setState({ array_2_num_1: valor }) }
        else if (tipo === 'array_2_num_2') { this.setState({ array_2_num_2: valor }) }
    }

    onChangeOperador = (tipo, e) => {
        if (tipo === 'array_1_conta') {
            this.setState({ array_1_conta: e.target.value })
        } else if (tipo === 'array_2_conta') {
            this.setState({ array_2_conta: e.target.value })
        }
    }

    executaCalculo = () => {
        this.renderCalculo()
    }

    renderCalculo = () => {
        const numeros = [
            { num1: this.state.array_1_num_1, num2: this.state.array_1_num_2, conta: this.state.array_1_conta },
            { num1: this.state.array_2_num_1, num2: this.state.array_2_num_2, conta: this.state.array_2_conta }
        ]
        const resultado = [
            numeros.map(valor => {
                const valor1 = Number(valor.num1)
                const valor2 = Number(valor.num2)
                if (valor.conta === 'soma') { return valor1 + valor2 }
                else if (valor.conta === 'subtracao') { return valor1 - valor2 }
                else if (valor.conta === 'multiplicacao') { return valor1 * valor2 }
                else if (valor.conta === 'divisao') { return valor1 / valor2 }
                else if (valor.conta === 'modulo') { return valor1 % valor2 }
                else { return 'Número ou tipo inválido!' }
            })
        ]
        this.setState({ resultado: resultado.join(), resposta: true })
    }
    renderButtonClass = () => {

        const { array_1_num_1, array_1_num_2, array_1_conta, array_2_num_1, array_2_num_2, array_2_conta } = this.state
        let isDisabled = false;

        if (
            array_1_num_1 === '' ||
            array_1_num_2 === '' ||
            ((array_1_num_2 === 0 || array_1_num_2 === -0) && array_1_conta === 'divisao') ||
            array_1_conta === '' ||
            array_2_num_1 === '' ||
            array_2_num_2 === '' ||
            ((array_2_num_2 === 0 || array_2_num_2 === -0) && array_2_conta === 'divisao') ||
            array_2_conta === ''
        ) isDisabled = true

        return isDisabled;
    };

    render() {
        const { operador, resultado, resposta, array_1_num_1, array_1_num_2, array_2_num_1, array_2_num_2 } = this.state
        const isDisabled = this.renderButtonClass()
        return (
            <div className='contentTab contaEmArray'>
                <h3>2 - Escreva uma função que receba um array de objetos [{`{`}<span>num1</span>, <span>num2</span>, <span>conta</span>{`}`}, {`{`}<span>num1</span>, <span>num2</span>, <span>conta</span>{`}`}] e realize todas as contas do array, retornando um array somente com os resultados.</h3>
                <p>Digite os valores do primeiro ARRAY</p>
                <div className='form'>
                    <label>
                        <span>Número 1</span>
                        <input type='number' value={array_1_num_1} onChange={(e) => this.onChangeArrayNum('array_1_num_1', e)} />
                    </label>
                    <label>
                        <span>Número 2</span>
                        <input type='number' value={array_1_num_2} onChange={(e) => this.onChangeArrayNum('array_1_num_2', e)} />
                    </label>
                    <label>
                        <span>Operador</span>
                        <select onChange={(e) => this.onChangeOperador('array_1_conta', e)}>
                            {
                                operador.map((item, idx) => (
                                    <option key={idx} value={item.value}>{item.name}</option>
                                ))
                            }
                        </select>
                    </label>
                </div>
                <p>Digite os valores do segundo ARRAY</p>
                <div className='form'>
                    <label>
                        <span>Número 1</span>
                        <input type='number' value={array_2_num_1} onChange={(e) => this.onChangeArrayNum('array_2_num_1', e)} />
                    </label>
                    <label>
                        <span>Número 2</span>
                        <input type='number' value={array_2_num_2} onChange={(e) => this.onChangeArrayNum('array_2_num_2', e)} />
                    </label>
                    <label>
                        <span>Operador</span>
                        <select onChange={(e) => this.onChangeOperador('array_2_conta', e)}>
                            {
                                operador.map((item, idx) => (
                                    <option key={idx} value={item.value}>{item.name}</option>
                                ))
                            }
                        </select>
                    </label>
                    <button className='btn' disabled={isDisabled} onClick={() => this.executaCalculo()}>Calcular</button>
                </div>
                <div className='resultado'>
                    {
                        resposta && resposta !== 'error'
                            ? `Resposta: [${resultado}]`
                            : <p>{resultado}</p>
                    }
                </div>
            </div>
        )
    }
}

export default ContaEmArray
