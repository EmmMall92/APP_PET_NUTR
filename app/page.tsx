'use client';

import { useState } from 'react';

export default function Home() {
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e: { preventDefault: () => void; target: HTMLFormElement | undefined; }) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const petData = {
      species: formData.get('species'),
      age: parseFloat((formData.get('age') as string) || '0'),
      weight: parseFloat((formData.get('weight') as string) || '0'),
      breedSize: formData.get('breedSize'),
      lifeStage: formData.get('lifeStage'),
      activityLevel: formData.get('activityLevel'),
      healthIssues: formData.get('healthIssues')?.toString().split(',') || []
};

    const res = await fetch('/api/pets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(petData)
    });

    const data = await res.json();
    setResponse(data);
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Καταχώρηση Κατοικιδίου</h1>
      <form onSubmit={handleSubmit}>
        <input name="species" placeholder="dog ή cat" required /><br />
        <input name="age" type="number" step="0.1" placeholder="Ηλικία" required /><br />
        <input name="weight" type="number" step="0.1" placeholder="Βάρος (kg)" required /><br />
        <input name="breedSize" placeholder="small, medium, large..." /><br />
        <input name="lifeStage" placeholder="puppy, adult, senior" required /><br />
        <input name="activityLevel" placeholder="low, moderate, high" required /><br />
        <input name="healthIssues" placeholder="π.χ. sensitive stomach, overweight" /><br />
        <button type="submit">Αποθήκευση</button>
      </form>

      {response && (
        <pre style={{ marginTop: 20 }}>{JSON.stringify(response, null, 2)}</pre>
      )}
    </main>
  );
}
