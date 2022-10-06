import { httpClient } from "@/helper/index";

export async function endTrip({ moneyStr, code }) {
  const reqParam = {
    money: moneyStr,
    code: code,
  };

  try {
    return await httpClient.get("end-trip.html", reqParam);
  } catch (err) {
    return err;
  }
}

export async function endTripTransfer({ transferMoney, transferImage,moneyStr="0",code}) {
  const postParam = {
    TransferMoney: transferMoney,
    TransferImage: transferImage
  };

  let formBody = [];
  for (var property in postParam) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(postParam[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  try {
    return await httpClient.post(`end-trip.html?money=${moneyStr}&code=${code}`, formBody);
  } catch (err) {
    return err;
  }
}
