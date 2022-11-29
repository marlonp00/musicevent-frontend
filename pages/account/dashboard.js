import {parseCookies} from '@/helpers/index'
import {toast} from 'react-toastify'
import Layout from '@/components/Layout'
import DashboardEvent from '@/components/DashboardEvent'
import { API_URL } from '@/config/index'
import {useRouter} from 'next/router'
import {useState} from 'react'
import styles from '@/styles/Dashboard.module.css'

export default function DashboardPage({ events, token }) {
  const router = useRouter();

  const [evts, setEvts] = useState(events);


  const deleteEvent = async (id) => {

    if(confirm('Bist du dir sicher?')) {
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        },

      });

      const data = res.json();

      if(!res.ok) {
        toast.error(data.message);
      } else {
       const newEvents = evts.filter(evt => evt.id !== id);
       setEvts(newEvents);
      }
    }

   // attributes.filter(attributes.id);

  }

  return (
    <Layout title='User Dashboard'>
     <div className={styles.dash}>
      <h1>Dashboard</h1>
      <h3>Meine Events</h3>
      {evts.map((event) => (
        <DashboardEvent key={event.id} evt={event} handleDelete={deleteEvent} />
      ))}
     </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const {token} = parseCookies(req);

  const res = await fetch(`${API_URL}/api/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const events = await res.json();

  return {
    props: {
      events,
      token
    },
  }
}