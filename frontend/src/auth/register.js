import axios from "axios";
import { useState } from "react";


function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const res = await axios.post(
                "https://codefolio-r8zm.onrender.com/api/auth/register",
                { email,password }
            );
            alert(res.data.message);
        }catch(error){
            alert(error.response?.data?.message || "Registration failed");
        }
    };


    return(
        <div>
            <h2>Register</h2>
            <form onSubmit = {handleSubmit}>
                <input
                    type ="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange = {(e)=> setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;