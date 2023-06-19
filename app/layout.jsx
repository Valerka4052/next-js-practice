import './globals.css';
import { Nunito } from 'next/font/google';
import { Navbar } from './components/navbar/Navbar';
import { ClientOnly } from './components/ClientOnly';
import { RegisterModal } from './components/modals/RegisterModal';
import { LoginModal } from './components/modals/LoginModal';
import { RentModal } from './components/modals/RentModal';
import { ToasterProvider } from './providers/ToasterProvider';
import getCurrentUser from './actoins/getCurrentUser';
import { SearchModal } from './components/modals/SearchModal';

const inter = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'AirBnb',
  description: 'AirBnb clone',
};

export default async function RootLayout({ children }) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider />
          <Navbar currentUser={currentUser} />
          <RentModal />
          <LoginModal />
          <SearchModal />
          <RegisterModal />
        </ClientOnly>
        <div className='pb-20 pt-28'>{children}</div>
      </body>
    </html>
  );
};
