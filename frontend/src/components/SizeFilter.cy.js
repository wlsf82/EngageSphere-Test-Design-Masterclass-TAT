/* global cy */

import React from 'react'
import SizeFilter from './SizeFilter'
import '../index.css'

const sizes = ['All', 'Small', 'Medium', 'Enterprise', 'Large Enterprise', 'Very Large Enterprise']

describe('SizeFilter component', () => {
  it("Filters by each size ('All', 'Small', 'Medium', 'Enterprise', 'Large Enterprise', and 'Very Large Enterprise')", () => {
    sizes.forEach((size) => {
      const onChangeStub = cy.stub().as('onChangeStub')

      cy.mount(<SizeFilter sizeFilter="All" onChange={onChangeStub} />)

      cy.get('[data-testid="filter"]').select(size)
      cy.get('[data-testid="filter"]').contains(size)
    })
  })
})
