import React from 'react'
import Pagination from './Pagination'

describe('<Pagination />', () => {
  let defaultProps
  beforeEach(()=>{
    defaultProps={
      onClickPrev: cy.stub(),
      onClickNext: cy.stub(),
      onChange: cy.stub()
    }
  })
  it('Desativa o botão de paginação Anterior quando na primeira página', () => {
    // see: https://on.cypress.io/mounting-react
    cy.chamaClientes({page:1,limit:10,size: 'All'}).then(({body}) => {
      cy.mount(<Pagination currentPage={parseInt(body.pageInfo.currentPage)} paginationInfo={body.pageInfo} defaultProps/>)  
      cy.contains('Prev').should('be.disabled')
  })
})
  it('Desativa o botão de paginação Anterior quando na primeira página', () => {
    cy.chamaClientes({page:5,limit:10,size: 'All'}).then(({body}) => {
      cy.mount(<Pagination currentPage={parseInt(body.pageInfo.currentPage)} paginationInfo={body.pageInfo} defaultProps/>)  
      cy.contains('Next').should('be.disabled')
  })
  })
  it('Desativa ambos os botões de paginação Anterior e Próximo quando há apenas uma página', () => {
    cy.chamaClientes({page:1,limit:50,size: 'All'}).then(({body}) => {
      cy.mount(<Pagination currentPage={parseInt(body.pageInfo.currentPage)} paginationInfo={body.pageInfo} defaultProps/>)  
      cy.contains('Prev').should('be.disabled')
      cy.contains('Next').should('be.disabled')
  })
  })
  it('Deixa ambos os botões de paginação Anterior e Próximo ativados quando em uma página do meio', () => {
    cy.chamaClientes({page:3,limit:50,size: 'All'}).then(({body}) => {
      cy.mount(<Pagination currentPage={parseInt(body.pageInfo.currentPage)} paginationInfo={body.pageInfo} defaultProps/>)  
      cy.contains('Prev').should('be.enabled')
      cy.contains('Next').should('be.enabled')
  })
  })
  it('Mostra "Page 1 of n"', () => {
    cy.chamaClientes({page:5,limit:3,size: 'All'}).then(({body}) => {
      cy.mount(<Pagination currentPage={parseInt(body.pageInfo.currentPage)} paginationInfo={body.pageInfo} defaultProps/>)  
      cy.get('span').should('have.text',`Page ${parseInt(body.pageInfo.currentPage)} of ${body.pageInfo.totalPages}`)
  })
  })
  it('Configura um novo limite de paginação, garantindo que persista no localstorage', () => {
    let novoLimite = '20'
    cy.chamaClientes({page:1,limit:10,size: 'All'}).then(({body}) => {
      cy.mount(<Pagination currentPage={parseInt(body.pageInfo.currentPage)} paginationInfo={body.pageInfo} defaultProps/>)  
      cy.get('select').select('20')
      window.localStorage.setItem('limit',novoLimite)
      cy.get('select').should('have.value',novoLimite).should(() =>{
        expect(localStorage.getItem('limit')).to.eq(novoLimite)
      })
  })
  })
})