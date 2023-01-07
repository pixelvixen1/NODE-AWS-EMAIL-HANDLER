/* eslint-disable max-len */
const BuildEmailController = require('../../../controllers/BuildEmailController');
const SendEmailController = require('../../../controllers/SendEmailController');
const UpdateModelController = require('../../../controllers/UpdateModelController');
const model = require('../../../model/model');
const config = require('../../../aws_config');

describe('Sending a predefined mock email template via Nodemailer for AWS SES SMTP', () => {
  const mockData = {
    email: 'name@example.com',
    subject: 'Test email',
    txtEmail: `Test email

    Test email account -  Self Assessment Online Solutions

    https://gds.gov.iq/

    Register your account

    Dear John Doe

    You have been invited to register an account with Self Assessment Online Solutions

    We’re just dropping by your inbox to let you know your account is ready for you to set up.

    Click on the button below to complete your registration and set up your account details.

    End of Mock text email
    `,
    htmlEmail:
    `<!DOCTYPE html>
<html lang="en-GB" xmlns:v="urn:schemas-microsoft-com:vml">

  <head>
    <meta charset="utf-8">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <!--[if (mso)|(mso 16)]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style type="text/css">
    body, table, td, a, span, td,th,div,p,a,h1,h2,h3,h4,h5,h6 { font-family: "Work Sans", Arial, Helvetica, sans-serif !important; }
    a {text-decoration: none;}
  </style>
  <![endif]-->
    <title>Verify your email</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" media="screen">
    <style>
      .hover-border-slate-btnhover:hover {
        border-color: #cf2e2e !important;
      }

      .hover-bg-slate-btnhover:hover {
        background-color: #cf2e2e !important;
      }

      .hover-text-slate-linkhover:hover {
        color: #fcb900 !important;
      }

      .hover-text-slate-linkhover2:hover {
        color: #0693e3 !important;
      }

      .hover-no-underline:hover {
        text-decoration: none !important;
      }

      @media screen {
        .all-font-work {
          font-family: "Work Sans", Arial, Helvetica, sans-serif !important;
        }
      }

      @media (max-width: 525px) {
        .sm-leading-32 {
          line-height: 32px !important;
        }
      }
    </style>
    <style>
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      @media (prefers-color-scheme: dark) {
        .dark-img {
          display: block !important;
          width: auto !important;
          overflow: visible !important;
          float: none !important;
          max-height: inherit !important;
          max-width: inherit !important;
          line-height: auto !important;
          margin-top: 0px !important;
          visibility: inherit !important;
        }

        .light-img {
          display: none;
          display: none !important;
        }
      }

      [data-ogsc] .dark-img {
        display: block !important;
        width: auto !important;
        overflow: visible !important;
        float: none !important;
        max-height: inherit !important;
        max-width: inherit !important;
        line-height: auto !important;
        margin-top: 0px !important;
        visibility: inherit !important;
      }

      [data-ogsc] .light-img {
        display: none;
        display: none !important;
      }
    </style>
  </head>

  <body style="margin: 0; width: 100%; padding: 0; word-break: break-word; -webkit-font-smoothing: antialiased;">
    <div style="display: none;">Please verify your email address to complete your account set up.
      <hiddenspace> &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &zwnj;
        &#160;&#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &zwnj;
        &#160;&#847; &#847; &#847; &#847; &#847; </hiddenspace>
    </div>
    <div role="article" aria-roledescription="email" aria-label="Verify your email" lang="en-GB">
      <table class="all-font-work" style="width: 100%;" border="0" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="center" style="background-color: #383838;" bgcolor="#383838">
            <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 600px;">
                  <tr>
                    <td align="center" valign="top">
                      <![endif]-->
            <table style="width: 100%; max-width: 600px;" border="0" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td align="center" style="padding: 30px; vertical-align: top;" valign="top">
                  &nbsp;
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
                    </td>
                  </tr>
                </table>
              <![endif]-->
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color: #383838; padding-left: 10px; padding-right: 10px;" bgcolor="#383838">
            <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 600px;">
                  <tr>
                    <td align="center" valign="top">
                      <![endif]-->
            <table style="width: 100%; max-width: 600px; border-top-left-radius: 4px; border-top-right-radius: 4px; background-color: #ffffff;" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td align="center" style="border-top-left-radius: 4px; border-top-right-radius: 4px; background-color: #ffffff; padding: 10px; padding-top: 20px; padding-bottom: 20px; vertical-align: top; line-height: 48px; color: #2e2f30;" bgcolor="#ffffff" valign="top">  
                      <a href="https://gds.gov.iq/" target="_blank" title="Government of Iraq">
                        <img class="light-img" src="https://d3vmikitb3xa6r.cloudfront.net/images/iraq-logo-200x276.png" alt="Government of Iraq" width="150" height="207" border="0" style="border: 0; max-width: 100%; vertical-align: middle; line-height: 100%;">
                      </a>
                      <!--[if !mso]><! -->
                      <div class="dark-img" style="display:none; overflow:hidden; float:left; width:0px; max-height:0px; max-width:0px; line-height:0px; visibility:hidden;" align="center">
                        <a href="https://gds.gov.iq/" target="_blank" title="Government of Iraq">
                          <img src="https://d3vmikitb3xa6r.cloudfront.net/images/iraq-logo-200x276.png" alt="Government of Iraq Logo" width="150" height="207" style="border: 0; max-width: 100%; vertical-align: middle; color: #ffffff; font-family: 'proxima_nova', Helvetica, Arial, sans-serif; text-align: center; font-weight: bold; font-size: 36px; line-height: 40px; text-decoration: none; margin: 0 auto; padding: 0;" border="0">
                        </a>
                      </div>
                      <!--<![endif]-->
                     </td>
                </tr>
                           </table>
            <!--[if (gte mso 9)|(IE)]>
                    </td>
                  </tr>
                </table>
              <![endif]-->
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color: #f0f3f5; padding-left: 10px; padding-right: 10px;" bgcolor="#f0f3f5">
            <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 600px; mso-line-height-rule: exactly; background-color: #ffffff;">
                  <tr>
                    <td align="center" valign="top">
                      <![endif]-->
            <table dir="ltr" style="width: 100%; max-width: 600px; background-color: #ffffff;" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" role="presentation"> 
                <tr>
                  <td dir="ltr" align="left" style="border-top-left-radius: 4px; border-top-right-radius: 4px; background-color: #ffffff; padding-left: 30px; padding-right: 30px; padding-top: 20px; vertical-align: top; line-height: 48px; color: #666666;" bgcolor="#ffffff" valign="top">
                    <h1 class="sm-leading-32" style="margin: 0; font-size: 36px; font-weight: 400;">Verify your email</h1>
                  </td>
                </tr>
              <tr>
                <td dir="ltr" align="left" style="background-color: #ffffff; padding-left: 30px; padding-right: 30px; padding-top: 20px; padding-bottom: 5px; line-height: 30px; color: #666666;" bgcolor="#ffffff">
                  <p style="margin: 0; font-size: 18px;">
                    Dear TEST EMAIL
                  </p>
                </td>
              </tr>
              <tr>
                <td dir="ltr" align="left" style="background-color: #ffffff; padding-left: 30px; padding-right: 30px; padding-bottom: 5px; padding-top: 10px; line-height: 30px; color: #666666;" bgcolor="#ffffff">
                  <p style="margin: 0; font-size: 16px;">
                    Welcome to Self Assesment online solutions.
                  </p>
                </td>
              </tr>
              <tr>
                <td dir="ltr" align="left" style="background-color: #ffffff; padding-left: 30px; padding-right: 30px; padding-top: 10px; padding-bottom: 10px; line-height: 30px; color: #666666;" bgcolor="#ffffff">
                  <p style="margin: 0; font-size: 16px;">
                    Please verify your email address to complete your account set up.
                  </p>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
                    </td>
                  </tr>
                </table>
              <![endif]-->
          </td>
        </tr> 
          <tr>
            <td align="center" style="background-color: #f0f3f5; padding-left: 10px; padding-right: 10px;" bgcolor="#f0f3f5">
              <!--[if (gte mso 9)|(IE)]>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 600px;">
                          <tr>
                            <td align="center" valign="top">
                              <![endif]-->
              <table dir="ltr" style="width: 100%; max-width: 600px; background-color: #ffffff;" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td dir="ltr" align="center" style="border-top-left-radius: 4px; border-top-right-radius: 4px; background-color: #ffffff; padding: 10px; vertical-align: top; line-height: 48px; color: #2e2f30;" bgcolor="#ffffff" valign="top">  
                      <img class="light-img" src="https://d3vmikitb3xa6r.cloudfront.net/images/contact3.gif" alt="Verify your email" width="130" height="130" border="0" style="border: 0; max-width: 100%; vertical-align: middle; line-height: 100%;">
                      <!--[if !mso]><! -->
                      <div class="dark-img" style="display:none; overflow:hidden; float:left; width:0px; max-height:0px; max-width:0px; line-height:0px; visibility:hidden;" align="center">
                        <img src="https://d3vmikitb3xa6r.cloudfront.net/images/email.png" alt="Verify your email" width="130" height="130" style="border: 0; max-width: 100%; vertical-align: middle; color: #ffffff; font-family: 'proxima_nova', Helvetica, Arial, sans-serif; text-align: center; font-weight: bold; font-size: 36px; line-height: 40px; text-decoration: none; margin: 0 auto; padding: 0;" border="0">
                      </div>
                      <!--<![endif]-->
                     </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
                            </td>
                          </tr>
                        </table>
                      <![endif]-->
            </td>
          </tr>
        <tr>
          <td align="center" style="background-color: #f0f3f5; padding-left: 10px; padding-right: 10px;" bgcolor="#f0f3f5">
            <!--[if (gte mso 9)|(IE)]>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 600px; mso-line-height-rule: exactly;">
                        <tr>
                          <td align="center" valign="top">
                            <![endif]-->
            <table dir="ltr" style="width: 100%; max-width: 600px; background-color: #ffffff;" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td dir="ltr" align="left" style="background-color: #ffffff; padding-left: 30px; padding-right: 30px; padding-top: 10px; padding-bottom: 10px; line-height: 30px; color: #666666;" bgcolor="#ffffff">
                  <p style="margin: 0; font-size: 16px;">
                    Verifying your email address is easy. Simply click on the button below to verify your email address for this account.
                  </p>
                </td>
              </tr>
              <tr>
                <td dir="ltr" align="left" style="background-color: #ffffff;" bgcolor="#ffffff">
                  <table style="width: 100%;" border="0" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td align="center" style="background-color: #ffffff; padding-left: 30px; padding-right: 30px; padding-top: 20px; padding-bottom: 60px;" bgcolor="#ffffff">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td dir="ltr" align="center" class="hover-bg-slate-btnhover all-font-work" style="display: inline-block; border-radius: 6px; background-color: #424345; padding-top: 15px; padding-bottom: 15px; padding-left: 25px; padding-right: 25px; font-size: 14px; font-weight: 500; text-transform: uppercase; color: #ffffff; text-decoration: none;" bgcolor="#424345">
                              <a href="https://dev.self-assessment.solutions?id&#x3D;38&amp;token&#x3D;9985effbdffae737a2ef49be625728f42d5fac9a022b54093d5992e33aa4b637" target="_blank" title="Verify your email address" class="all-font-work hover-border-slate-btnhover" style="display: inline-block; border-radius: 6px; font-size: 14px; font-weight: 500; text-transform: uppercase; color: #ffffff; text-decoration: none;">
                                Verify your email address</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
                          </td>
                        </tr>
                      </table>
                    <![endif]-->
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color: #f0f3f5; padding-left: 10px; padding-right: 10px;" bgcolor="#f0f3f5">
            <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellspacing="0" cellpadding="0" style="width: 600px; mso-line-height-rule: exactly;" role="presentation">
                  <tr>
                    <td align="center" valign="top">
                      <![endif]-->
            <table role="presentation" style="width: 100%; max-width: 600px; border-bottom-right-radius: 4px; border-bottom-left-radius: 4px; background-color: #424345;" bgcolor="#424345" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td dir="ltr" align="left" style="background-color: #424345; padding-left: 30px; padding-right: 30px; padding-bottom: 20px; padding-top: 40px; font-size: 17px; line-height: 32px; color: #ffffff;" bgcolor="#424345">
                  <h2 style="margin: 0; font-size: 17px; font-weight: 400;">If you&#x27;re having trouble clicking the &#x27;Verify your email address&#x27; button, copy and paste the URL below into your web browser</h2>
                </td>
              </tr>
              <tr>
                <td align="left" style="word-wrap: break-word; overflow-wrap: break-word; word-break: break-all; -ms-word-break: break-all; border-bottom-right-radius: 4px; border-bottom-left-radius: 4px; background-color: #424345; padding-left: 30px; padding-right: 30px; padding-bottom: 40px; font-size: 16px; line-height: 26px; color: #ffffff;" bgcolor="#424345">
                  <p style="display: inline-block; word-wrap: break-word; overflow-wrap: break-word; word-break: break-all; -ms-word-break: break-all; margin: 0; max-width: 500px; background-color: #424345;">
                    <a href="https://dev.self-assessment.solutions?id&#x3D;38&amp;token&#x3D;9985effbdffae737a2ef49be625728f42d5fac9a022b54093d5992e33aa4b637" target="_blank" title="Click or copy this link to verify your email address" style="display: inline-block; word-wrap: break-word; overflow-wrap: break-word; word-break: break-all; -ms-word-break: break-all; max-width: 500px; font-size: 13px; color: #f0f3f5; text-decoration: none;" class="hover-no-underline hover-text-slate-linkhover">
                      <span style="word-wrap: break-word; overflow-wrap: break-word; word-break: break-all; -ms-word-break: break-all; display: inline-block; max-width: 500px;">https://dev.self-assessment.solutions?id&#x3D;38&amp;token&#x3D;9985effbdffae737a2ef49be625728f42d5fac9a022b54093d5992e33aa4b637</span>
                    </a>
                  </p>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
                    </td>
                  </tr>
                </table>
              <![endif]-->
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color: #f0f3f5; padding-left: 10px; padding-right: 10px; padding-top: 30px;" bgcolor="#f0f3f5">
            <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 600px; mso-line-height-rule: exactly;">
                  <tr>
                    <td align="center" valign="top">
                      <![endif]-->
            <table style="width: 100%; max-width: 600px; border-top-left-radius: 4px; border-top-right-radius: 4px; border-bottom-right-radius: 4px; border-bottom-left-radius: 4px; background-color: #424345;" bgcolor="#424345" border="0" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td dir="ltr" align="center" style="border-top-left-radius: 4px; border-top-right-radius: 4px; background-color: #424345; padding: 30px; padding-bottom: 20px; font-size: 20px; line-height: 25px; color: #ffffff;" bgcolor="#424345">
                  <h2 style="margin: 0; font-size: 20px; font-weight: 500; text-transform: uppercase; color: #ffffff;"><span style="border-bottom: 2px solid #ffffff; padding-bottom:5px;">Contact us</span></h2>
                </td>
              </tr>
              <tr>
                <td dir="ltr" align="center" style="background-color: #424345; padding: 30px; padding-top: 10px; padding-bottom: 10px; font-size: 20px; line-height: 25px; color: #ffffff;" bgcolor="#424345">
                  <p style="margin: 0;">
                    <a href="mailto:support@self-assessment.solutions" target="_blank" title="support@self-assessment.solutions" class="hover-no-underline hover-text-slate-linkhover" style="font-size: 18px; color: #ffffff; text-decoration: none;">support@self-assessment.solutions</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td dir="ltr" align="center" style="border-bottom-right-radius: 4px; border-bottom-left-radius: 4px; background-color: #424345; padding: 30px; padding-top: 10px; padding-bottom: 30px; font-size: 20px; line-height: 25px; color: #f0f3f5;" bgcolor="#424345">
                  <p style="margin: 0; font-size: 15px; color: #f0f3f5; text-decoration: none;">101 Whitechapel High Street, 4th Floor, London, England, E1 7RA</p>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
                    </td>
                  </tr>
                </table>
              <![endif]-->
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color: #f0f3f5; padding-left: 10px; padding-right: 10px;" bgcolor="#f0f3f5">
            <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 600px; mso-line-height-rule: exactly;">
                  <tr>
                    <td align="center" valign="top">
                      <![endif]-->
            <table dir="ltr" style="width: 100%; max-width: 600px;" border="0" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td dir="ltr" align="left" style="background-color: #f0f3f5; padding: 20px; font-size: 14px; line-height: 18px; color: #666666;" bgcolor="#f0f3f5">
                  <p style="margin: 0;">
                      <a href="https://dev.self-assessment.solutions/en-GB/" target="_blank" class="hover-no-underline hover-text-slate-linkhover2" title="My Account" style="font-weight: 700; color: #2e2f30; text-decoration: underline;">My Account</a> -
                      <a href="https://dev.self-assessment.solutions/en-GB/user/create-account" target="_blank" class="hover-no-underline hover-text-slate-linkhover2" title="Website" style="font-weight: 700; color: #2e2f30; text-decoration: underline;">Website</a> -
                      <a href="mailto:support@self-assessment.solutions/" target="_blank" class="hover-no-underline hover-text-slate-linkhover2" title="Contact" style="font-weight: 700; color: #2e2f30; text-decoration: underline;">Contact</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td dir="ltr" align="left" style="background-color: #f0f3f5; padding: 20px; padding-top: 0; font-size: 12px; line-height: 20px; color: #777777;" bgcolor="#f0f3f5">
                  <p style="margin: 0;">
                    The information in this email and any attachments to it are confidential and may be legally privileged or prohibited from disclosure and unauthorised use.
                  </p>
                </td>
              </tr>
              <tr>
                <td dir="ltr" align="left" style="background-color: #f0f3f5; padding: 20px; padding-top: 0; font-size: 12px; line-height: 20px; color: #777777;" bgcolor="#f0f3f5">
                  <p style="margin: 0;">
                    Digital Solutions Limited is registered in England &amp; Wales No: 3455343
                  </p>
                </td>
              </tr>
              <tr>
                <td dir="ltr" align="left" style="background-color: #f0f3f5; padding: 20px; padding-top: 0; padding-bottom: 50px; font-size: 12px; line-height: 20px; color: #777777;" bgcolor="#f0f3f5">
                  <p style="margin: 0;">
                    © 2022 [Self Assessment Solutions] Digital Solutions Limited, All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
                    </td>
                  </tr>
                </table>
              <![endif]-->
          </td>
        </tr>
      </table>
    </div>
  </body>

    </html>`
  };

  test('Send mock email data and get success response back', async () => {
    const sendEmailResponse = await SendEmailController.sendEmail(
      mockData.email,
      mockData.subject,
      mockData.htmlEmail,
      mockData.txtEmail
    );
    expect(sendEmailResponse).toBeTruthy();
    expect(sendEmailResponse.accepted).toHaveLength(1);
    expect(sendEmailResponse.accepted).toContainEqual(mockData.email);
    expect(sendEmailResponse.response).toContain('250');
    expect(sendEmailResponse.envelope.to).toContainEqual(mockData.email);
    expect(sendEmailResponse.envelope.from).toContain(config.ses.FROM_EMAIL_ADDRESS);
  });

  test('Send mock email data without recipient and get correct error back', async () => {
    const sendEmailResponse = await SendEmailController.sendEmail('', mockData.subject, mockData.htmlEmail, mockData.txtEmail);
    expect(sendEmailResponse).toBeTruthy();
    expect(sendEmailResponse.message).toContain('No recipients defined');
  });

  test('Send mock email without data and get correct error back', async () => {
    const sendEmailResponse = await SendEmailController.sendEmail();
    expect(sendEmailResponse).toBeTruthy();
    expect(sendEmailResponse.message).toContain('Missing required data to send email');
  });
});

test('Test Full mock process - update model, build email and send email', async () => {
  // update model
  const user = {
    name: 'John Doe',
    email: 'name@example.com',
    templateId: 'register',
    language: 'en-GB',
    link: 'https://dev.test.com?id=38&token=9985effbdffae737a2ef49be625728f42d5facyshsjhjs',
  };

  const data = await UpdateModelController.setData(
    user.name,
    user.email,
    user.templateId,
    user.language,
    user.link
  );

  expect(data.user).toEqual({
    name: 'John Doe',
    email: 'name@example.com',
    templateId: 'register',
    language: 'en-GB',
    link: 'https://dev.test.com?id=38&token=9985effbdffae737a2ef49be625728f42d5facyshsjhjs',
    subject: 'Register',
  });

  expect(data.language).toEqual('en-GB');
  expect(data.dir).toEqual('ltr');
  expect(data.textDirection).toEqual('left');

  // build email
  const buildEmailResponse = await BuildEmailController.renderEmailTemplateByID('welcome');
  expect(buildEmailResponse).toEqual(200);
  expect(model.user.htmlEmail).toBeTruthy();
  expect(model.user.txtEmail).toBeTruthy();
  expect(model.user.htmlEmail).not.toEqual('');
  expect(model.user.txtEmail).not.toEqual('');

  // send email
  const sendEmailResponse = await SendEmailController.sendEmail(
    model.user.email,
    model.user.subject,
    model.user.htmlEmail,
    model.user.txtEmail
  );
  expect(sendEmailResponse).toBeTruthy();
  expect(sendEmailResponse.accepted).toHaveLength(1);
  expect(sendEmailResponse.accepted).toContainEqual(model.user.email);
  expect(sendEmailResponse.response).toContain('250');
  expect(sendEmailResponse.envelope.to).toContainEqual(model.user.email);
  expect(sendEmailResponse.envelope.from).toContain(config.ses.FROM_EMAIL_ADDRESS);
});
