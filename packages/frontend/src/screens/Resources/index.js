import { useEffect, useState } from 'react';
import {
  Link
} from "react-router-dom";

import { fetchAll as apiFetchAllResources } from 'api/resources';

export default function Resources() {
  const [resources, setResources] = useState([]);

  const fetchAllResources = async () => {
    const resp = await apiFetchAllResources();
    setResources(resp);
  }

  useEffect(() => {
    fetchAllResources();
  }, []);

  return (
    <div>
      <p>Resources</p>

      <Link to={`/resources/create`}>
        <button>Create a new resource</button>
      </Link>

      <div>
        <table>
          <tbody>
            <tr>
              <th>#</th>
              <th>-</th>
            </tr>
            {resources.map((resource, index) => (
              <tr key={resource._id}>
                <td><Link to={`/resources/${resource._id}`}>{index + 1}</Link></td>
                <td><pre>{JSON.stringify(resource, null, 2)}</pre></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
