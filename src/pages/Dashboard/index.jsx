import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import Header from "../../components/Header/index";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  async function handleLogout() {
    await logout();
  }

  return (
    <div className="dashboardScreen">
      <Header />
      <h1>Pagina Dashboard</h1>
      <button onClick={handleLogout}>Sair da conta</button>
    </div>
  );
}
