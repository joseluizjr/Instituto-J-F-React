import React, { Component } from 'react'

class Produtos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            produtos: [
                { id: 1, item: 'pastel', valor: 7.9 },
                { id: 2, item: 'coxinha de frango', valor: 6 },
                { id: 3, item: 'guaraná', valor: 4.5 },
                { id: 4, item: 'caldo de cana', valor: 12 },
                { id: 5, item: 'chocolate', valor: 3.5 }
            ],
            combos: [
                { combo: 1, produtos: [{ id: 1 }, { id: 3 }, { id: 5 }], desc: 0.03 },
                { combo: 2, produtos: [{ id: 1 }, { id: 2 }, { id: 3 }], desc: 0.05 },
                { combo: 3, produtos: [{ id: 1 }, { id: 4 }], desc: 0.10 }
            ],
            resultado: '',
            resposta: false,
            comboAtual: ''
        }
    }

    onChangeCombo = (e) => {
        this.setState({ comboAtual: e.target.value })
    }

    consultarCombo = (combo) => {
        const { produtos, combos } = this.state
        const validaCombo = combos.find(item => item.combo === Number(parseInt(combo)))

        // verifica se combo existe
        if (!validaCombo) {
            this.setState({ resultado: 'Combo não cadastrado', resposta: 'error' })
        } else {
            const comboProdutos = validaCombo.produtos.map(produto => produtos.find(item => item.id === produto.id))
            const valorBruto = comboProdutos.map(produto => produto.valor).reduce((ant, atual) => ant + atual, 0)
            const aPagar = Number((valorBruto - (valorBruto * validaCombo.desc)).toFixed(2))

            const resultado = {
                combo: validaCombo.combo,
                produtos: comboProdutos,
                valorBruto,
                aPagar
            }

            this.setState({ resultado, resposta: true }, () => { this.renderComboSelecionado() })
        }
    }

    renderComboSelecionado = () => {
        const { resultado } = this.state
        return (
            <ul>
                <li className='item'><strong>Combo</strong>: {resultado.combo}</li>
                <li className='item'>
                    <strong>Itens do combo</strong>: {` `}
                    ({
                        resultado.produtos.map(produto => (
                            <span key={produto.id}>{produto.item} <i>(R${parseFloat(produto.valor).toFixed(2)})</i><span className='divider'>, </span></span>
                        ))
                    })
                </li>
                <li className='item'><strong>Valor toral</strong>: R${parseFloat(resultado.valorBruto).toFixed(2)}</li>
                <li className='item'><strong>Valor com desconto</strong>: R${parseFloat(resultado.aPagar).toFixed(2)}</li>
            </ul>
        )
    }

    render() {
        const { comboAtual, resposta, resultado } = this.state;
        const isDisabled = comboAtual === '' ? true : false
        return (
            <div className='contentTab conta'>
                <h3>4 - Desenvolva uma função que receba dois arrays de objetos conforme abaixo:</h3>
                <p>Ex.: arr1 = <span>{`[ {id: 1, item: 'pastel', valor: 7.9}, {id: 2, item: 'coxinha de frango', valor: 6}, {id: 3, item: 'guaraná', valor: 4.5}, {id: 4, item: 'caldo de cana', valor: 12}, {id: 5, item: 'chocolate', valor: 3.5} ]`}</span></p>
                <p>Ex.: arr2 = <span>{`[ {combo: 1, produtos: [{id: 1}, {id: 3}, {id: 5}], desc: 0.03}, {combo: 2, produtos: [{id: 1}, {id: 2}, {id: 3}], desc: 0.05}, {combo: 3, produtos: [{id: 1}, {id: 4}], desc: 0.10} ]`}</span></p>
                <p><i>A função deve receber também o número do combo selecionado. O retorno dessa função deve ser um objeto que contenha os items do combo escolhido, o valor total dos itens com soma simples e o preço total desse combo com um desconto no valor correspondente ao valor de desconto na variável desc do combo escolhido.</i></p>

                <p>Digite um valor entre 1 e 3</p>

                <div className='form'>
                    <label>
                        <span>Número do combo</span>
                        <input type='number' onChange={(e) => this.onChangeCombo(e)} />
                    </label>
                    <button className='btn' disabled={isDisabled} onClick={() => this.consultarCombo(comboAtual)}>Consultar combo</button>
                </div>
                <div className='resultado'>
                    {
                        resposta && resposta !== 'error'
                            ? this.renderComboSelecionado()
                            : <p>{resultado}</p>
                    }
                </div>
            </div>
        )
    }
}

export default Produtos
