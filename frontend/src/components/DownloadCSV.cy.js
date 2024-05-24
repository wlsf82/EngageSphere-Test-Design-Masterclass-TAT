/* global cy */

import * as React from 'react'
import DownloadCSVButton from './DownloadCSV'
import '../index.css'

const customers = [
  {
    id: 1,
    name: 'Customer 1',
    employees: 10,
    size: 'Small',
    contactInfo: { name: 'John1', email: 'john@example.com' },
    address: { street: '123 street', city: 'Noronha', state: 'PE', zipCode: '12345', country: 'BR' }
  },
  {
    id: 2,
    name: 'Customer 2',
    employees: 5,
    size: 'Small',
    contactInfo: { name: 'John2', email: 'john2@example.com' },
    address: { street: '123 st', city: 'Fortaleza', state: 'CE', zipCode: '12345', country: 'BR' }
  }
]

const filePath = 'cypress/downloads/customers.csv'

describe('DownloadCSVButton component', () => {
  it('Correctly downloads a list of customers as a CSV file', () => {
    cy.mount(<DownloadCSVButton customers={customers} />)
    cy.get('.download-csv-button').click()

    cy.readFile(filePath).then((csv) => {
      const lines = csv.split('\n')

      expect(lines[0]).to.equal('ID,Company_Name,Number_of_Employees,Size,Contact_Name,Contact_Email,Street,City,State,Zip_Code,Country')

      const customer1 = '"1","Customer 1","10","Small","John1","john@example.com","123 street","Noronha","PE","12345","BR"'
      const customer2 = '"2","Customer 2","5","Small","John2","john2@example.com","123 st","Fortaleza","CE","12345","BR"'

      expect(lines[1]).to.equal(customer1)
      expect(lines[2]).to.equal(customer2)
    })
  })
})
