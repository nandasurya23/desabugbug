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
    title: "Festival Perang Pandan (Mekare-kare)",
    location: "Area Pura Desa Bugbug",
    description: "Saksikan tradisi tahunan Perang Pandan yang luar biasa. Sebuah ritual budaya di mana para pemuda desa bertarung menggunakan daun pandan berduri. Acara ini merupakan bentuk penghormatan dan bagian tak terpisahkan dari adat istiadat setempat.",
    startDate: getFutureDate(3),
    startTime: "09:00",
    endDate: getFutureDate(4),
    endTime: "16:00",
    image_url: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&q=80",
    map_iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.7480579172465!2d115.5898863!3d-8.4900894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd206e1088d8b67%3A0x5030bfbca7d0ba0!2sPura%20Bale%20Agung%20Desa%20Adat%20Bugbug!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
    createdAt: new Date().toISOString()
  },
  {
    id: "evt_2",
    title: "Pasar Malam & Kuliner Tradisional",
    location: "Lapangan Utama Desa Bugbug",
    description: "Nikmati berbagai jajanan khas tradisional, pertunjukan musik akustik dari pemuda lokal, dan pameran kerajinan tangan dari ibu-ibu PKK Desa Bugbug. Tiket masuk gratis!",
    startDate: getFutureDate(7),
    startTime: "17:00",
    endDate: getFutureDate(9),
    endTime: "22:00",
    image_url: "https://images.unsplash.com/photo-1596404558231-1e967a5b3a62?w=800&q=80",
    createdAt: new Date().toISOString()
  },
  {
    id: "evt_3",
    title: "Gotong Royong Bersih Pantai Bias Tugel",
    location: "Pantai Bias Tugel",
    description: "Kami mengundang seluruh elemen masyarakat dan relawan untuk bergabung dalam kegiatan bersih-bersih pantai bulanan. Kantong sampah dan alat capit disediakan oleh panitia. Mari jaga alam kita!",
    startDate: getFutureDate(1),
    startTime: "06:30",
    endDate: getFutureDate(1),
    endTime: "09:00",
    image_url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&auto=format,compress&q=60", // Placeholder budaya Bali
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
};
