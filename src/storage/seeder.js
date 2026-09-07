import { LocalStorageAPI } from './index';

const MOCK_ROLES = [
  { id: "role_1", name: "Super Admin", description: "Memiliki akses penuh ke seluruh sistem" },
  { id: "role_2", name: "Admin Desa", description: "Dapat mengelola data desa dan artikel" },
  { id: "role_3", name: "Pengelola Wisata", description: "Dapat mengelola data destinasi wisata dan event" }
];

export const seedInitialData = async () => {
  // Hapus data mock lama jika masih ada (untuk memastikan production bersih dari data dummy)
  await LocalStorageAPI.remove('app_wisata_destinations');
  await LocalStorageAPI.remove('app_wisata_articles');
  await LocalStorageAPI.remove('app_wisata_events');
  await LocalStorageAPI.remove('seeder_version');

  const currentRoles = await LocalStorageAPI.get('app_roles');

  // Hanya seed jika app_roles kosong
  if (!currentRoles || (Array.isArray(currentRoles) && currentRoles.length === 0)) {
    await LocalStorageAPI.set('app_roles', MOCK_ROLES);
    console.log("Roles data successfully seeded & old mock data removed!");
  }
};
