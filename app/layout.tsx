import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'; // Import the Next.js Script component

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  // Updated title based on the latest file content I read
  title: 'Juche - One Korea, One Spirit',
  description: 'Celebrating a united Korea guided by Juche principles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}

        {/* Microsoft Clarity Script */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "qxe1et76wh");
            `,
          }}
        />

        {/* Google Analytics gtag.js Script */}
        <Script
          strategy="afterInteractive" // Load after page becomes interactive
          src="https://www.googletagmanager.com/gtag/js?id=G-WKQ6PF3Q8W"
        />
        <Script
          id="gtag-init" // Important: Give the inline script an ID
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WKQ6PF3Q8W');
            `,
          }}
        />
      </body>
    </html>
  )
}