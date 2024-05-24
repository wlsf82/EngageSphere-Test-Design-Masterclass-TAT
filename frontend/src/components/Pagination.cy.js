/* global cy */

import * as React from 'react'
import Pagination from './Pagination'
import '../index.css'

describe('Pagination component', () => {
  it('Disables the Prev pagination button when on the first page', () => {
    cy.mount(<Pagination currentPage={1} paginationInfo={{ totalPages: 5, limit: 10 }} onClickPrev={() => {}} />)
    cy.get('[data-testid="pagination"]').within(() => {
      cy.get('button').contains('Prev').should('be.disabled')
    })
  })
  it('Disables the Next pagination button when on the last page', () => {
    cy.mount(<Pagination currentPage={5} paginationInfo={{ totalPages: 5, limit: 10 }} onClickNext={() => {}} />)
    cy.get('[data-testid="pagination"] button').contains('Next').should('be.disabled')
  })

  it("Disables both the Prev and Next pagination buttons when there's only one page", () => {
    cy.mount(<Pagination currentPage={1} paginationInfo={{ totalPages: 1, limit: 50 }} onClickPrev={() => {}} onClickNext={() => {}} />)
    cy.get('[data-testid="pagination"] button').contains('Prev').should('be.disabled')
    cy.get('[data-testid="pagination"] button').contains('Next').should('be.disabled')
  })
  it('Leaves both the Prev and Next pagination buttons enabled when on a middle page (e.g., Page 2 of 3)', () => {
    cy.mount(<Pagination currentPage={2} paginationInfo={{ totalPages: 3, limit: 10 }} onClickPrev={() => {}} onClickNext={() => {}} />)
    cy.get('[data-testid="pagination"] button').contains('Prev').should('be.enabled')
    cy.get('[data-testid="pagination"] button').contains('Next').should('be.enabled')
  })
  it('Shows "Page 1 of n" (where n is the number of pages)', () => {
    const totalPages = 4
    cy.mount(<Pagination currentPage={1} paginationInfo={{ totalPages, limit: 10 }} onChange={() => {}} />)
    cy.get('[data-testid="pagination"]').should('contain.text', `Page 1 of ${totalPages}`)
  })
  it('Configures a new pagination limit (e.g., from 10 to 50), ensuring it persists in the localstorage', () => {
    cy.mount(
      <Pagination
        currentPage={1}
        paginationInfo={{ totalPages: 5, limit: 10 }}
        onChange={() => {
          window.localStorage.setItem('paginationLimit', '50')
        }}
      />
    )

    cy.get('[data-testid="pagination"] select').select('50')
    cy.window().then((win) => {
      expect(win.localStorage.getItem('paginationLimit')).to.equal('50')
    })
  })
})
