import { httpClient } from "@/helper/index";

export async function sendCallLog({ number, time, code }) {
  const reqParam = {
    number: number,
    time: time,
    code: code
  };

  try {
    return await httpClient.get("send-call-log.html", reqParam);
  } catch (err) {
    return err;
  }
}
