function App({ permissions }: { permissions?: string[] }) {
  return (
    <>
      {permissions?.map((permission, index) => (
        <div key={index}>{permission}</div>
      ))}
    </>
  );
}

export default App;
