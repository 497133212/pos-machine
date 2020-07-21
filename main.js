function printReceipt(barcodes) {
    let itemDetails = decodeBarcodes(barcodes);
    let itemDetailsWithTotalPrice = calculateSubtotalPrice(itemDetails);
    let totalPrice = calculateTotalPrice(itemDetailsWithTotalPrice);
    let receipt = formatReceipt(itemDetailsWithTotalPrice, totalPrice);
    console.log(receipt)
}

function dataBase() {
    let data =  [
        {
            barcode: 'ITEM000000',
            name: 'Coca-Cola',
            price: 3
        },
        {
            barcode: 'ITEM000001',
            name: 'Sprite',
            price: 3
        },
        {
            barcode: 'ITEM000002',
            name: 'Apple',
            price: 5
        },
        {
            barcode: 'ITEM000003',
            name: 'Litchi',
            price: 15
        },
        {
            barcode: 'ITEM000004',
            name: 'Battery',
            price: 2
        },
        {
            barcode: 'ITEM000005',
            name: 'Instant Noodles',
            price: 4
        }
    ];
    return data;
}

function decodeBarcodes(barcodes) {
    let items = [];
    let barcode = '';
    let hasCode = '';
    for (let index = 0; index < barcodes.length; index++) {
        if(hasCode.indexOf(barcodes[index])>=0) {
            continue;
        }
        hasCode += barcodes[index];
        barcode = barcodes[index];
        let quantity = 0;
        barcodes.forEach(e => {
            if(e===barcode) {
                quantity++;
            }
        });
        items.push({barcode:barcode,quantity:quantity});
    }
    let itemDetails = loadAllItem(items);
    return itemDetails;
}

function loadAllItem(items) {
    let itemDetails = [];
    let itemData = dataBase();
    items.forEach(item => {
        let data = itemData.find((data) =>
            item.barcode === data.barcode
        )
        item = Object.assign(item, data);
        itemDetails.push(item);
    });
    return itemDetails;
}

function calculateSubtotalPrice(itemDetails) {
    itemDetails.forEach(e => {
        e.totalPrice = e.quantity * e.price;
    });
    return itemDetails;
}

function calculateTotalPrice(itemDetailsWithTotalPrice) {
    let totalPrice = 0;
    itemDetailsWithTotalPrice.forEach(e => {
        totalPrice = totalPrice + e.totalPrice;
    });
    return totalPrice;
}

function formatReceipt(itemDetailsWithTotalPrice, totalPrice) {
    let receiptInfo = '';
    let receipt = '';
    for (let i = 0; i < itemDetailsWithTotalPrice.length; i++) {
        const e = itemDetailsWithTotalPrice[i];
        receiptInfo = receiptInfo + `Name: ${e.name}, Quantity: ${e.quantity}, Unit price: ${e.price} (yuan), Subtotal: ${e.totalPrice} (yuan)`;
        if(i < itemDetailsWithTotalPrice.length-1) {
            receiptInfo += '\n';
        }
    }
    receipt = `
***<store earning no money>Receipt ***
${receiptInfo}
----------------------
Total: ${totalPrice} (yuan)
**********************`;
    console.log(receipt);
}


module.exports = {
    printReceipt
};