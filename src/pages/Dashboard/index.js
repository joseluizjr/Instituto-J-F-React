import React, { Component } from 'react'

import { Conta, ContaEmArray, Fibonacci, Produtos } from '../../components'

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tab: 1
        }
    }

    handleTabs = tab => {
        this.setState({ tab })
    }

    renderContentTab = tab => {
        switch (tab) {
            case 1:
                return <Conta />
            case 2:
                return <ContaEmArray />
            case 3:
                return <Fibonacci />
            case 4:
                return <Produtos />
            default:
                return <Conta />
        }
    }

    render() {
        const { tab } = this.state;

        return (
            <div className='dashboard'>
                <header className='header'>
                    <div className='container'>
                        <h1>Instituto J&F</h1>
                    </div>
                </header>
                <main className='main'>
                    <div className='container'>
                        <ul className='tabs'>
                            <li className={`item ${tab === 1 ? 'active' : ''}`} onClick={() => this.handleTabs(1)}>
                                Exercício 1
                            </li>
                            <li className={`item ${tab === 2 ? 'active' : ''}`} onClick={() => this.handleTabs(2)}>
                                Exercício 2
                            </li>
                            <li className={`item ${tab === 3 ? 'active' : ''}`} onClick={() => this.handleTabs(3)}>
                                Exercício 3
                            </li>
                            <li className={`item ${tab === 4 ? 'active' : ''}`} onClick={() => this.handleTabs(4)}>
                                Exercício 4
                            </li>
                        </ul>

                        { this.renderContentTab(tab) }

                    </div>
                </main>
            </div>
        )
    }
}

export default Dashboard
