import {toast} from 'react-toastify';
import { parseCookies } from '@/helpers/index';
import {useState} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Layout from "@/components/Layout"
import {API_URL} from '@/config/index'
import styles from '@/styles/Form.module.css'


export default function AddEventPage({token}) {

  const [values, setValues] = useState({
      name: '',
      performers: '',
      description: '',
      venue: '',
      address: '',
      date: '',
      time: ''
    });

  const handleSubmit = async (e) => {
      e.preventDefault();
      // Validation
      const hasEmptyFields = Object.values(values).some((element) => element === '');

      if(hasEmptyFields) {
        toast.error('Please fill in all fields');
      }

      const res = await fetch(`${API_URL}/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({data: values})
      });
      if(!res.ok) {
        if(res.status === 403 || res.status === 401) {
          toast.error('Unauthorized');
          return
        }
        toast.error('Something went wrong');
      } else {
        const evt = await res.json();

        router.push(`/events/${evt.data.attributes.slug}`);
      }
  }
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});

  }



  const router = useRouter(); 

  return (
    <Layout title="Füge einen neuen Event hinzu">
      <Link href='/events'>zurück</Link>
      <h1>Event hinzufügen </h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={values.name} onChange={handleInputChange}/>
          </div>
          <div>
            <label htmlFor="performers">Künstler</label>
            <input type="text" id="performers" name="performers" value={values.performers} onChange={handleInputChange}/>
          </div>
          <div>
            <label htmlFor="venue">Ort</label>
            <input type="text" id="venue" name="venue" value={values.venue} onChange={handleInputChange}/>
          </div>
          <div>
            <label htmlFor="address">Adresse</label>
            <input type="text" id="address" name="address" value={values.address} onChange={handleInputChange}/>
          </div>
          <div>
            <label htmlFor="date">Datum</label>
            <input type="date" id="date" name="date" value={values.date} onChange={handleInputChange}/>
          </div>
          <div>
            <label htmlFor="time">Zeit</label>
            <input type="text" id="time" name="time" value={values.time} onChange={handleInputChange}/>
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Infos</label>
          <textarea type="text" name="description" id="description" value={values.description} onChange={handleInputChange}></textarea>
        </div>
        <input type="submit" value="Hinzufügen" className="btn" />
      </form>
      </Layout>
  )
}

export async function getServerSideProps({req}) {

   const {token} = parseCookies(req);

  return {
    props: {
      token
    }
  }
}
