const nodemailer = require('nodemailer');

class Mail {
    constructor(userName, password, to, symbol) {
	this.options = {
	    user: {
		name: userName,
		pass: password
	    },
	    mail: {
		from: userName,
		to: to,
		subject: 'Updated ' + symbol + ' Stock Price'
	    }
	};
    }

    send(body) {
	nodemailer.createTestAccount((err, account) => {
		let transporter = nodemailer.createTransport({
			service: "DebugMail",
			auth: {
			    user: this.options.user.name,
			    pass: this.options.user.pass
			}
		    });

		let mailOptions = {
		    from: this.options.mail.from,
		    to: this.options.mail.to,
		    subject: this.options.mail.subject,
		    text: body,
		    html: body
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
			    return console.log(error);
			}
			console.log('Message sent: %s', info.messageId);

			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		    });
	    });
    }
} 

module.exports = Mail;