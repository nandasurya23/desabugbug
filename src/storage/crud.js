import { LocalStorageAPI } from './index';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

class BaseCRUD {
  constructor(key) {
    this.key = key;
    this.cache = null;
  }

  async getAll() {
    if (this.cache === null) {
      this.cache = (await LocalStorageAPI.get(this.key)) || [];
    }
    return this.cache;
  }

  async getById(id) {
    const items = await this.getAll();
    return items.find(item => item.id === id);
  }

  async create(data) {
    const items = await this.getAll();
    const newItem = { ...data, id: generateId(), createdAt: new Date().toISOString() };
    const newItems = [...items, newItem];
    const success = await LocalStorageAPI.set(this.key, newItems);
    if (success) {
      this.cache = newItems;
      return newItem;
    }
    return null;
  }

  async update(id, data) {
    const items = await this.getAll();
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      const newItems = [...items];
      newItems[index] = { ...newItems[index], ...data, updatedAt: new Date().toISOString() };
      const success = await LocalStorageAPI.set(this.key, newItems);
      if (success) {
        this.cache = newItems;
        return newItems[index];
      }
    }
    return null;
  }

  async remove(id) {
    const items = await this.getAll();
    const filtered = items.filter(item => item.id !== id);
    if (items.length !== filtered.length) {
      const success = await LocalStorageAPI.set(this.key, filtered);
      if (success) {
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
