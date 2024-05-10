import React from 'react'
import DownloadCSVButton from './DownloadCSV'

describe('<DownloadCSVButton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    const clientes = []
cy.chamaClientes({size: 'All'}).then(({body}) => {
  body.customers.forEach(element => {
    clientes.push(element)
});
cy.mount(<DownloadCSVButton customers={clientes}/>)
cy.contains('Download CSV').click()
cy.readFile('cypress/downloads/customers.csv').should('exist')
  })
})
})