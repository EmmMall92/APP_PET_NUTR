import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditFood() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/foods/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm(data);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/foods/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert('Η τροφή ενημερώθηκε!');
      router.push('/foods-list');
    } else {
      alert('Σφάλμα κατά την ενημέρωση.');
    }
  };

  if (loading || !form) return <p>Φόρτωση...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Επεξεργασία τροφής</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 400 }}>
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key}
            value={form[key] ?? ''}
            onChange={handleChange}
            disabled={key === 'id'}
          />
        ))}
        <button type="submit" style={{ padding: 10, marginTop: 10 }}>Αποθήκευση</button>
      </form>
    </div>
  );
}
