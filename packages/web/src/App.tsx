import { Outlet } from 'react-router-dom';
import { UserConfigProvider } from '@commons';
import { AdminNavbar, FooterAdmin, HeaderStats, Sidebar } from '@components';

function App({ roles }: { roles: string[] }) {
  return (
    <UserConfigProvider userConfig={{ roles }}>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="relative">
            <Outlet />
          </div>
          <FooterAdmin />
        </div>
      </div>
    </UserConfigProvider>
  );
}

export default App;
