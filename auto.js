let status;
let items;

loadStatus();

function loadStatus() {
  chrome.storage.sync.get(['status'], function (result) {
    console.log('SupremeBot enabled: ' + result.status);
    loadSave(result.status);
  });
}
function loadSave(_status) {
  chrome.storage.sync.get(['item'], function (result) {
    const res = JSON.parse(result.item);
    botting(_status, res);
  });
}

function botting(_status, _item) {
  console.log('Botting');
  let itemType = _item.itemType;
  let itemSize = _item.itemSize;
  let itemColor = _item.itemColor;
  let itemName = _item.itemName;
  if (window.location.href.includes('supremenewyork') && _status) {
    console.log('In Supreme & Enabled');

    if (
      window.location.href ==
      `https://www.supremenewyork.com/shop/all/${itemType}`
    ) {
      console.log('In ' + itemType);

      // Get all links with itemName
      let linksWithItemName = document.querySelectorAll('h1 > .name-link');
      let linksFiltered = [];
      console.log('Nodelist');
      console.log(linksWithItemName);
      console.log('One Node');
      console.log(linksWithItemName[0]);
      console.log('__________');
      linksWithItemName.forEach((link) => {
        if (link.innerText == itemName) {
          linksFiltered.push(link);
        }
      });

      console.log('Filtered links:' + linksFiltered);
      console.log('First Link');
      console.log(linksFiltered[0].href);
      console.log('End first link');

      let linkToRedirect;

      if (itemColor !== '') {
        linksFiltered.forEach((link) => {
          console.log(link);
          console.log(
            link.parentNode.parentNode.lastChild.firstChild.innerText
          );

          if (
            link.parentNode.parentNode.lastChild.firstChild.innerText.toLowerCase() ==
            itemColor.toLowerCase()
          ) {
            console.log('FOUND NODE');
            console.log(
              link.parentNode.parentNode.lastChild.firstChild.innerText
            );
            console.log('Link');
            console.log(link.parentNode.parentNode.lastChild.firstChild.href);
            linkToRedirect =
              link.parentNode.parentNode.lastChild.firstChild.href;

            // chrome.storage.sync.set({ link: link.parentNode.parentNode.lastChild.firstChild.href }, function () {
            //     console.log(`Link ${link.parentNode.parentNode.lastChild.firstChild.href} saved in LS`);
            //     // window.location.replace(link.parentNode.parentNode.lastChild.firstChild.href);
            // });
          }
        });
        if (linkToRedirect) {
          console.log('Color Found');
          chrome.storage.sync.set({ link: linkToRedirect }, function () {
            console.log(`Link ${linkToRedirect} saved in LS`);
            window.location.replace(linkToRedirect);
          });
        } else {
          console.log('Color not found => Picking the first one');
          chrome.storage.sync.set({ link: linksFiltered[0].href }, function () {
            console.log(`Link ${linksFiltered[0].href} saved in LS`);
            window.location.replace(linksFiltered[0].href);
          });
        }
      } else {
        console.log('Color is empty => Picking the first one');
        chrome.storage.sync.set({ link: linksFiltered[0].href }, function () {
          console.log(`Link ${linksFiltered[0].href} saved in LS`);
          window.location.replace(linksFiltered[0].href);
        });
      }
    } else if (window.location.href == 'https://www.supremenewyork.com/shop') {
      // window.location.replace("https://www.supremenewyork.com/shop/cart");
      window.location.replace('https://www.supremenewyork.com/checkout');
    } else if (
      window.location.href == 'https://www.supremenewyork.com/shop/cart'
    ) {
      window.location.replace('https://www.supremenewyork.com/checkout');
    } else if (
      window.location.href == 'https://www.supremenewyork.com/checkout'
    ) {
      // vyplnit
      console.log('V CHECKOUTU');
      //   Shipping Info
      chrome.storage.sync.get(['shippingInfo'], function (result) {
        // console.log(result.shippingInfo);
        document.querySelector('#order_billing_name').value =
          result.shippingInfo.fullName;
        document.querySelector('#order_email').value =
          result.shippingInfo.email;
        document.querySelector('#order_tel').value = result.shippingInfo.tel;
        document.querySelector('#bo').value = result.shippingInfo.address1;
        document.querySelector('#oba3').value = result.shippingInfo.address2;
        document.querySelector('#order_billing_city').value =
          result.shippingInfo.city;
        document.querySelector('#order_billing_zip').value =
          result.shippingInfo.postcode;
        document.querySelector('#order_billing_country').value =
          result.shippingInfo.country;
      });
      //   CC Info
      chrome.storage.sync.get(['ccInfo'], function (result) {
        // console.log(result.ccInfo);
        document.querySelector('#credit_card_type').value = result.ccInfo.brand;
        document.querySelector('#cnb').value = result.ccInfo.ccNumber;
        document.querySelector('#credit_card_month').value =
          result.ccInfo.ccMonth;
        document.querySelector('#credit_card_year').value =
          result.ccInfo.ccYear;
        document.querySelector('#vval').value = result.ccInfo.ccCVV;
      });
      console.log('Checking CLICKER');
      //   document.querySelector('#order_terms').checked = true;
      document.querySelectorAll('ins.iCheck-helper:nth-child(2)')[1].click();
    } else if (
      window.location.href.includes('https://www.supremenewyork.com/shop/')
    ) {
      chrome.storage.sync.get(['link'], function (result) {
        if (window.location.href == result.link) {
          console.log('Correct item');
          basketBtn = document.querySelector("input[name='commit']");
          sizeOption = document.querySelector("select[name='size']");
          if (sizeOption != null) {
            console.log(sizeOption);
            console.log(sizeOption.childNodes);
            const sizes = sizeOption.childNodes;
            sizes.forEach((size) => {
              // console.log("In Size foreach");
              // console.log(size);
              // console.log("end size foreach");

              if (size.tagName == 'OPTION') {
                sizeLower = size.innerText.toLowerCase();
                // console.log("sizeLower : " + sizeLower);
                if (sizeLower == itemSize) {
                  console.log('Correct found:' + size.innerText);
                  console.log(size.value);
                  sizeOption.value = size.value;
                  //   console.log('Delaying for 2sec');
                  basketBtn.form.submit();
                }
              }
            });
          } else {
            basketBtn.form.submit();
          }

          // basketBtn = document.querySelector("input[name='commit']");
          // console.log(basketBtn);
          // basketBtn.form.submit();
        }
      });
    }
  } else {
    console.log('Not on supremenewyork.com');
  }
}

// chrome.storage.sync.get(['item'], function (result) {
//     // chrome.storage.sync.get(['status'], function (result) {
//     // console.log('SupremeBot enabled: ' + result.status);
//     // console.log(result);
//     console.log(result.item);
//     status = result.status;
//     stage1(status);
// });

// function stage1(_status) {
//     console.log("inStage");
//     if (window.location.href.includes("supremenewyork") && _status) {
//         console.log("In Supreme");
//         // document.addEventListener("DOMContentLoaded", () => {
//         //     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         //         // if (tabs[0].id.includes("sweatshirts")) {
//         //         chrome.tabs.executeScript(
//         //             tabs[0].id,
//         //             {
//         //                 code: `
//         //                 if(window.location.href.includes("sweatshirts")){
//         //                     console.log("IN A SWEATSHIRT!");
//         //                     basketBtn = document.querySelector("input[name='commit']");
//         //                     console.log(basketBtn);
//         //                     basketBtn.form.submit();
//         //                 }

//         //                 else if (window.location.href === "https://www.supremenewyork.com/shop"){
//         //                     window.location.replace("https://www.supremenewyork.com/shop/cart");
//         //                 }
//         //                 else {
//         //                     console.log("NOT IN A SWEATSHIRT");
//         //                 }
//         //             `
//         //             });
//         //         // }

//         //     });
//         // })

//         // if (window.location.href == "https://www.supremenewyork.com/shop/all") {
//         //     itemmm = document.querySelectorAll(".inner-article");
//         //     linkArray = [];
//         //     itemmm.forEach(function (item) {
//         //         // console.log(item.children[0].href);
//         //         linkArray.push(item.children[0].href);
//         //     });
//         //     sweatshirts = [];
//         //     linkArray.forEach(function (link) {
//         //         if (link.includes("sweatshirts")) {
//         //             sweatshirts.push(link);
//         //         }

//         //     });

//         //     sweatshirts.forEach(function (ss) {
//         //         if (ss.includes("u8a9e0w4z")) {
//         //             window.location.replace(ss);
//         //             setTimeout(console.log("NEW PAGE?"), 3000);
//         //         }
//         //     });

//         //     console.log(sweatshirts);
//         // }

//         // else if (window.location.href.includes("https://www.supremenewyork.com")) {
//         //     if (window.location.href.includes("sweatshirts")) {
//         //         console.log("IN A SWEATSHIRT!");
//         //         basketBtn = document.querySelector("input[name='commit']");
//         //         console.log(basketBtn);
//         //         basketBtn.form.submit();
//         //     }

//         //     else if (window.location.href === "https://www.supremenewyork.com/shop") {
//         //         window.location.replace("https://www.supremenewyork.com/shop/cart");
//         //     }
//         //     else {
//         //         console.log("---");
//         //     }
//         // }

//         // startBtn.onclick = function (element) {
//         //     // let color = element.target.value;
//         //     console.log(element.url);
//         //     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         //         chrome.tabs.executeScript(
//         //             tabs[0].id,
//         //             {
//         //                 code: `
//         //             itemmm = document.querySelectorAll(".inner-article");
//         //             linkArray = [];
//         //             itemmm.forEach(function(item) {
//         //                 // console.log(item.children[0].href);
//         //                 linkArray.push(item.children[0].href);
//         //             });
//         //             sweatshirts = [];
//         //             linkArray.forEach(function(link){
//         //                 if(link.includes("sweatshirts")){
//         //                     sweatshirts.push(link);
//         //                 }

//         //             });

//         //             sweatshirts.forEach(function(ss) {
//         //                 if(ss.includes("u8a9e0w4z")){
//         //                     window.location.replace(ss);
//         //                     setTimeout(console.log("NEW PAGE?"),3000);
//         //                 }
//         //             });

//         //             console.log(sweatshirts);
//         //             ` });
//         //     });
//         // };
//     }

//     else if (!status) {
//     }

//     else {
//         console.log("Not on supremenewyork.com");
//     }
