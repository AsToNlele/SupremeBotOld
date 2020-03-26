const startBtn = document.querySelector('#startBtn');
const saveBtn = document.querySelector('#saveBtn');
const credsBtn = document.querySelector('#credsBtn');


const sbStatus = document.querySelector('#sbEnabled');

const itemType = document.querySelector('#itemType');
const itemSize = document.querySelector('#itemSize');
const itemColor = document.querySelector('#itemColor');
const itemName = document.querySelector('#itemName');

// Check if enabled or disabled in LS
document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get(['status'], function (result) {
        result.status ? sbStatus.checked = true : sbStatus.checked = false;
    });
    chrome.storage.sync.get(['item'], function (result) {
        console.log(result);
        let res = JSON.parse(result.item);
        console.log(res);
        itemType.value = res.itemType;
        itemSize.value = res.itemSize;
        itemColor.value = res.itemColor;
        itemName.value = res.itemName;
    });

});


// Update status in LS
sbStatus.addEventListener("click", () => {
    if (sbStatus.checked) {
        chrome.storage.sync.set({ status: true }, function () {
            console.log('Value is set to ' + true);
        });

    }
    else {
        chrome.storage.sync.set({ status: false }, function () {
            console.log('Value is set to ' + false);
        });
    }
});

startBtn.onclick = function (element) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {
                code: `window.location.replace("https://www.supremenewyork.com/shop/all/${itemType.value}")`
            });
    });
};

saveBtn.addEventListener("click", () => {
    let data =
    {
        "ID": "1",
        "itemType": itemType.value,
        "itemSize": itemSize.value,
        "itemColor": itemColor.value,
        "itemName": itemName.value,
        "itemNew": true
    };

    chrome.storage.sync.set({ item: JSON.stringify(data) }, function () {
    });
});

// credsBtn.addEventListener("click", () => {
//     chrome.tabs.create({ url: chrome.runtime.getURL("checkout.html") });
// })

