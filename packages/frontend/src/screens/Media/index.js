import { useEffect, useState } from 'react';

import { fetchAll as apiFetchAllMedia } from 'api/media';

export default function Media() {
  const [media, setMedia] = useState([]);

  const fetchAllMedia = async () => {
    const resp = await apiFetchAllMedia();
    setMedia(resp);
  }

  useEffect(() => {
    fetchAllMedia();
  }, []);

  return (
    <div>
      <p>Media Library</p>

      <div>
        {<pre>{JSON.stringify(media, null, 2)}</pre>}
      </div>
    </div>
  );
}
