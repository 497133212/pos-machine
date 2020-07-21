const main = require('../main');

describe('print receipt', () => {
    it('should print receipt to console correctly when print receipt given multiple barcodes',
        () => {
            const barcodes = [
                'ITEM000000',
                'ITEM000000',
                'ITEM000000',
                'ITEM000000',
                'ITEM000000',
                'ITEM000001',
                'ITEM000001',
                'ITEM000004'
            ];

            const expectReceipt = `
***<store earning no money>Receipt ***
Name: Coca-Cola, Quantity: 5, Unit price: 3 (yuan), Subtotal: 15 (yuan)
Name: Sprite, Quantity: 2, Unit price: 3 (yuan), Subtotal: 6 (yuan)
Name: Battery, Quantity: 1, Unit price: 2 (yuan), Subtotal: 2 (yuan)
----------------------
Total: 23 (yuan)
**********************`


            console.log = jest.fn();

            main.printReceipt(barcodes);

            expect(console.log).toHaveBeenCalledWith(expectReceipt);
        });
});
