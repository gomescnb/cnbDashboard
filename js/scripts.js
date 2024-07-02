const symbolInfoSection = document.getElementById('symbol-info');
const widgetScript = document.createElement('script');
widgetScript.type = 'text/javascript';
widgetScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
widgetScript.async = true;
widgetScript.innerHTML = `
{
	"symbolsGroups": [
	{
		"name": "Forex",
		"originalName": "Forex",
		"symbols": [
		{
			"name": "USDBRL",
			"displayName": "USD to BRL"
		},
		{
			"name": "FX:GBPUSD",
			"displayName": "GBP to USD"
		},
		{
			"name": "FX:USDJPY",
			"displayName": "USD to JPY"
		},
		{
			"name": "FX:USDCHF",
			"displayName": "USD to CHF"
		},
		{
			"name": "FX:AUDUSD",
			"displayName": "AUD to USD"
		},
		{
			"name": "FX:USDCAD",
			"displayName": "USD to CAD"
		}
		],
		"symbols2": [
		{
			"name": "FX:EURUSD",
			"displayName": "EUR to USD"
		}
		]
	}
	],
	"showSymbolLogo": true,
	"isTransparent": false,
	"colorTheme": "dark",
	"locale": "br",
	"backgroundColor": "#131722"
}
`;
symbolInfoSection.appendChild(widgetScript);
