# BitMEX-History
This script will add a menu item to your Google Sheet to get BitMEX account history. Developed for Scavanger Bot

<b>How to Use instructions:</B>

This script will add a menu item to your Google Sheet to get BitMEX account history.
You can select the menu option to download yoru history as many time as you want.

<B>How to Setup Instructions:</B>

Create sheet called "Settings"
Add a row for each bot with the following headings - currently rows 1-2 and columns 1-5 are all ignored and only columns 

"Configuration"<br>
"Name", "Description", "Exchange", "Currency", "Download Limit", "API Key", "API Secret"<br>
"BOT1", "Short Bot", "BitMEX", "XBT", "100", "<your key>", "<your secret><br>
	"BOT2", "Long Bot", "BitMEX", "XBT", "100", "<your key>", "<your secret>	<br>			

Use the Tool > Script Editor for you Google Sheet to add all of this to the editor, the save it.

Save it all, the close and reopen you Google Sheet. You willbe prompted to give the scrip run permissions.

Once the permissions are granted, you shoudl see see a "Get BitMEX History" menu option - USE IT :)

<B>Future enhancemnets:</B>
1) Call the BitMEXGetHistory() for each bot/row
2) Use the "Download Limit" column for getting the history for more than 100
3) Use the "Currency" column for getting the history for other currencies
4) Use the "Exchange" column for getting the history from other exchanges


Developed by Tooraj Enayati
</p>Copying and distribution is promitted as long as credits are given</b>
Donation are greatly appreciated</b>
<t>BTC: 3QSSMwKuoS4wRJQCNofnqBVitpheBDPx8w<br>
<t>ETH: 0x5d883ef2ddac91034186b732cd1126cdb5d2c0f4<br>
<t>LTC: MBsbj8q38seA3Pk6tZk1WY7DkFRf2Yf6x1<br>
Twitter: @tooraj_enayati<br>
Telegram: ToorajEnayati<br>
Email: tooraj@isc.com.au<br>
Discord: tooraj#7318</p>
