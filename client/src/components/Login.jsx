import { useState } from "react";

function Login() {
    // Stores username apassword  and response messages from the server
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    // Prevents page reload and sends credentials to the backend
    async function handleLogin(event) {
        event.preventDefault();

        //added try catch for error handeling 
        try {
            const response = await fetch("http://localhost:9000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const data = await response.json();
            setMessage(data.message);

        } catch (error) {
            setMessage("Server error");
        }
    }

    // Displays the login form with username passweord and feedback message very simialr to the sign up structure 
    return (
        <div>
            <h2>Log In</h2>

            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <button type="submit">
                    Log In
                </button>
            </form>

            <p>{message}</p>
        </div>
    );
}

export default Login;