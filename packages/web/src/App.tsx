function App({ permissions }: { permissions?: string[] }) {
  return (
    <>
      App
      {permissions?.map((permission, index) => (
        <div key={index}>{permission}</div>
      ))}
    </>
  );
}

export default App;
