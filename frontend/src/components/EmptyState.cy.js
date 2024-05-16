import React from 'react'
import EmptyState from './EmptyState'

describe('<EmptyState />', () => {
  it('Mostra a imagem de uma caixa vazia e o texto "No customers available." quando não há clientes no banco de dados', () => {
    cy.mount(<EmptyState />)
    cy.get('svg').should('be.visible')
    cy.contains('span', 'No customers available.').should('be.visible')
  })
})