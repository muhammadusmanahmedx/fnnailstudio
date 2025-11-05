import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({ 
  subsets: ['latin'], 
  weight: ["300", "400", "500"],
  display: 'swap',
  fallback: ['system-ui', 'arial']
})

export const metadata = {
  title: "FN Nail Studio",
  description: "Pakistans Premium Nail Brand",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>      
      <html lang="en" suppressHydrationWarning>
        <body className={`${outfit.className} antialiased text-gray-700`} suppressHydrationWarning={true}>
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 2000,
              style: {
                maxWidth: '500px',
              },
            }}
            containerStyle={{
              top: 20,
            }}
            limit={2}
          />
          <AppContextProvider>
          
            {children}
            
          </AppContextProvider>
        </body>
      </html>
      </ClerkProvider>

  );
}
