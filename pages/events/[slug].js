import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import styles from "@/styles/Event.module.css"
import MapEvent from "@/components/MapEvent"
import Link from "next/link"
import Image from "next/image"

export default function EventPage({evt, token}) {

  console.log(token);

  const { attributes} = evt;

  return (
    <Layout>
      <div className={styles.event}>
        
        <span>Am {new Date(attributes.date).toLocaleDateString('de-DE')} um {attributes.time}</span>
        <h1>{attributes.name}</h1>
        { attributes.image.data && (
          <div className={styles.image}>
            <Image src={attributes.image.data.attributes.formats.medium.url} width={960} height={600} />
          </div> )
        }

        <h3>Künstler:</h3>
        <p>{attributes.performers}</p>
        <h3>Beschreibung:</h3>
        <p>{attributes.description}</p>
        <h3>Ort: {attributes.venue}</h3>
        <p>{attributes.address}</p>

<MapEvent evt={evt} />
       
        <Link href="/events">
          <a className={styles.back}>{'<'} Zurück</a>
        </Link>
      </div>
    </Layout>
  )
}

// export async function getStaticPaths() {


//   const res = await fetch(`${API_URL}/api/events/`);

//   const json = await res.json();
//   const events = json.data;

  

//   const paths = events?.map((evt) => (
//     {
//       params: {slug: evt?.attributes.slug}
//     }
//   ));

//   console.log("Static Paths:", paths)

//   return {
//     paths,
//     fallback: true,
//   }
// }

// export async function getStaticProps({params: {slug}}) {
//   console.log("Slug:", slug);


//   const res = await fetch(`${API_URL}/api/events?populate=*&filters[slug]=${slug}`);

//   const json = await res.json();
//   console.log("JSON:", json)

//   const events = json.data;
  
//   console.log("EVENTS:", events)

//   return {
//     props: {
//       evt: events[0],
//     },
//     revalidate: 1,
//   }
// }

export async function getServerSideProps({query: {slug}}) {

  const res = await fetch(`${API_URL}/api/events?populate=*&filters[slug]=${slug}`);
  const json = await res.json();
  const events = json.data;


return {
  props: {
    evt: events[0]
  }
}
}
