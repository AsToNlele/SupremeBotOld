const spanValid = document.querySelector('#valid');
const saveBtn = document.querySelector('#save');
const shippingInfoBtn = document.querySelector('#saveShippingInfo');
const ccInfoBtn = document.querySelector('#saveCCInfo');

let shippingInfo = {
  fullName: '',
  email: '',
  tel: '',
  address1: '',
  address2: '',
  city: '',
  postcode: '',
  country: '',
};

let ccInfo = {
  brand: '',
  ccNumber: '',
  ccMonth: '',
  ccYear: '',
  ccCVV: '',
};

// chrome.storage.sync.get('url', function (data) {
//   document.querySelector('#urlBar').value = data.url;
// });

chrome.storage.sync.get('shippingInfo', function (data) {
  document.querySelector('#fullName').value = data.shippingInfo.fullName;
  document.querySelector('#email').value = data.shippingInfo.email;
  document.querySelector('#tel').value = data.shippingInfo.tel;
  document.querySelector('#address1').value = data.shippingInfo.address1;
  document.querySelector('#address2').value = data.shippingInfo.address2;
  document.querySelector('#city').value = data.shippingInfo.city;
  document.querySelector('#postcode').value = data.shippingInfo.postcode;
  document.querySelector('#country').value = data.shippingInfo.country;
});

chrome.storage.sync.get('ccInfo', function (data) {
  document.querySelector('#brand').value = data.ccInfo.brand;
  document.querySelector('#ccNumber').value = data.ccInfo.ccNumber;
  document.querySelector('#ccMonth').value = data.ccInfo.ccMonth;
  document.querySelector('#ccYear').value = data.ccInfo.ccYear;
  document.querySelector('#ccCVV').value = data.ccInfo.ccCVV;
});

const saveShippingInfo = () => {
  shippingInfo = {
    fullName: document.querySelector('#fullName').value,
    email: document.querySelector('#email').value,
    tel: document.querySelector('#tel').value,
    address1: document.querySelector('#address1').value,
    address2: document.querySelector('#address2').value,
    city: document.querySelector('#city').value,
    postcode: document.querySelector('#postcode').value,
    country: document.querySelector('#country').value,
  };
  chrome.storage.sync.set({ shippingInfo: shippingInfo }, () => {
    console.log(shippingInfo);
  });
};

const saveCCInfo = () => {
  ccInfo = {
    brand: document.querySelector('#brand').value,
    ccNumber: document.querySelector('#ccNumber').value,
    ccMonth: document.querySelector('#ccMonth').value,
    ccYear: document.querySelector('#ccYear').value,
    ccCVV: document.querySelector('#ccCVV').value,
  };
  chrome.storage.sync.set({ ccInfo: ccInfo }, () => {
    console.log(ccInfo);
  });
};

const saveURL = () => {
  // let url = document.querySelector('#urlBar').value;
  // let isValid = validateURL(url);
  // URL invalid
  // if (!isValid) {
  //   spanValid.innerHTML = 'Error! URL is not valid.';
  // }
  // URL valid
  // else {
  //   spanValid.innerHTML = 'Success! URL saved.';
  //   chrome.storage.sync.set({ url: url }, () => {
  //     console.log(`Saved ${url} in localStorage`);
  //   });
  // }
};
// const validateURL = value => {
//   return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
//     value
//   );
// };

shippingInfoBtn.onclick = () => saveShippingInfo();
ccInfoBtn.onclick = () => saveCCInfo();
// saveBtn.onclick = () => saveURL();
