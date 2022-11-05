import { httpClient } from '@/helper/index';

export async function login({ userName, password }) {
  const reqParam = {
    Username: userName,
    Password: password,
  };

  let formBody = [];
  for (var property in reqParam) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(reqParam[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');

  return httpClient.post('shipper-sign-in.html', formBody);
}

export async function loginByFetch({ userName, password }) {
  const reqParam = {
    Username: userName,
    Password: password,
  };

 let formBody =new URLSearchParams();
 for (var property in new FormData(reqParam)) {
  //  const encodedKey = encodeURIComponent(property);
  //  const encodedValue = encodeURIComponent(reqParam[property]);
   formBody.append(property[0], property[1]);
 }
//  formBody = formBody.join("&");

  const response = await fetch('http://devship.vn/web-api/shipper-sign-in.html', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body:formBody
  });
 return response; 
}