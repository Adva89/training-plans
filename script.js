const API_URL = 'https://script.google.com/macros/s/AKfycbzMw3xP8LzNVQxvCJMbTu8TMvPMD7SDNNlfEcz1D-Ys1a7k5JWx2woT0t-VC2nmIkCF/exec';

async function loadData(sheetName) {
  const response = await fetch(`${API_URL}?sheet=${sheetName}`);
  return await response.json();
}

function renderWeeks(data) {
  const weeks = [...new Set(data.map(row => row[0]))];
  
  return weeks.map(week => `
    <div class="week">
      <h3>Неделя ${week}</h3>
      ${data.filter(row => row[0] === week)
           .map(row => `
             <div class="training">
               <h4>День ${row[1]}: ${row[2]}</h4>
               <p>${row[3]}</p>
               <p>⏱ ${row[4]} | ⚡ ${row[5]}</p>
             </div>
           `).join('')}
    </div>
  `).join('');
}

document.querySelectorAll('[data-tab]').forEach(btn => {
  btn.addEventListener('click', async () => {
    const data = await loadData(btn.dataset.tab);
    document.getElementById('content').innerHTML = renderWeeks(data);
  });
});
