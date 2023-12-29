import Example from './Example';
import LoginComponent from './LoginComponent';
import LoginService from './services/LoginService';

const App = () => {
  const loginService = new LoginService();

  const setToken = (token: string) => {
    console.log(`received the token ${token}`);
  };

  return (
    <>
      <div>App works</div>
      <Example />
      <LoginComponent loginService={loginService} setToken={setToken} />
    </>
  );
};

export default App;

