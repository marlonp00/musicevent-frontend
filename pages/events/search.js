import qs from 'qs'
import {useRouter} from 'next/router'
import Link from 'next/link'
import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index";


export default function SearchPage({events}) {

  const router = useRouter();

  console.log(events);

  return (
    <Layout>
      <Link href='/events'>zurück</Link>
      <h1>Suchergebnis zu: {router.query.term}</h1>
      { events.length === 0 && <h3>Keine Suchergebnisse gefunden</h3> }

      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  )
}

export async function getServerSideProps({query: {term}}) {
  const query = qs.stringify(    {
    filters: {
      $or: [
        {
          name: {
            $containsi: term,
          },
        },
        {
          performers: {
            $containsi: term,
          },
        },
        {
          description: {
            $containsi: term,
          },
        },
        {
          venue: {
            $containsi: term,
          },
        },
        {
          time: {
            $containsi: term,
          },
        },
      ],
    },
  },
  {
    encode: false,
  });
  const res = await fetch(`${API_URL}/api/events?${query}&populate=*`);
  const json = await res.json();
  const events = json.data;
  return { 
    props: {events}  
  };
}