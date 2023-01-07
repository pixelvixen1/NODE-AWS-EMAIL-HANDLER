class CreateTransportClass {
  sendMail(options) {
    const success = {
      accepted: [options.to],
      rejected: [],
      envelopeTime: 159,
      messageTime: 327,
      messageSize: 27244,
      response: '250 Ok 010201819ab3682a-8a9a6442-6822-4e64-a65d-54561c87b79f-000000',
      envelope: {
        from: options.from,
        to: [options.to]
      },
      messageId: '<8847f82b-169a-740e-be4d-843772ef10b5@self-assessment.solutions>',
      mockData: 'MOCK NODEMAILER EMAIL SENT'
    };

    const error = {
      message: 'No recipients defined'
    };

    return options.to ? success : error;
  }
}

const createTransport = () => new CreateTransportClass();

module.exports = {
  createTransport
};
