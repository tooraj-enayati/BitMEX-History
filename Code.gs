//
// Developed by Tooraj Enayati
// Copying and distribution is promitted as long as credits are given
// Donation are greatly appreciated
//         BTC: 3QSSMwKuoS4wRJQCNofnqBVitpheBDPx8w
//         ETH: 0x5d883ef2ddac91034186b732cd1126cdb5d2c0f4
//         LTC: MBsbj8q38seA3Pk6tZk1WY7DkFRf2Yf6x1
// Twitter: @tooraj_enayati
// Telegram: ToorajEnayati
// Email: tooraj@isc.com.au
// Discord: tooraj#7318
//
//--------------------
// How to Use instructions:
//
// This script will add a menu item to your Google Sheet to get BitMEX account history.
// You can select the menu option to download your history as many time as you want.
//--------------------
// How to Setup Instructions:
//
// Create sheet called "Settings"
// Add a row for each bot with the following headings - currently rows 1-2 and columns 1-5 are all ignored and only columns 6 & 7 are used.
//
// Configuration						
// Name<tab>Description<tab>Exchange<tab>Currency<tab>Download Limit<tab>API Key<tab>API Secret
// BOT1<tab>Short Bot<tab>BitMEX<tab>XBT<tab>100<tab><your key><tab><your secret>
// BOT2<tab>Long Bot<tab>BitMEX<tab>XBT<tab>100<tab><your key><tab><your secret>				
//
// Use the Tool > Script Editor for you Google Sheet to add all of this to the editor, the save it.
// Save it all, the close and reopen you Google Sheet. You will be prompted to give the scrip run permissions.
// Once the permissions are granted, you should see see a "Get BitMEX History" menu option - USE IT :)
//--------------------
// Future enhancements:
// 1) Call the BitMEXGetHistory() for each bot/row
// 2) Use the "Download Limit" column for getting the history for more than 100
// 3) Use the "Currency" column for getting the history for other currencies
// 4) Use the "Exchange" column for getting the history from other exchanges
//
function onOpen() {
  createMenu();
}


function createMenu() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('Get BitMEX History')
      .addItem('Download History', 'GetHistory')
      .addItem('About', 'about')
      .addToUi();
}


function GetHistory() {

  // Read the settings for each bot and call BitMEXGetHistory() for each one
  //
  // sheetConf: The name of the configuration sheet to read from
  //
  var ss = SpreadsheetApp.getActive();
  var notBlank=true, i=3;
  var sheetConf = "Settings"
  
  // For each bot listed in settings; get the API keys from the sheet
  while (notBlank){
    var botName = ss.getSheetByName(sheetConf).getRange(i,1).getValue();
    var key = ss.getSheetByName(sheetConf).getRange(i,6).getValue();
    var secret = ss.getSheetByName(sheetConf).getRange(i,7).getValue();
    var destName = "PASTE" + String(i-2);
    if (botName!==""){
      BitMEXGetHistory(key,secret,destName);
      i++;
    }else{ notBlank = false;}
  }   
}

//
// Reads the wallet history
// apiKey: the cell coordinate for reading the API key
// apiSecret: the cell coordinate for reading the API secret
// destSheet: The name of the configuration sheet to read from and write to
//
function BitMEXGetHistory(apiKey,apiSecret,destSheet){

  // Constrcut the URL https://www.bitmex.com/api/v1/user/walletHistory?currency=XBt&count=100
  var webSite = "https://www.bitmex.com";
  var path = "/api/v1/user/walletHistory?currency=XBt&count=500";
  url = webSite + path
  
  // Construct the signature
  var nonce = Number(new Date().getTime()).toFixed(0);
  var string = 'GET'+path+nonce;
  var sKey = Utilities.computeHmacSha256Signature(string, apiSecret);
  sKey = sKey.map(function(e) {
      var v = (e < 0 ? e + 256 : e).toString(16);
      return v.length == 1 ? "0" + v : v;
  }).join("");

  // Construct the header details
  var params = {
    'method': 'GET',
    'headers': {
      'api-signature': sKey,
      'api-key': apiKey,
      'api-nonce': nonce
    },
    'muteHttpExceptions': true
  };
  
  // Send the request to the BitMEX API and receive the user data.
  var response = UrlFetchApp.fetch(url, params);
  var dataAll = JSON.parse(response.getContentText());
  var dataSet = dataAll;
  
  //Logger.log(dataSet);

  var rows = [], data;
  var tempDate;
  
  // write the data in rows
  for (i = 0; i < dataSet.length; i++) {
    data = dataSet[i];
    if (data.transactTime !== null){
//      tempDate = new Date(data.transactTime.replace(/^(\d{1,2})[-.](\d{1,2})[-.](\d{4})/g,"$3/$2/$1"));
      tempDate = data.transactTime.replace("T", " ");
      tempDate = tempDate.replace("Z", "");
      Logger.log(data.transactTime + " > " + tempDate);
    }else{
      tempDate = "null"
    }
    rows.push([tempDate,data.transactType,data.amount,data.fee,data.address,data.transactStatus,data.walletBalance]);
  }

  var ss = SpreadsheetApp.getActive();
  var header = [];
  header.push(["transactTime","transactType","amount","fee","address","transactStatus","walletBalance"]);
  var cell = ss.getSheetByName(destSheet).getRange(1,1,header.length, 7);
  cell.setValues(header);
  var cell = ss.getSheetByName(destSheet).getRange(2,1,rows.length, 7);
  cell.setValues(rows);

}
                     

function about() {
  // Display a modeless dialog box with custom HtmlService content.
  var htmlOutput = HtmlService
     .createHtmlOutput('<font face="verdana"><p><b>Developed by Tooraj Enayati</b></p>' +
                       '<p>Copying and distribution is promitted as long as credits are given</p>' +
                       '<p><b>Donation are greatly appreciated</b></p>' +
                       '<p>BTC: 3QSSMwKuoS4wRJQCNofnqBVitpheBDPx8w<br>' +
                       'ETH: 0x5d883ef2ddac91034186b732cd1126cdb5d2c0f4<br>' +
                       'LTC: MBsbj8q38seA3Pk6tZk1WY7DkFRf2Yf6x1</p>' +
                       '<p><b>Twitter</b>: @tooraj_enayati<br>' +
                       '<b>Telegram</b>: ToorajEnayati<br>' +
                       '<b>Email</b>: tooraj@isc.com.au<br>' +
                       '<b>Discord</b>: tooraj#7318</p></font>')
     .setWidth(450)
     .setHeight(350);
  SpreadsheetApp.getUi().showModelessDialog(htmlOutput, 'BitMEX History Downloader');
}
