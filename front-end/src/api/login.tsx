interface User {
  userName: string;
  passWord: string;
}

async function Login(user: User) {
  console.log("chamou?");
  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (response.status != 302) {
    return null;
  }
  const data = await response.json();
  return data;
}

export default Login;
