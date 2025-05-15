import { useState } from 'react';

export default function AddFood() {
  const [form, setForm] = useState({
    brand: '',
    name: '',
    species: '',
    lifeStage: '',
    size: '',
    tags: '',
    protein: '',
    fat: '',
    fiber: '',
    sodium: '',
    magnesium: '',
    calcium: '',
    phosphorus: '',
    kcalPerKg: '',
    gramsPerKg: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/foods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) alert('Τροφή προστέθηκε!');
    else alert('Σφάλμα: ' + data.error);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 400 }}>
  <input name="brand" placeholder="brand" value={form.brand} onChange={handleChange} required />
  <input name="name" placeholder="name" value={form.name} onChange={handleChange} required />
  <input name="species" placeholder="species" value={form.species} onChange={handleChange} required />
  <input name="lifeStage" placeholder="lifeStage" value={form.lifeStage} onChange={handleChange} required />
  <input name="size" placeholder="size" value={form.size} onChange={handleChange} required />
  <input name="tags" placeholder="tags (π.χ. grain-free,light)" value={form.tags} onChange={handleChange} />

  <input name="protein" placeholder="protein" value={form.protein} onChange={handleChange} />
  <input name="fat" placeholder="fat" value={form.fat} onChange={handleChange} />
  <input name="fiber" placeholder="fiber" value={form.fiber} onChange={handleChange} />
  <input name="sodium" placeholder="sodium" value={form.sodium} onChange={handleChange} />
  <input name="magnesium" placeholder="magnesium" value={form.magnesium} onChange={handleChange} />
  <input name="calcium" placeholder="calcium" value={form.calcium} onChange={handleChange} />
  <input name="phosphorus" placeholder="phosphorus" value={form.phosphorus} onChange={handleChange} />
  <input name="kcalPerKg" placeholder="kcalPerKg" value={form.kcalPerKg} onChange={handleChange} />
  <input name="gramsPerKg" placeholder="gramsPerKg" value={form.gramsPerKg} onChange={handleChange} />

  <button type="submit">Προσθήκη</button>
</form>

  );
}
