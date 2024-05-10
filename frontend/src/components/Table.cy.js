import React from 'react'
import Table from './Table'

describe('<Table />', () => {
  it('Mostra uma lista de clientes quando há dados no banco de dados', () => {
    const clientes = []
    cy.chamaClientes({size: 'All'}).then(({body}) => {
    body.customers.forEach(element => {
      clientes.push(element)
  });
  })
    cy.mount(<Table customers={clientes}/>)
    cy.get('table').should('be.visible')
  })

  it.skip('Pega elemento de loading',() =>{
    //nao consegui em nivel de componente
    const clientes = []
    cy.intercept(
      'GET',
      'http://localhost:3001/customers',
      {
        delay:5000
      }
    ).as('getcustomers')
    
    cy.chamaClientes({size: 'All'}).then(({body}) => {
    body.customers.forEach(element => {
      clientes.push(element)
  });
  })
    cy.get('p:contains(Loading...)')
    .should('be.visible')
    cy.get('.loading-icon')
      .should('be.visible')
    cy.wait('@getcustomers')
    cy.mount(<Table customers={clientes}/>)
  })

  it('Ordena por Número de funcionários em ordem ascendente',() =>{
    const clientes = []
    cy.chamaClientes({size: 'All'}).then(({body}) => {
    body.customers.forEach(element => {
      clientes.push(element)
  });
  cy.mount(<Table customers={clientes}/>)
  cy.contains('button','Number of employees ').click().click()
  cy.contains('span','↑').should('be.visible')
  })
})
it('Ordena por Número de funcionários em ordem descendente',() =>{
  const clientes = []
  cy.chamaClientes({size: 'All'}).then(({body}) => {
  body.customers.forEach(element => {
    clientes.push(element)
});
cy.mount(<Table customers={clientes}/>)
cy.contains('button','Number of employees ').click()
cy.contains('span','↓').should('be.visible')
})
})

it('Ordena por Tamanho em ordem ascendente',() =>{
  const clientes = []
  cy.chamaClientes({size: 'All'}).then(({body}) => {
  body.customers.forEach(element => {
    clientes.push(element)
});
cy.mount(<Table customers={clientes}/>)
cy.contains('button','Size').click()
cy.contains('span','↑').should('be.visible')
})
})

it('Ordena por Tamanho em ordem descendente por padrão',() =>{
  const clientes = []
  cy.chamaClientes({size: 'All'}).then(({body}) => {
  body.customers.forEach(element => {
    clientes.push(element)
});
cy.mount(<Table customers={clientes}/>)
cy.contains('span','↓').should('be.visible')
})
})

it('Ordena em ordem descendente por padrão ao mudar a coluna de ordenação',() =>{
  const clientes = []
cy.chamaClientes({size: 'All'}).then(({body}) => {
  body.customers.forEach(element => {
    clientes.push(element)
});
})
cy.mount(<Table customers={clientes}/>)
cy.contains('button','Number of employees').click()
cy.contains('span','↓').should('be.visible')
})
})

