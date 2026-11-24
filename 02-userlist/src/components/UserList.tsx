import { useEffect, useState } from "react";
import "./UserList.css";

type UsersType = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
};

export default function UserList() {
  const [users, setUsers] = useState<UsersType[]>([]);
  const [userPagination, setUserPagination] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch("https://dummyjson.com/users?limit=100");

        if (response.ok) {
          const data = await response.json();
          return setUsers(data.users);
        }

        setError("Houve um erro na requisição");
      } catch (error) {
        setError(`Erro interno do sistema: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    getUsers();
  }, []);

  function filterUsers() {
    const filteredUsers = users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

      return fullName.includes(search.toLowerCase());
    });

    return filteredUsers;
  }

  const filteredUsers = filterUsers();

  const currentPagination = filteredUsers.slice(
    userPagination,
    userPagination + 10,
  );
  const nextPageVerification = userPagination + 10 >= filteredUsers.length;

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setSearch(e.target.value);
          setUserPagination(0);
        }}
      />

      {loading ? (
        <h1>Carregando...</h1>
      ) : (
        <div className="userContainer">
          {currentPagination.length !== 0 ? (
            currentPagination.map((user) => (
              <div key={user.id}>
                <p>
                  {user.firstName} {user.lastName}
                </p>
                <p>{user.email}</p>
                <p>{user.age}</p>
              </div>
            ))
          ) : (
            <p>Nenhum usuário encontrado</p>
          )}
          <button
            onClick={() => setUserPagination(userPagination - 10)}
            disabled={userPagination === 0}
          >
            Previous
          </button>
          <button
            onClick={() => setUserPagination(userPagination + 10)}
            disabled={nextPageVerification}
          >
            Next
          </button>
        </div>
      )}

      <p>{error}</p>
    </>
  );
}
