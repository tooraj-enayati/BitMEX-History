# BitMEX-History
This script will add a menu item to your Google Sheet to get BitMEX account history.

How to Use instructions:

This script will add a menu item to your Google Sheet to get BitMEX account history.
You can select the menu option to download yoru history as many time as you want.

How to SetupInstructions:

Create sheet called "Settings"
Add a row for each bot with the following headings - currently rows 1-2 and columns 1-5 are all ignored and only columns 

Configuration				
Name<tab>Description<tab>Exchange<tab>Currency<tab>Download Limit<tab>API Key<tab>API Secret
BOT1<tab>Short Bot<tab>BitMEX<tab>XBT<tab>100<tab><your key><tab><your secret>
BOT2<tab>Long Bot<tab>BitMEX<tab>XBT<tab>100<tab><your key><tab><your secret>				

Use the Tool > Script Editor for you Google Sheet to add all of this to the editor, the save it.
Save it all, the close and reopen you Google Sheet. You willbe prompted to give the scrip run permissions.
Once the permissions are granted, you shoudl see see a "Get BitMEX History" menu option - USE IT :)

Future enhancemnets:
1) Call the BitMEXGetHistory() for each bot/row
2) Use the "Download Limit" column for getting the history for more than 100
3) Use the "Currency" column for getting the history for other currencies
4) Use the "Exchange" column for getting the history from other exchanges


Developed by Tooraj Enayati
Copying and distribution is promitted as long as credits are given
Donation are greatly appreciated
        BTC: 3QSSMwKuoS4wRJQCNofnqBVitpheBDPx8w
        ETH: 0x5d883ef2ddac91034186b732cd1126cdb5d2c0f4
        LTC: MBsbj8q38seA3Pk6tZk1WY7DkFRf2Yf6x1
Twitter: @tooraj_enayati
Telegram: ToorajEnayati
Email: tooraj@isc.com.au
Discord: tooraj#7318
