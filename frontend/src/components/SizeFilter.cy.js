import React from 'react'
import SizeFilter from './SizeFilter'

describe('<SizeFilter />', () => {
  it('Filtra por cada tamanho', () => {
    cy.mount(<SizeFilter />)
    cy.get('select').should('have.value', 'All').find('option').each(($opn) => {
      const optionText = $opn.text()
      cy.get('select').select(optionText).should('have.value', optionText)
    })

  })
})