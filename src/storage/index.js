const MAX_STORAGE_LIMIT = 5 * 1024 * 1024; // 5MB limit roughly

export const LocalStorageAPI = {
  checkQuota: () => {
    let total = 0;
    for (let x in localStorage) {
      if (localStorage.hasOwnProperty(x)) {
        total += ((localStorage[x].length + x.length) * 2);
      }
    }
    const percentage = (total / MAX_STORAGE_LIMIT) * 100;
    return {
      used: total,
      percentage: percentage,
      isNearLimit: percentage > 80 // alert if > 80%
    };
  },

  get: (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error reading ${key} from LocalStorage`, error);
      return null;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        alert('Kapasitas penyimpanan browser Anda penuh! Silakan lakukan Backup Data dan hapus data yang tidak perlu.');
      }
      console.error(`Error saving ${key} to LocalStorage`, error);
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  },
  
  clearAllAppKeys: () => {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('app_wisata_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
  }
};
