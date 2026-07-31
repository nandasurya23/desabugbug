import { LocalStorageAPI } from './index';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

class BaseCRUD {
  constructor(key) {
    this.key = key;
    this.cache = null;
  }

  getAll() {
    if (this.cache === null) {
      this.cache = LocalStorageAPI.get(this.key) || [];
    }
    return this.cache;
  }

  getById(id) {
    const items = this.getAll();
    return items.find(item => item.id === id);
  }

  create(data) {
    const items = this.getAll();
    const newItem = { ...data, id: generateId(), createdAt: new Date().toISOString() };
    const newItems = [...items, newItem];
    if (LocalStorageAPI.set(this.key, newItems)) {
      this.cache = newItems;
      return newItem;
    }
    return null;
  }

  update(id, data) {
    const items = this.getAll();
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      const newItems = [...items];
      newItems[index] = { ...newItems[index], ...data, updatedAt: new Date().toISOString() };
      if (LocalStorageAPI.set(this.key, newItems)) {
        this.cache = newItems;
        return newItems[index];
      }
    }
    return null;
  }

  remove(id) {
    const items = this.getAll();
    const filtered = items.filter(item => item.id !== id);
    if (items.length !== filtered.length) {
      if (LocalStorageAPI.set(this.key, filtered)) {
        this.cache = filtered;
        return true;
      }
    }
    return false;
  }
}

export const DestinationStorage = new BaseCRUD('app_wisata_destinations');
export const ArticleStorage = new BaseCRUD('app_wisata_articles');
export const EventStorage = new BaseCRUD('app_wisata_events');
