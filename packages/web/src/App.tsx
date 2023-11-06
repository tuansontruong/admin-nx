import { Sidebar } from './components/Sidebar/Sidebar';

function App({ permissions }: { permissions?: string[] }) {
  return (
    <>
      {/* App
      {permissions?.map((permission, index) => (
        <div key={index}>{permission}</div>
      ))} */}
      <Sidebar />
    </>
  );
}

export default App;
