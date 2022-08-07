import RNPrint from 'react-native-print';

const print = async (htmlString) => {
  const html = htmlString
  await RNPrint.print({
    html: html
  })
};

export default function PrintOrderInfomation(htmlString = "<html></html>") {
  print(htmlString);
}
