// Datos extraídos de la release v2026.08.06 de https://github.com/Abdess/retrobios/releases/latest
// Actualiza esto cuando salga una nueva versión: solo hace falta cambiar VERSION y las URLs/tamaños.

const VERSION = "v2026.08.06";
const RELEASE_BASE = `https://github.com/Abdess/retrobios/releases/download/${VERSION}/`;

const PLATFORMS = [
  {
    id: "batocera",
    name: "Batocera",
    version: "43.1",
    extract: "/userdata/bios/",
    full: { files: 1600, size: "2.0 GB", parts: ["Batocera_43.1_BIOS_Pack.zip.001", "Batocera_43.1_BIOS_Pack.zip.002"] },
    lite: { files: 353, size: "681 MB", parts: ["Batocera_43.1_Platform_BIOS_Pack.zip"] },
    color: "#00f0ff"
  },
  {
    id: "bizhawk",
    name: "BizHawk",
    version: "2.11.1",
    extract: "Firmware/",
    full: { files: 537, size: "1.3 GB", parts: ["BizHawk_2.11.1_BIOS_Pack.zip"] },
    lite: { files: 118, size: "546 MB", parts: ["BizHawk_2.11.1_Platform_BIOS_Pack.zip"] },
    color: "#ff2e9d"
  },
  {
    id: "emudeck",
    name: "EmuDeck",
    version: "2.3.8",
    extract: "~/Emulation/bios/",
    full: { files: 524, size: "1.2 GB", parts: ["EmuDeck_2.3.8_BIOS_Pack.zip"] },
    lite: { files: 34, size: "45 MB", parts: ["EmuDeck_2.3.8_Platform_BIOS_Pack.zip"] },
    color: "#ffcc00"
  },
  {
    id: "retroarch",
    name: "RetroArch / Lakka",
    version: "v1.22.2",
    extract: "system/",
    full: { files: 4319, size: "2.6 GB", parts: ["RetroArch_Lakka_v1.22.2_BIOS_Pack.zip.001", "RetroArch_Lakka_v1.22.2_BIOS_Pack.zip.002"] },
    lite: { files: 3248, size: "596 MB", parts: ["RetroArch_Lakka_v1.22.2_Platform_BIOS_Pack.zip"] },
    color: "#7c4dff"
  },
  {
    id: "mister",
    name: "MiSTer FPGA",
    version: "2026-07-27",
    extract: "/media/fat/games/",
    full: { files: 65, size: "16 MB", parts: ["MiSTer_FPGA_2026-07-27_BIOS_Pack.zip"] },
    lite: { files: 65, size: "16 MB", parts: ["MiSTer_FPGA_2026-07-27_Platform_BIOS_Pack.zip"] },
    color: "#00f0ff"
  },
  {
    id: "rocknix",
    name: "ROCKNIX",
    version: "20260801",
    extract: "/storage/roms/bios/",
    full: { files: 1489, size: "2.6 GB", parts: ["ROCKNIX_20260801_BIOS_Pack.zip.001", "ROCKNIX_20260801_BIOS_Pack.zip.002"] },
    lite: { files: 38, size: "398 MB", parts: ["ROCKNIX_20260801_Platform_BIOS_Pack.zip"] },
    color: "#ff6b35"
  },
  {
    id: "recalbox",
    name: "Recalbox",
    version: "10.0.8",
    extract: "/recalbox/share/bios/",
    full: { files: 1180, size: "1.6 GB", parts: ["Recalbox_10.0.8_BIOS_Pack.zip"] },
    lite: { files: 346, size: "92 MB", parts: ["Recalbox_10.0.8_Platform_BIOS_Pack.zip"] },
    color: "#ff2e9d"
  },
  {
    id: "retrobat",
    name: "RetroBat",
    version: "8.1.2",
    extract: "bios/",
    full: { files: 1234, size: "2.5 GB", parts: ["RetroBat_8.1.2_BIOS_Pack.zip.001", "RetroBat_8.1.2_BIOS_Pack.zip.002"] },
    lite: { files: 341, size: "91 MB", parts: ["RetroBat_8.1.2_Platform_BIOS_Pack.zip"] },
    color: "#ffcc00"
  },
  {
    id: "retrodeck",
    name: "RetroDECK",
    version: "0.10.9b",
    extract: "~/retrodeck/",
    full: { files: 3262, size: "3.3 GB", parts: ["RetroDECK_0.10.9b_BIOS_Pack.zip.001", "RetroDECK_0.10.9b_BIOS_Pack.zip.002"] },
    lite: { files: 2008, size: "787 MB", parts: ["RetroDECK_0.10.9b_Platform_BIOS_Pack.zip"] },
    color: "#7c4dff"
  },
  {
    id: "retropie",
    name: "RetroPie",
    version: "v1.22.2",
    extract: "~/RetroPie/BIOS/",
    archived: true,
    full: { files: 4319, size: "2.6 GB", parts: ["RetroPie_v1.22.2_BIOS_Pack.zip.001", "RetroPie_v1.22.2_BIOS_Pack.zip.002"] },
    lite: { files: 3248, size: "596 MB", parts: ["RetroPie_v1.22.2_Platform_BIOS_Pack.zip"] },
    color: "#00f0ff"
  },
  {
    id: "romm",
    name: "RomM",
    version: "5.1.0",
    extract: "bios/{platform_slug}/",
    full: { files: 543, size: "839 MB", parts: ["RomM_5.1.0_BIOS_Pack.zip"] },
    lite: { files: 374, size: "351 MB", parts: ["RomM_5.1.0_Platform_BIOS_Pack.zip"] },
    color: "#ff6b35"
  }
];

const STANDALONE = [
  {
    id: "mesence",
    name: "MesenCE",
    note: "Extraer en la carpeta del propio emulador",
    files: 34,
    size: "2 MB",
    parts: ["MesenCE_BIOS_Pack.zip"],
    color: "#ff2e9d"
  },
  {
    id: "lexaloffle",
    name: "PICO-8 / Voxatron",
    note: "Extraer en la carpeta del propio emulador",
    files: 7,
    size: "18 MB",
    parts: ["Lexaloffle_BIOS_Pack.zip"],
    color: "#ffcc00"
  }
];
