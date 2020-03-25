/// <reference types="cypress" />


describe('React search bar & search actions', () => {

    it('app loads correctly and search renders', () => {
        window.cy.visit('localhost:3000');
        cy.get('[data-cy=pxb-toolbar] > .MuiToolbar-root-44').should('have.text', 'PresidentLeader of the Free World')
        cy.get('[data-cy=menu]').should('have.attr', 'data-cy').should('deep.equal', 'menu')
        cy.get('[data-cy=search-btn] > .MuiIconButton-label-53 > .MuiSvgIcon-root-57').click()
        cy.get('.MuiInputBase-input-129').type('bill clinton')
        cy.get('.MuiListItem-root-140').should('contain', 'Bill Clinton')
        cy.get('.MuiAppBar-colorDefault-14 > .MuiToolbar-root-44 > [tabindex="0"] > .MuiIconButton-label-53 > .MuiSvgIcon-root-57').click()
        cy.get('[data-cy=search-btn] > .MuiIconButton-label-53 > .MuiSvgIcon-root-57').click()
        cy.get('.MuiInputBase-input-129').type('ron')
        cy.get('.MuiListItem-root-140').should('contain', 'Ronald Reagan')
        cy.get('.MuiAppBar-colorDefault-14 > .MuiToolbar-root-44 > [tabindex="0"] > .MuiIconButton-label-53 > .MuiSvgIcon-root-57').click()

    });
});