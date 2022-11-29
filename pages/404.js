import {FaExclamationTriangle} from 'react-icons/fa'
import Layout from '@/components/Layout'
import styles from '@/styles/404.module.css'
import Link from 'next/link'


export default function NotFoundPage() {
  return (
   <Layout title= 'Page not found'>
    <div className={styles.error}>
      <h1><FaExclamationTriangle style={{ "font-size": "2.4rem" }} /> 404</h1>
      <h4>Sorry there is nothing here</h4>
      <Link href='/'>Go Back Home</Link>
    </div>
   </Layout>
  )
}
