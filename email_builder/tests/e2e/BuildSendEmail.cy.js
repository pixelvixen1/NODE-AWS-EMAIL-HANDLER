/* eslint-disable prefer-arrow-callback */
describe('Build and send email', () => {
  beforeEach(() => {
    cy.viewport(1000, 750);
    cy.visit('http://localhost:4000/');
  });

  it('Post user data to Mock API Lambda to Build and Send password-changed email template in English', () => {
    const user = {
      templateId: 'password-changed',
      data: {
        name: 'Cypress Test',
        email: 'name@example.com',
      },
      language: 'en-GB',
      link: 'https://dev.test.com?id=38&token=9985effbdffae737a2ef49be625728f42d5facyshsjhjs'
    };

    cy.request('POST', 'http://localhost:4000/aws/build-email', user).then((response) => {
      expect(response).property('status').to.equal(200);
      expect(response).property('statusText').to.equal('OK');
      expect(response).property('body').to.contain(`Success : data recieved from AWS for user ${user.data.name} with template id = ${user.templateId}`);
    });

    cy.wait(1000);

    cy.visit('http://localhost:4000/aws/user-email');
    cy.title().should('eq', 'Password Changed');
    cy.get('.sm-leading-32').should('have.text', 'Your password has been changed');

    // get data model text used in email and check correct data has rendered
    cy.request('GET', 'http://localhost:4000/aws/cms')
      .its('body')
      .as('cmsdata')
      .then(function (response) {
        expect(response).property('HEADER').to.equal('Your password has been changed');
        cy.get('.sm-leading-32').contains(this.cmsdata.HEADER);
        cy.get(':nth-child(3) > [align="center"] > table > tbody > :nth-child(3) > td > p').contains(this.cmsdata.BODY_COPY_1);
        cy.get(':nth-child(3) > [align="center"] > table > tbody > :nth-child(4) > td > p').contains(this.cmsdata.BODY_COPY_2);
        cy.get('[style="width: 100%; max-width: 600px; background-color: #ffffff;"] > :nth-child(1) > :nth-child(1) > td > p').contains(this.cmsdata.BODY_COPY_3);
        cy.get('.hover-bg-slate-btnhover > .all-font-work').contains(this.cmsdata.BUTTON_LABEL);
        cy.get(':nth-child(6) > [align="center"] > table > tbody > :nth-child(1) > td > h2').contains(this.cmsdata.HELP_TEXT);
        cy.get('.hover-no-underline > span').contains(user.link);
      });
  });
});
