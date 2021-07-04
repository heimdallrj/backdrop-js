import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { fetchAll as apiFetchAllMedia, create as apiCreateMedia } from 'api/media';

export default function Media() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const [media, setMedia] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [uploding, setUploading] = useState(null);

  const fetchAllMedia = async () => {
    const resp = await apiFetchAllMedia();
    setMedia(resp);
  }

  const createMedia = async () => {
    setUploading(true);
    apiCreateMedia(acceptedFiles, (err, resp) => {
      fetchAllMedia();
      setUploading(false);
    });
  }

  const handleUpload = () => {
    createMedia(files);
  }

  useEffect(() => {
    fetchAllMedia();
  }, []);

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div>
      <p>Media Library</p>

      <section className="container">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>

        {files && files.length > 0 && (<button onClick={handleUpload} type="button">Upload</button>)}
      </section>

      <div>
        {<pre>{JSON.stringify(media, null, 2)}</pre>}
      </div>
    </div>
  );
}
