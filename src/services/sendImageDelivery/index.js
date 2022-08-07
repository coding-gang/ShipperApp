import { httpClient } from "@/helper/index";

export async function sendImageDelivery({ id, image }) {

  const reqParam = {
    id: id,
    image: image
  };

  try {
    return await httpClient.post("send-image.html", reqParam);
  } catch (err) {
    return err;
  }c 
}
