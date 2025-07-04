import { panah, target, userPlus, fileText, branch, user, group } from "./icon-svgs";

const eventMenus = {
  1: {
    id: 1,
    icon: panah,
    title: "Acara",
    description:
      "Mengatur jenis pertandingan, kategori, jadwal, kuota, biaya registrasi, dan lainnya",
    computeLink: (eventId) => `/dashboard/event/${eventId}/manage`,
  },
  2: {
    id: 2,
    icon: user,
    title: "Peserta Individu",
    description: "Melihat data peserta, mengubah kategori, status pembayaran, dan lainnya",
    computeLink: (eventId) => `/dashboard/member/${eventId}`,
  },
  3: {
    id: 3,
    icon: group,
    title: "Peserta Beregu",
    description: "Melihat data peserta, mengubah kategori, status pembayaran, dan lainnya",
    computeLink: () => `#`,
  },
  4: {
    id: 4,
    icon: target,
    title: "Pertandingan",
    description: "Pengaturan scoring, hasil score babak kualifikasi, dan eliminasi",
    computeLink: (eventId) => `/dashboard/event/${eventId}/scoring-qualification`,
  },
  5: {
    id: 5,
    icon: userPlus,
    title: "Panitia",
    description: "Profil panitia, wasit/scorer",
    computeLink: () => "",
  },
  6: {
    id: 6,
    icon: fileText,
    title: "Laporan",
    description: "Laporan jumlah peserta, laporan keuangan, laporan pertandingan",
    computeLink: (eventId) => `/dashboard/event/${eventId}/reports`,
  },
  7: {
    id: 7,
    icon: branch,
    title: "Registrasi Series",
    description: "Daftarkan event Anda menjadi bagian dari series",
    computeLink: () => "#",
  },
};

export { eventMenus };
