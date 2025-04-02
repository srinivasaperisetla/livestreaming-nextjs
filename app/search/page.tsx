'use client';

import { useState } from 'react';

interface NPIProvider {
  number: string;
  basic: {
    first_name?: string;
    last_name?: string;
    name?: string;
    postal_code: string;
  };
}

export default function NpiSearchPage() {
  const [postalCode, setPostalCode] = useState('');
  const [results, setResults] = useState<NPIProvider[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!postalCode || postalCode.length < 2) {
      setError('Please enter at least 2 digits of a postal code.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/nppes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postal_code: postalCode }),
      });

      if (!res.ok) throw new Error('Failed to fetch');

      const data = await res.json();
      setResults(data);
    } catch (_err) {
      console.error('Error occurred:', _err);
      setError('Error fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Search NPI Registry by ZIP Code</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter ZIP code (e.g. 941*)"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <ul className="space-y-4">
        {results.map((provider, index) => (
          <li key={index} className="border p-4 rounded shadow">
            <p className="font-medium">
              {provider.basic.first_name ?? ''} {provider.basic.last_name ?? provider.basic.name ?? '(Org)'}
            </p>
            <p className="text-sm text-gray-600">NPI: {provider.number}</p>
            <p className="text-sm text-gray-600">ZIP: {provider.basic.postal_code}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
