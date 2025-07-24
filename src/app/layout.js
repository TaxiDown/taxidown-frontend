import "./styling/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-lvh">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="w-[100vw] h-lvh overflow-x-hidden " wotdisconnected="true" suppressHydrationWarning>{children}</body>
    </html>
  );
}

