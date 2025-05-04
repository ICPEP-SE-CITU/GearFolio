import auth from "@/app/api/auth/auth";

export default async function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <form action ={auth.deleteSession}>
        <button>Logout</button>

      </form>
     
    </div>
  );
}


