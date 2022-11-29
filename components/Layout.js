import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from "next/head"
import {useRouter} from "next/router"
import Header from "./Header"
import Footer from "./Footer"
import Showcase from "./Showcase"
import styles from "@/styles/Layout.module.css"

export default function Layout({title, keywords, description, children}) {
  
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="decription" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      <ToastContainer />
      { router.pathname === '/' && <Showcase /> }
      <div className={styles.container}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title : "Music Events | Finde die angesagtesten Konzerte",
  description : "Finde alle Konzerte die momentan stattfinden",
  keywords : "Music, Konzerte, Concerts, Bands, Schweiz, Rock, Pop, Metal, Events"

}
