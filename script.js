let participantData = {};

fetch('participants.json')
  .then(response => response.json())
  .then(data => {
    participantData = data.reduce((acc, item) => {
      acc[item.ID] = item;
      return acc;
    }, {});
  });

function onScanSuccess(decodedText, decodedResult) {
  const info = participantData[decodedText];
  const resultDiv = document.getElementById('result');
  if (info) {
    resultDiv.innerHTML = `<h2>ようこそ ${info.名前} さん</h2><p>テーブル番号: ${info.テーブル番号}</p>`;
  } else {
    resultDiv.innerHTML = `<p>参加者情報が見つかりません: ${decodedText}</p>`;
  }
}

const html5QrcodeScanner = new Html5QrcodeScanner(
  "reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess);
