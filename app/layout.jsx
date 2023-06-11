import './globals.css';
import { Nunito } from 'next/font/google';
import { Navbar } from './components/navbar/Navbar';
import { ClientOnly } from './components/ClientOnly';
import { Modal } from './components/modals/Modal';
const inter = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'AirBnb',
  description: 'AirBnb clone',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly><Navbar /><Modal isOpen title='hello world' actionLabel={'Submit'}/></ClientOnly>
        {children}
      </body>
    </html>
  );
};
