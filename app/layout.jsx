import './globals.css';
import { Nunito } from 'next/font/google';
import { Navbar } from './components/navbar/Navbar';
import { ClientOnly } from './components/ClientOnly';
import { RegisterModal } from './components/modals/RegisterModal';
import { ToasterProvider } from './providers/ToasterProvider';
import { LoginModal } from './components/modals/LoginModal';

const inter = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'AirBnb',
  description: 'AirBnb clone',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider />
          <Navbar />
          <LoginModal/>
          <RegisterModal />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
};
