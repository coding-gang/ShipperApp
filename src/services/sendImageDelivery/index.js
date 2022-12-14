import { httpClient } from "@/helper/index";

export async function sendImageDelivery({ id, image, code }) {

  const reqParam = {
    id: id,
    image: image
  };
  let formBody = [];
  for (var property in reqParam) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(reqParam[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  try {
    return await httpClient.post(`send-image.html?code=${code}`, formBody);
  } catch (err) {
    return err;
  }
  
}
