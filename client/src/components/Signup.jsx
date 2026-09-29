import { useState } from "react";

function Signup() {
    //stores specifc feild into the input box 
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    //same thing i didad in the project before to prevent broweser default behabior 
    async function handleSubmit(event) {
        event.preventDefault();


        //take the values we have and turn them into user data 
        const response = await fetch("http://localhost:9000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                f_name: firstName,
                l_name: lastName,
                username: username,
                password: password
            })
        });

        const data = await response.json();
        setMessage(data.message);
    }

    //basic html with headers for saign up followed by input box for each type we have 
    return (
        <div>
            <h2>Sign Up</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                />

                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />

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
                    Sign Up
                </button>
            </form>

            <p>{message}</p>
        </div>
    );
}

export default Signup;