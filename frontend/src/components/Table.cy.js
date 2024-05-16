import React from 'react'
import Table from './Table'
import Customers from '../../../cypress/fixtures/customers'

describe('<Table />', () => {
  it('Mostra uma lista de clientes quando há dados no banco de dados', () => {
    cy.mount(<Table customers={Customers} />)
    cy.get('table').should('be.visible')
  })
  it.skip('Pega elemento de loading', () => {
    //nao consegui em nivel de componente
    const clientes = []
    cy.intercept(
      'GET',
      'http://localhost:3001/customers',
      {
        delay: 5000
      }
    ).as('getcustomers')
    cy.getCustomers({ size: 'All' }).then(({ body }) => {
      body.customers.forEach(element => {
        clientes.push(element)
      });
    })
    cy.get('p:contains(Loading...)')
      .should('be.visible')
    cy.get('.loading-icon')
      .should('be.visible')
    cy.wait('@getcustomers')
    cy.mount(<Table customers={clientes} />)
  })
  it('Ordena por Número de funcionários em ordem ascendente', () => {
    cy.mount(<Table customers={Customers} />)
    cy.contains('button', 'Number of employees ').click().click()
    cy.get('tbody').find('tr').eq(0).find('td').eq('2').then($qty1 => {
      const qty1toInt = parseInt($qty1[0].textContent)
      cy.get('tbody').find('tr').eq(Customers.length - 1).find('td').eq('2').then($qty2 => {
        const qty2toInt = parseInt($qty2[0].textContent)
        expect(qty2toInt).to.be.greaterThan(qty1toInt)
      })
    })
  })
  it('Ordena por Número de funcionários em ordem descendente', () => {
    cy.mount(<Table customers={Customers} />)
    cy.contains('button', 'Number of employees ').click()
    cy.get('tbody').find('tr').eq(0).find('td').eq('2').then($qty1 => {
      const qty1toInt = parseInt($qty1[0].textContent)
      cy.get('tbody').find('tr').eq(Customers.length - 1).find('td').eq('2').then($qty2 => {
        const qty2toInt = parseInt($qty2[0].textContent)
        expect(qty1toInt).to.be.greaterThan(qty2toInt)
      })
    })
  })
  it('Ordena por Tamanho em ordem ascendente', () => {
    cy.mount(<Table customers={Customers} />)
    cy.contains('button', 'Size').click()
    cy.contains('span', '↑').should('be.visible')
    cy.get('tbody').find('tr').eq(0).find('td').eq('3').should('have.text', 'Small')
    cy.get('tbody').find('tr').eq(Customers.length - 1).find('td').eq('3').should('have.text', 'Very Large Enterprise')
  })
  it('Ordena por Tamanho em ordem descendente por padrão', () => {
    cy.mount(<Table customers={Customers} />)
    cy.contains('span', '↓').should('be.visible')
    cy.get('tbody').find('tr').eq(0).find('td').eq('3').should('have.text', 'Very Large Enterprise')
    cy.get('tbody').find('tr').eq(Customers.length - 1).find('td').eq('3').should('have.text', 'Small')
  })
  it('Ordena em ordem descendente por padrão ao mudar a coluna de ordenação', () => {
    cy.mount(<Table customers={Customers} />)
    cy.contains('button', 'Number of employees').click()
    cy.get('tbody').find('tr').eq(0).find('td').eq('2').then($qty1 => {
      const qty1toInt = parseInt($qty1[0].textContent)
      cy.get('tbody').find('tr').eq(Customers.length - 1).find('td').eq('2').then($qty2 => {
        const qty2toInt = parseInt($qty2[0].textContent)
        expect(qty1toInt).to.be.greaterThan(qty2toInt)
      })
    })
  })
})
