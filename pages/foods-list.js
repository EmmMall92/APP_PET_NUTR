import * as XLSX from 'xlsx';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function FoodsList() {
  const [foods, setFoods] = useState([]);

useEffect(() => {
  fetch('/api/foods')
    .then((res) => res.json())
    .then((data) => {
      console.log("Foods from API:", data); // 👈 έλεγχος
      setFoods(data);
    });
}, []);
  const availableTags = [
    'grain-free',
    'light',
    'hypoallergenic',
    'sensitive',
    'low-fat'
  ];

const router = useRouter();
const [searchTerm, setSearchTerm] = useState('');
const [selectedTags, setSelectedTags] = useState([]);
const [selectedSpecies, setSelectedSpecies] = useState('all');
const [selectedLifeStage, setSelectedLifeStage] = useState('all');
const filteredFoods = foods
  .filter((f) =>
    selectedSpecies === 'all' ? true : f.species.toLowerCase() === selectedSpecies
  )
  .filter((f) =>
    selectedLifeStage === 'all' ? true : f.lifeStage.toLowerCase() === selectedLifeStage
  )
  .filter((f) => {
    if (selectedTags.length === 0) return true;
    const foodTags = f.tags?.split(',').map((t) => t.trim().toLowerCase()) || [];
    return selectedTags.every((tag) => foodTags.includes(tag));
  })
  .filter((f) => {
    const term = searchTerm.toLowerCase();
    return (
      f.name?.toLowerCase().includes(term) ||
      f.brand?.toLowerCase().includes(term) ||
      f.tags?.toLowerCase().includes(term)
    );
  });
const thStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  backgroundColor: '#f0f0f0',
  textAlign: 'left',
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '8px',
};


return (
    
  <div style={{ padding: 20 }}>
    <h1>Καταχωρημένες Τροφές</h1>
    <div style={{ marginBottom: '20px' }}>
  <label htmlFor="species-select"><strong>Φίλτρο είδους:</strong></label>{' '}
  <select
    id="species-select"
    value={selectedSpecies}
    onChange={(e) => setSelectedSpecies(e.target.value)}
    style={{ padding: '4px 8px' }}
  >
    <option value="all">Όλα</option>
    <option value="dog">Σκύλος 🐶</option>
    <option value="cat">Γάτα 🐱</option>
  </select>
</div>
<div style={{ marginBottom: '20px' }}>
  <label htmlFor="lifeStage-select"><strong>Φίλτρο ηλικίας:</strong></label>{' '}
  <select
    id="lifeStage-select"
    value={selectedLifeStage}
    onChange={(e) => setSelectedLifeStage(e.target.value)}
    style={{ padding: '4px 8px' }}
  >
    <option value="all">Όλα</option>
    <option value="puppy">Κουτάβι</option>
    <option value="adult">Ενήλικο</option>
    <option value="senior">Ηλικιωμένο</option>
  </select>
</div>
<button
  onClick={() => {
  setSelectedSpecies('all');
  setSelectedLifeStage('all');
  setSelectedTags([]);
}}

  style={{
    marginTop: 10,
    padding: '6px 12px',
    border: '1px solid #ccc',
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    cursor: 'pointer'
  }}
>
  Επαναφορά φίλτρων
</button>
<div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
  <button
    onClick={() => router.push('/add-food')}
    style={{
      padding: '10px 16px',
      backgroundColor: '#0070f3',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      cursor: 'pointer',
    }}
  >
    ➕ Προσθήκη νέας τροφής
  </button>

  <button
    onClick={() => router.push('/import-foods')}
    style={{
      padding: '10px 16px',
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      cursor: 'pointer',
    }}
  >
    📥 Εισαγωγή από αρχείο
  </button>
  <button
  onClick={() => window.location.href = '/api/export'}
  style={{
    padding: '10px 16px',
    backgroundColor: '#6c63ff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '20px'
  }}
>
  📤 Εξαγωγή σε Excel
</button>
<button
  onClick={() => {
    const data = filteredFoods.map((f) => ({
      BRAND: f.brand,
      name: f.name,
      level: f.quality,
      size: f.size,
      age: f.lifeStage,
      tags: f.tags,
      'animal protein': f.animalSource,
      protein: f.protein,
      fat: f.fat,
      fibres: f.fiber,
      ash: f.ash,
      moisture: f.moisture,
      na: f.sodium,
      ca: f.calcium,
      mag: f.magnesium,
      phos: f.phosphorus,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'FilteredFoods');
    XLSX.writeFile(workbook, 'filtered_foods_export.xlsx');
  }}
  style={{
    padding: '10px 16px',
    backgroundColor: '#ff9800',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
  }}
>
  📤 Εξαγωγή φίλτρων σε Excel
</button>

</div>

<div style={{ marginBottom: '20px' }}>
  <label><strong>Αναζήτηση:</strong></label>{' '}
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Όνομα, brand ή tag..."
    style={{ padding: '6px 10px', width: '250px' }}
  />
</div>

<div style={{ marginBottom: '20px' }}>
  <strong>Φίλτρο Tags:</strong>
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 8 }}>
    {availableTags.map((tag) => (
      <label key={tag} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <input
          type="checkbox"
          checked={selectedTags.includes(tag)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedTags([...selectedTags, tag]);
            } else {
              setSelectedTags(selectedTags.filter((t) => t !== tag));
            }
          }}
        />
        {tag}
      </label>
    ))}
  </div>
</div>

    {Array.isArray(foods) && foods.length > 0 ? (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px',
        marginTop: '20px'
      }}>
        {
        filteredFoods.map((food) => (
          <div key={food.id} style={{
            border: '1px solid #ccc',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            backgroundColor: '#fafafa'
          }}>
            <button
  onClick={async () => {
    const confirmDelete = confirm(`Να διαγραφεί η τροφή "${food.name}";`);
    if (!confirmDelete) return;

    const res = await fetch(`/api/foods/${food.id}`, { method: 'DELETE' });
    if (res.ok) {
      alert('Διαγράφηκε!');
      setFoods(foods.filter((f) => f.id !== food.id)); // αφαίρεσε από τη λίστα
    } else {
      alert('Αποτυχία διαγραφής.');
    }
  }}
  style={{
    marginTop: 12,
    padding: '6px 12px',
    backgroundColor: '#ff4d4f',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  }}
>
  🗑️ Διαγραφή
</button>
<button
  onClick={() => router.push(`/edit-food/${food.id}`)}
  style={{
    marginTop: 8,
    padding: '6px 12px',
    backgroundColor: '#ffa726',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    marginRight: 8
  }}
>
  ✏️ Επεξεργασία
</button>


            <h2 style={{ margin: '0 0 8px' }}>
              {food.species === 'dog' ? '🐶' : ' 🐱'}
              {food.name}
            </h2>
            <p style={{ margin: 0 }}><strong>Brand:</strong> {food.brand}</p>
            <p style={{ margin: 0 }}><strong>Είδος:</strong> {food.species}, {food.lifeStage}, {food.size}</p>
            <p style={{ margin: '8px 0 0' }}><strong>Tags:</strong> {food.tags}</p>

            <hr style={{ margin: '12px 0' }} />

            <p style={{ margin: 0 }}><strong>Protein:</strong> {food.protein ?? '—'}%</p>
            <p style={{ margin: 0 }}><strong>Fat:</strong> {food.fat ?? '—'}%</p>
            <p style={{ margin: 0 }}><strong>Fiber:</strong> {food.fiber ?? '—'}%</p>
            <p style={{ margin: 0 }}><strong>Sodium:</strong> {food.sodium ?? '—'}%</p>
            <p style={{ margin: 0 }}><strong>Magnesium:</strong> {food.magnesium ?? '—'}%</p>
            <p style={{ margin: 0 }}><strong>Calcium:</strong> {food.calcium ?? '—'}%</p>
            <p style={{ margin: 0 }}><strong>Phosphorus:</strong> {food.phosphorus ?? '—'}%</p>
            <p style={{ margin: '8px 0 0' }}><strong>Θερμίδες:</strong> {food.kcalPerKg ?? '—'} kcal/kg</p>
            <p style={{ margin: 0 }}><strong>Γραμμάρια/kg:</strong> {food.gramsPerKg ?? '—'}g</p>
          

          </div>
        ))}
  <div style={{ marginTop: 60 }}>
  <h2 style={{ textAlign: 'center', fontSize: '24px' }}>
    📊 Πίνακας Θρεπτικών Στοιχείων
  </h2>

  <div style={{ marginTop: 20, overflowX: 'auto' }}>
    <table style={{ minWidth: '900px', width: '100%', borderCollapse: 'collapse', margin: '0 auto' }}>
      <thead>
        <tr>
          <th style={thStyle}>Όνομα</th>
          <th style={thStyle}>Είδος</th>
          <th style={thStyle}>Πρωτεΐνη</th>
          <th style={thStyle}>Λίπος</th>
          <th style={thStyle}>Ίνες</th>
          <th style={thStyle}>Νάτριο</th>
          <th style={thStyle}>Μαγνήσιο</th>
          <th style={thStyle}>Ασβέστιο</th>
          <th style={thStyle}>Φώσφορος</th>
          <th style={thStyle}>Kcal/kg</th>
        </tr>
      </thead>
      <tbody>
        {filteredFoods.map((food) => (
          <tr key={food.id}>
            <td style={tdStyle}>{food.name}</td>
            <td style={tdStyle}>{food.species}</td>
            <td style={tdStyle}>{food.protein ?? '—'}</td>
            <td style={tdStyle}>{food.fat ?? '—'}</td>
            <td style={tdStyle}>{food.fiber ?? '—'}</td>
            <td style={tdStyle}>{food.sodium ?? '—'}</td>
            <td style={tdStyle}>{food.magnesium ?? '—'}</td>
            <td style={tdStyle}>{food.calcium ?? '—'}</td>
            <td style={tdStyle}>{food.phosphorus ?? '—'}</td>
            <td style={tdStyle}>{food.kcalPerKg ?? '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>




      </div>
    ) : (
      <p>Δεν υπάρχουν τροφές ή κάτι πήγε στραβά.</p>
    )}
  </div>
);

}

