import { useState } from 'react'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'


export default function ImageUpload({evtId, imageUploaded, token}) {

const [image, setImage] = useState(null);
const [uploadLoading, setUploadLoading] = useState(false);


const handleSubmit = async (e) => {
  e.preventDefault();

  setUploadLoading(true);

  const formData = new FormData()
  formData.append('files', image)
  formData.append('ref', 'api::event.event')
  formData.append('refId', evtId)
  formData.append('field', 'image')
   
  const res = await fetch(`${API_URL}/api/upload`, {
    method : 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  if(res.ok) {
    imageUploaded();
    setUploadLoading(false);
  }
}


const handleFileChange = (e) => {
  setImage(e.target.files[0]);
}


  return (
    <div className={styles.form}>
      <h1>Bild Upload für Event</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        {uploadLoading ? <p>is uploading...</p> : null}
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  )
}
