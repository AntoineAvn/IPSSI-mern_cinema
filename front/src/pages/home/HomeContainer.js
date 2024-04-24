import React, {useEffect, useState} from 'react';
import HomeComponent from "./HomeComponent";

const HomeContainer = () => {
    /**
     * @description loading api
     * @return boolean
     */
    const [loading, setLoading] = useState(true);
    const [email,setEmail] = useState("an@gmail.com");
    const [password,setPassword] = useState("root");
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const getApi = async () => {
        try {
            setLoading(true)
            const req = await fetch('http://localhost:3001/api/v1/users', {method: "GET"})
            const res = await req.json()
            setData(res.message)
        }catch (e) {
            console.error(e.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setTimeout(async () => {
            await getApi()
        }, 2000)
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            if (email.length === 0 || password.length === 0) return setError("Email ou Password vide")
            const req = await fetch('http://localhost:3001/api/v1/login',
                {
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type':  'application/json'
                    },
                    body: JSON.stringify({
                        password: "root",
                        email: "an@gmail.com"
                    })
                })
            const res = await req.json()
            if (!req.ok) return setError("Mauvaise combinaison")
            setUser(res.message)
        } catch (e) {
            console.error(e.message)
        } finally {
            setLoading(false)
            setTimeout(() => {
                setError("")
            }, 2000)
        }
    }
    console.log(user)
    return (
        <div>
            {
                loading
                    ?
                    <p>En chargement...</p>
                    :
                    <HomeComponent data={data} />
            }
            <div>
                <form onSubmit={handleSubmit}>
                    <input value={email} type="text" onChange={(e) => setEmail(e.target.value)} />
                    <input value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>
                    <button type={"submit"}>send</button>
                </form>
                {
                    error.length > 0 && <p>{error}</p>
                }
            </div>
        </div>
    );
};



export default HomeContainer;
