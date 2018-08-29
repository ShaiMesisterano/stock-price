const Mail = require('./mail');
const request = require('request');
const rp = require('request-promise');
const nodemailer = require('nodemailer');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

class Stock {
    constructor(userName, password, to, symbol) {
	this.userName = userName;
	this.password = password;
	this.to = to;
	this.symbol = symbol;
	this.endpoint = `https://www.google.co.il/search?q=NASDAQ:${this.symbol}&stick=H4sIAAAAAAAAAONgecRoyi3w8sc9YSmdSWtOXmNU4-IKzsgvd80rySypFJLgYoOy-KR4uLj0c_UNzKtyinIqeAC5788qOgAAAA&sa=X&ved=2ahUKEwj-t7Tg7OXcAhUHL8AKHVrpClMQlDMwGHoECAUQBA&biw=1152&bih=624&dpr=1.25`;
    }

    getPrice() {
	rp(this.endpoint)
	    .then ( (body) => {
		    const mail = new Mail(this.userName, this.password, this.to, this.symbol);
		    mail.send(this.parseHtml(body)) 
		}
	    )
	    .catch( (err) => console.log(`ERROR: ${err}`) )  
	    }

    parseHtml(html) {
	const dom = new JSDOM(html);
	return dom.window.document.querySelector('*[style="font-size:157%"]').textContent;
    }
};

module.exports = Stock;