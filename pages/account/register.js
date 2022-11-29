import {FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useState, useEffect, useContext} from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout'
import AuthContext from '@/context/AuthContext'
import styles from '@/styles/AuthForm.module.css'

export default function register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordconfirm, setPasswordConfirm] = useState('');

  const {registerUser, error} = useContext(AuthContext);

  useEffect(() => { 
    error && 
    error.map((mess) => {
      toast.error(mess.message);
    })
    //toast.error(error[0].message);
    console.log(error)
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(password !== passwordconfirm) {
     return toast.error("passwords do not match");
    }
    registerUser({ username, email, password });
  }

  return (
    <Layout title='User Registrierung'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Registrieren
        </h1>
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">User Name</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value) } />
          </div>
          <div>
            <label htmlFor="email">Email Adresse</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value) } />
          </div>
          <div>
            <label htmlFor="password">Passwort</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value) } autoComplete="off" />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Passwort bestätigen</label>
            <input type="password" id="password-confirm" value={passwordconfirm} onChange={(e) => setPasswordConfirm(e.target.value) } autoComplete="off" />
          </div>
          <input type="submit" value="Account erstellen" className="btn" />
        </form>
        <p>Schon registriert? <Link href='/account/login'><a>Login</a></Link></p>
      </div>
    </Layout>
  )
}
