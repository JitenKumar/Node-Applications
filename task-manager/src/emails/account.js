const sgMail = require("@sendgrid/mail");


sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  const msg = {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: "Thanks for joining in ",
    text: `Welcome to the App, ${name} . Let me know how we can help you.`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email Sent");
    })
    .catch((error) => {
      console.log(error);
    });
};

const sendCancelEmail = (email, name) => {
    const msg = {
      to: email,
      from: process.env.EMAIL_FROM,
      subject: "We are Sorry To Let yo Go",
      text: `We are Sorry To Let yo Go. Is there is anything we can do to keep you happy?`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email Sent For Cancellation");
      })
      .catch((error) => {
        console.log(error);
      });
  };

module.exports = {
  sendWelcomeEmail,
};
