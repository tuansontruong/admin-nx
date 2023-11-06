import { UserConfigProvider } from './commons/providers';
import { Sidebar } from './components/Sidebar/Sidebar';

function App({ roles }: { roles?: string[] }) {
  return (
    <UserConfigProvider userConfig={{ roles }}>
      {/* App
      {permissions?.map((permission, index) => (
        <div key={index}>{permission}</div>
      ))} */}
      <Sidebar />
    </UserConfigProvider>
  );
}

export default App;
