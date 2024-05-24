import React from 'react'
import { mount } from 'cypress/react'
import Pagination from './Pagination'

describe('<Pagination />', () => {
    let defaultProps

    beforeEach(() => {
        defaultProps = {
            onClickPrev: cy.stub(),
            onClickNext: cy.stub(),
            onChage: cy.stub(),
        }
    })

    it('Renderizar a página com um limite de 10 itens por página', () => {
        const props = {
            currentPage: 1,
            paginationInfo: {
                totalPages: 5,
                limit: 10
            },
            ...defaultProps,
        }
        mount(<Pagination {...props} />)

        cy.get('select').should('have.value', 10)
    })

    it('Desativa o botão de paginação "Anterior" quando na primeira página', () => {
        const props = {
            currentPage: 1,
            paginationInfo: {
                totalPages: 3,
                limit: 20
            },
            ...defaultProps,
        }

        mount(<Pagination {...props} />)

        cy.contains('button', 'Prev').should('be.disabled').and('be.visible')
    })

    it('Desativa o botão de paginação "Próxima" quando na última página', () => {
        const props = {
            currentPage: 3,
            paginationInfo: {
                totalPages: 3,
                limit: 20
            },
            ...defaultProps,
        }

        mount(<Pagination {...props} />)

        cy.contains('button', 'Next').should('be.disabled').and('be.visible')
    })

    it('Desativa ambos os botões quando há apenas uma página', () => {
        const props = {
            currentPage: 1,
            paginationInfo: {
                totalPages: 1,
                limit: 50
            },
            ...defaultProps,
        }

        mount(<Pagination {...props} />)

        cy.contains('button', 'Prev').should('be.disabled').and('be.visible')
        cy.contains('button', 'Next').should('be.disabled').and('be.visible')
        cy.contains('span', 'Page 1 of 1').should('be.visible')
    })

    it('Mostra "Page 1 of 3"', () => {
        const props = {
            currentPage: 1,
            paginationInfo: {
                totalPages: 3,
                limit: 20
            },
            ...defaultProps,
        }

        mount(<Pagination {...props} />)

        cy.contains('span', 'Page 1 of 3').should('be.visible')
    })
})
