import { httpClient } from "@/helper/index";

export async function sendCallLog({ number, time }) {
  const reqParam = {
    number: number,
    time: time,
  };

  try {
    return await httpClient.get("send-call-log.html", reqParam);
  } catch (err) {
    return err;
  }
}
