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
      <p>Media</p>

      <div>
        <table>
          <tbody>
            <tr>
              <th>#</th>
            </tr>
            {media.map((m, index) => (
              <tr key={String(index)}>
                <td><pre>{JSON.stringify(m, null, 2)}</pre></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
