import { LocalStorageAPI } from './index';

const MOCK_DESTINATIONS = [
  {
    id: "dest_1",
    name: "Pantai Bias Tugel",
    description: "Surga tersembunyi dengan pasir putih bersih dan air laut berwarna toska. Terletak di balik bukit kecil, pantai ini sangat cocok untuk snorkeling, berjemur, atau sekadar menikmati ketenangan laut Bali yang mempesona.",
    status: "Buka",
    harga_tiket: "Rp 15.000",
    facilities: [
      { id: "f1", name: "Area Parkir Luas" },
      { id: "f2", name: "Kamar Bilas & Toilet Bersih" },
      { id: "f3", name: "Warung Makan Lokal" },
      { id: "f4", name: "Penyewaan Alat Snorkeling" }
    ],
    accommodations: [
      { id: "a1", name: "Bias Tugel Bungalows", price: "Rp 350.000 / Malam" }
    ],
    galleries: [
      { id: "g1", url: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=800&q=80" },
      { id: "g2", url: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=800&q=80" }
    ],
    openingHours: { senin: "07:00 - 18:00", selasa: "07:00 - 18:00", rabu: "07:00 - 18:00", kamis: "07:00 - 18:00", jumat: "07:00 - 18:00", sabtu: "06:00 - 18:00", minggu: "06:00 - 18:00" },
    contact: { phone: "081234567890", address: "Jl. Pantai Bias Tugel, Desa Bugbug, Karangasem" },
    createdAt: new Date().toISOString()
  },
  {
    id: "dest_2",
    name: "Bukit Asah",
    description: "Tempat berkemah legendaris di atas tebing yang menawarkan pemandangan Samudra Hindia yang spektakuler. Anda bisa melihat matahari terbit yang menakjubkan dan pulau-pulau kecil di kejauhan.",
    status: "Buka",
    harga_tiket: "Rp 10.000",
    facilities: [
      { id: "f1", name: "Penyewaan Tenda & Alat Camping" },
      { id: "f2", name: "Toilet Umum" },
      { id: "f3", name: "Spot Api Unggun" }
    ],
    accommodations: [],
    galleries: [
      { id: "g1", url: "https://images.unsplash.com/photo-1559628233-eb1b1a45564b?w=800&auto=format,compress&q=80" },
      { id: "g2", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format,compress&q=80" }
    ],
    openingHours: { senin: "24 Jam", selasa: "24 Jam", rabu: "24 Jam", kamis: "24 Jam", jumat: "24 Jam", sabtu: "24 Jam", minggu: "24 Jam" },
    contact: { phone: "081987654321", address: "Bukit Asah, Desa Bugbug, Karangasem" },
    createdAt: new Date(Date.now() - 10000).toISOString()
  },
  {
    id: "dest_3",
    name: "Virgin Beach",
    description: "Pantai berpasir putih kekuningan yang sangat panjang dan mempesona. Diapit oleh dua tebing hijau, menjadikannya salah satu pantai terindah di Bali Timur yang masih alami.",
    status: "Renovasi",
    harga_tiket: "Rp 15.000",
    facilities: [
      { id: "f1", name: "Kursi Jemur (Sunbeds)" },
      { id: "f2", name: "Cafe Tepi Pantai" },
      { id: "f3", name: "Layanan Pijat" }
    ],
    accommodations: [],
    galleries: [
      { id: "g1", url: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=800&q=80" }
    ],
    openingHours: { senin: "08:00 - 17:00", selasa: "08:00 - 17:00", rabu: "08:00 - 17:00", kamis: "08:00 - 17:00", jumat: "08:00 - 17:00", sabtu: "08:00 - 17:00", minggu: "08:00 - 17:00" },
    contact: { phone: "082345678912", address: "Perasi, Desa Bugbug" },
    createdAt: new Date(Date.now() - 20000).toISOString()
  }
];

const MOCK_ARTICLES = [
  {
    id: "art_1",
    title: "Penghargaan Desa Wisata Terbersih se-Bali Tahun Ini",
    content: "Desa Bugbug dengan bangga mengumumkan bahwa kami telah menerima penghargaan sebagai Desa Wisata dengan tingkat kebersihan terbaik di Bali. Penghargaan ini diberikan atas dedikasi seluruh perangkat desa, pengelola wisata, dan terutama kesadaran masyarakat dalam menjaga lingkungan pantai dan bukit tetap asri. Mari kita pertahankan kebanggaan ini!",
    author: "Penulis Konten",
    image_url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: "art_2",
    title: "Pembukaan Fasilitas Baru di Bukit Asah",
    content: "Merespons tingginya minat wisatawan yang berkemah, pengelola Bukit Asah kini meresmikan area fasilitas umum baru berupa toilet berstandar internasional dan area api unggun komunal. Fasilitas ini diharapkan dapat meningkatkan kenyamanan pengunjung yang menginap semalaman.",
    author: "Admin Desa",
    image_url: "https://images.unsplash.com/photo-1559628233-eb1b1a45564b?w=800&q=80",
    createdAt: new Date(Date.now() - (86400000 * 3)).toISOString() // 3 days ago
  }
];

const getFutureDate = (daysAhead) => {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString().split('T')[0];
};

const MOCK_EVENTS = [
  {
    id: "evt_1",
    title: "Festival Budaya Agustus",
    location: "Lapangan Utama Desa Bugbug",
    description: "Acara kemerdekaan dan festival budaya lokal untuk memperingati hari jadi.",
    startDate: "2026-08-17",
    startTime: "09:00",
    endDate: "2026-08-18",
    endTime: "16:00",
    image_url: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&q=80",
    map_iframe: "https://www.google.com/maps/embed?pb=!1m18...",
    createdAt: new Date().toISOString()
  },
  {
    id: "evt_2",
    title: "Pasar Malam September",
    location: "Area Pura Desa Bugbug",
    description: "Nikmati berbagai jajanan khas tradisional dan pameran kerajinan tangan.",
    startDate: "2026-09-15",
    startTime: "17:00",
    endDate: "2026-09-17",
    endTime: "22:00",
    image_url: "https://images.unsplash.com/photo-1596404558231-1e967a5b3a62?w=800&q=80",
    createdAt: new Date().toISOString()
  },
  {
    id: "evt_3",
    title: "Gotong Royong Oktober",
    location: "Pantai Bias Tugel",
    description: "Kegiatan bersih-bersih pantai bersama seluruh elemen masyarakat.",
    startDate: "2026-10-10",
    startTime: "06:30",
    endDate: "2026-10-10",
    endTime: "09:00",
    image_url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&auto=format,compress&q=60",
    createdAt: new Date().toISOString()
  },
  {
    id: "evt_4",
    title: "Upacara Adat November",
    location: "Pura Dalem Desa Bugbug",
    description: "Persiapan upacara dan piodalan yang akan dihadiri krama desa.",
    startDate: "2026-11-20",
    startTime: "08:00",
    endDate: "2026-11-21",
    endTime: "12:00",
    image_url: "https://images.unsplash.com/photo-1559628233-eb1b1a45564b?w=800&q=80",
    createdAt: new Date().toISOString()
  },
  {
    id: "evt_5",
    title: "Perayaan Akhir Tahun",
    location: "Bukit Asah",
    description: "Menyambut pergantian tahun dengan kemah bersama dan api unggun.",
    startDate: "2026-12-31",
    startTime: "18:00",
    endDate: "2027-01-01",
    endTime: "06:00",
    image_url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    createdAt: new Date().toISOString()
  }
];

export const seedInitialData = async () => {
  const currentData = await LocalStorageAPI.get('app_wisata_destinations');
  
  // Patch for broken Bukit Asah images if they already exist
  if (currentData && Array.isArray(currentData) && currentData.length > 0) {
    try {
      let needsUpdate = false;
      const patched = currentData.map(dest => {
        if (dest.name === "Bukit Asah" && dest.galleries) {
          const hasBrokenImg = dest.galleries.some(g => g.url.includes("1504280390467") || g.url.includes("1478131143081"));
          if (hasBrokenImg) {
            needsUpdate = true;
            dest.galleries = [
              { id: "g1", url: "https://images.unsplash.com/photo-1559628233-eb1b1a45564b?w=800&auto=format,compress&q=80" },
              { id: "g2", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format,compress&q=80" }
            ];
          }
        }
        return dest;
      });
      if (needsUpdate) {
        await LocalStorageAPI.set('app_wisata_destinations', patched);
      }
    } catch (e) {
      // ignore
    }
  }

  // Hanya seed jika app_wisata_destinations kosong
  if (!currentData || (Array.isArray(currentData) && currentData.length === 0)) {
    await LocalStorageAPI.set('app_wisata_destinations', MOCK_DESTINATIONS);
    await LocalStorageAPI.set('app_wisata_articles', MOCK_ARTICLES);
    await LocalStorageAPI.set('app_wisata_events', MOCK_EVENTS);
    console.log("Dummy data successfully seeded!");
  }

  // Auto-update mechanism untuk MOCK_EVENTS khusus ke v2
  const seederVersion = await LocalStorageAPI.get('seeder_version');
  if (seederVersion !== "v2") {
    await LocalStorageAPI.set('app_wisata_events', MOCK_EVENTS);
    await LocalStorageAPI.set('seeder_version', "v2");
    console.log("Events data forcefully auto-updated to v2!");
  }
};
