import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loading from "./components/Loading";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("search");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        if (searchTerm) {
          response = await fetch(`https://dgtlmart-task.onrender.com/users/${searchTerm}`, {
            method: "POST",
          });
        } else {
          response = await fetch("https://dgtlmart-task.onrender.com/users");
        }
        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div className="p-4">
      <input
        type="search"
        className="w-[80%] p-2 outline-none border-2 border-black mb-4"
        placeholder="Search Users"
        onChange={(e) => {
          setSearchParams({ search: e.target.value });
        }}
      />
      {loading ? (
        <Loading />
      ) : data.error ? (
        <p>{data.error}</p>
      ) : (
        <div className="flex flex-wrap justify-between gap-3">
          {data.length === 0 ? (
            <p>No users found.</p>
          ) : (
            data.map((user) => (
              <div key={user.userId} className="w-52">
                <h2>{user.username}</h2>
                <small>{user.email}</small>
                <img src={user.avatar} alt="" />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;
