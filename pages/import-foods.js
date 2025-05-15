export default function ImportFoods() {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/import', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    alert(data.message || 'Ολοκληρώθηκε');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📥 Εισαγωγή Τροφών από Excel ή CSV</h1>
      <input type="file" accept=".xlsx,.csv" onChange={handleUpload} />
    </div>
  );
}
