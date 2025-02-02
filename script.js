const API_URL = 'https://script.google.com/macros/s/AKfycbx60uTksQQKZbNHYvmQN6nwUsbIU8sCroLZxcJ4swGBMwhXSxAfx-c3RwdWcEUdmk0/exec';

async function loadData(sheetName) {
  try {
    const response = await fetch(`${API_URL}?sheet=${sheetName}`);
    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Ошибка загрузки:", error);
    return [];
  }
}

// Пример использования
document.querySelectorAll('[data-tab]').forEach(btn => {
  btn.addEventListener('click', async () => {
    const data = await loadData(btn.dataset.tab);
    console.log("Данные из таблицы:", data);
  });
});
