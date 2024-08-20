import { useContext } from "react";
import { AuthContext } from "../../context/auth";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  async function handleLogout() {
    await logout();
  }

  return (
    <div className="dashboardScreen">
      <h1>Pagina Dashboard</h1>
      <button onClick={handleLogout}>Sair da conta</button>
    </div>
  );
}
