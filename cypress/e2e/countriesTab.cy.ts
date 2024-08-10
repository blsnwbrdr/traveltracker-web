// import testData from '../fixtures/testData.json';

describe('Countries Tab', () => {
  it('loads header', () => {
    cy.visit('/');
    cy.fixture('testData').then((data) => {
      cy.get('h1').should('have.text', data.header);
    });
  });

  it('loads country button text', () => {
    cy.visit('/');
    cy.fixture('testData').then((data) => {
      cy.contains(data.country).click();
    });
  });

  it('loads country data', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '/assets/data/*',
      },
      []
    ).as('getCountryData');
    cy.visit('/');
    cy.wait('@getCountryData').then((data) => {
      assert.isNotNull(data, 'API has data');
    });
  });
});
