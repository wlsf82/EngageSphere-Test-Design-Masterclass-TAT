import React from 'react'
import DownloadCSVButton from './DownloadCSV'
import Customers from '../../../cypress/fixtures/customers'

describe('<DownloadCSVButton />', () => {
  it('renders', () => {
    cy.mount(<DownloadCSVButton customers={Customers} />)
    cy.readFile('cypress/fixtures/download.csv').then((content) => {
      cy.contains('Download CSV').click()
      cy.readFile('cypress/downloads/customers.csv').should('exist').and('contain', content)
    })
  })
})