import AuthContext from "@/context/AuthContext"
import {useContext} from "react"
import Link from "next/link"
import styles from "@/styles/Header.module.css"
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'
import Search from "./Search"


export default function Header() {

  const {user, logoutUser} = useContext(AuthContext);

  console.log("HEADER:", user);
  
  return (
   <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>Music Events</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href='/events'>
              <a>Events</a>
            </Link>
          </li>
          { user ? (
            // If User Logged in
            <>  
              <li>
                <Link href='/events/add'>
                  <a>Event Hinzufügen</a>
                </Link>
              </li>
              <li>
                <Link href='/account/dashboard'>
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button className="btn-secondary btn-icon" onClick={() => logoutUser()}>
                  <FaSignOutAlt />
                  Logout</button>
              </li>
              </> ) : (
              // If User Logged out
              <> 
          <li>
            <Link href='/account/login'>
              <a className="btn-secondary btn-icon"> <FaSignInAlt /> Login</a>
            </Link>
          </li>
          </> )}
        </ul>
      </nav>
   </header> 
   )
}
