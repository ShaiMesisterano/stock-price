const Stock = require('./Stock');

const init = ( () => {
    const userName = process.argv[2];
    const password = process.argv[3];
    const to = process.argv[4];
    const symbol = process.argv[5];

    const stock = new Stock(userName, password, to, symbol); 
    stock.getPrice();

})();