import React from 'react'
import Pagination from './Pagination'

describe('<Pagination />', () => {
  let defaultProps
  beforeEach(() => {
    defaultProps = {
      onClickPrev: cy.stub(),
      onClickNext: cy.stub(),
      onChange: cy.stub()
    }
  })
  it('Desativa o botão de paginação Anterior quando na primeira página', () => {
    // see: https://on.cypress.io/mounting-react
    const pageInfo = {
      "currentPage": "1",
      "totalPages": 100,
      "totalCustomers": 200
    }
    cy.mount(<Pagination currentPage={parseInt(pageInfo.currentPage)} paginationInfo={pageInfo} defaultProps />)
    cy.contains('Prev').should('be.disabled')

  })
  it('Desativa o botão de paginação Próximo quando na última página', () => {
    const pageInfo = {
      "currentPage": "100",
      "totalPages": 100,
      "totalCustomers": 200
    }
    cy.mount(<Pagination currentPage={parseInt(pageInfo.currentPage)} paginationInfo={pageInfo} defaultProps />)
    cy.contains('Next').should('be.disabled')

  })
  it('Desativa ambos os botões de paginação Anterior e Próximo quando há apenas uma página', () => {
    const pageInfo = {
      "currentPage": "1",
      "totalPages": 1,
      "totalCustomers": 200
    }
    cy.mount(<Pagination currentPage={parseInt(pageInfo.currentPage)} paginationInfo={pageInfo} defaultProps />)
    cy.contains('Prev').should('be.disabled')
    cy.contains('Next').should('be.disabled')
  })
  it('Deixa ambos os botões de paginação Anterior e Próximo ativados quando em uma página do meio', () => {
    const pageInfo = {
      "currentPage": "50",
      "totalPages": 100,
      "totalCustomers": 200
    }
    cy.mount(<Pagination currentPage={parseInt(pageInfo.currentPage)} paginationInfo={pageInfo} defaultProps />)
    cy.contains('Prev').should('be.enabled')
    cy.contains('Next').should('be.enabled')
  })
  it('Mostra "Page 1 of n"', () => {
    const pageInfo = {
      "currentPage": "1",
      "totalPages": 100,
      "totalCustomers": 200
    }
    cy.mount(<Pagination currentPage={parseInt(pageInfo.currentPage)} paginationInfo={pageInfo} defaultProps />)
    cy.get('span').should('have.text', `Page ${parseInt(pageInfo.currentPage)} of ${pageInfo.totalPages}`)
  })
  it('Configura um novo limite de paginação, garantindo que persista no localstorage', () => {
    let novoLimite = '20'
    const pageInfo = {
      "currentPage": "1",
      "totalPages": 100,
      "totalCustomers": 200
    }
    cy.mount(<Pagination currentPage={parseInt(pageInfo.currentPage)} paginationInfo={pageInfo} defaultProps />)
    cy.get('select').select('20')
    window.localStorage.setItem('limit', novoLimite)
    cy.get('select').should('have.value', novoLimite).should(() => {
      expect(localStorage.getItem('limit')).to.eq(novoLimite)
    })
  })
})