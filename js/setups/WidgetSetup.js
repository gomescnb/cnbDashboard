const widgets = [
  {
    id: "ticker-tape",
    url: "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js",
    getConfig: (theme) => ({
      symbols: [
        { description: "", proName: "PETR3" },
        { description: "", proName: "vale3" },
        { description: "", proName: "FX_IDC:USDBRL" },
        { description: "OJI - Euro", proName: "OJI" },
        { description: "", proName: "NASDAQ:MSFT" },
        { description: "", proName: "NASDAQ:AMZN" },
        { description: "", proName: "NASDAQ:GOOGL" },
        { description: "", proName: "NASDAQ:META" },
        { description: "", proName: "NYSE:WMT" },
      ],
      showSymbolLogo: true,
      colorTheme: theme,
      isTransparent: false,
      displayMode: "adaptive",
      locale: "br",
    }),
  },
  {
    id: "market-quotes",
    url: "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js",
    getConfig: (theme) => ({
      // width: "100%",
      height: "100%",
      symbolsGroups: [
        {
          name: "Indicadores",
          originalName: "Economics",
          symbols: [
            { name: "ECONOMICS:USINTR", displayName: "Taxa de Juros EUA" },
            { name: "FRED:SOFR", displayName: "SOFR" },
            { name: "ECONOMICS:BRINTR", displayName: "Taxa SELIC" },
            { name: "ECONOMICS:BRIRYY", displayName: "IPCA" },
            { name: "ECONOMICS:BRCPI", displayName: "INPC" },
          ],
        },
        {
          name: "Cotações",
          originalName: "Forex",
          symbols: [
            { name: "FX_IDC:USDBRL", displayName: "USD para BRL" },
            { name: "FX_IDC:EURBRL", displayName: "EUR para BRL" },
            { name: "FX_IDC:EURUSD", displayName: "EUR para USD" },
            { name: "FX_IDC:JPYBRL", displayName: "JPY para BRL" },
            { name: "FX_IDC:JPYUSD", displayName: "JPY para USD" },
            { name: "FX_IDC:GBPBRL", displayName: "GBP para BRL" },
            { name: "FX_IDC:GBPUSD", displayName: "GBP para USD" },
            { name: "FX_IDC:DKKBRL", displayName: "DKK para BRL" },
            { name: "FX_IDC:NOKBRL", displayName: "NOK para BRL" },
            { name: "FX_IDC:AUDBRL", displayName: "AUD para BRL" },
            { name: "FX_IDC:CHFBRL", displayName: "CHF para BRL" },
            { name: "FX_IDC:SEKBRL", displayName: "SEK para BRL" },
            { name: "FX_IDC:CADBRL", displayName: "CAD para BRL" },
          ],
        },
      ],
      showSymbolLogo: true,
      isTransparent: false,
      colorTheme: theme,
      locale: "br",
    }),
  },
  {
    id: "screener",
    url: "https://s3.tradingview.com/external-embedding/embed-widget-screener.js",
    getConfig: (theme) => ({
      // width: "100%",
      height: "100%",
      defaultColumn: "overview",
      defaultScreen: "most_capitalized",
      market: "brazil",
      showToolbar: true,
      colorTheme: theme,
      locale: "br",
    }),
  },
];

export { widgets };
