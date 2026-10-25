// meleeCollectionOverrides.js
// Manual overrides for melee skin -> collection slug mapping.
// Keys are skin UUIDs (s.id from public/data/skins.json).
// Values are collection slugs (slugify() output).
// These take precedence over findMeleeCollectionSlug() and deriveCollection()
// for the matching melee skin only. Gun-skin logic is unaffected.
// Keep this map sorted by skin UUID for clean git diffs.

export const MELEE_COLLECTION_OVERRIDES = {
  "12CC9ED2-4430-D2FE-3064-F7A19B1BA7C7": "standard", // Melee (default)
  "320E6E52-4F31-1857-B759-82903334D97E": "valorant-go-vol-3", // VALORANT GO! Vol. 3 Dagger
  "6FA830C2-4924-87B2-1510-2FA4FBDCA1DB": "prism", // Prism Knife
  "9103FDF7-4361-5AC5-37AE-7CB51F13F45D": "valorant-go-vol-1", // VALORANT GO! Vol. 1 Knife
  "6417E12D-4F03-13D4-8704-20BF3A1BCB5B": "sarmad", // Blade of Serket
  "B1E9530D-4618-4F2E-1B75-F1A90C91B19E": "ruination", // Broken Blade of the Ruined King
  "CD6CE089-43FA-C4DC-3F8F-0391CB604B5D": "abyssal", // Caeruleus
  "8E760310-4D95-354B-A910-049EAA4D2FC6": "nunca-olvidados", // Catrina x
  "2E4300F9-49B3-6BBE-AF7C-94A6F56FF12E": "kohaku-matsuba", // Equilibrium
  "C91E4850-4D32-3B12-F411-3E9F644EA616": "undercity", // Hack
  "81B1F855-4F18-382B-A06E-DEAD577FDF49": "holo-meridian", // Holoflare
  "5724CD18-458B-AF3D-B60A-239C5A8C081A": "tigris", // Hu Else
  // "1CD09FBD-43CB-A5F6-90FA-08994342D747": "ignite", // Ignite Fan // This is from a capsule. It is solo
  "CE1A391F-4819-DC71-8A23-0E95B0B79AEF": "holomoku", // Kaimana
  "987E847D-47D2-6AB3-2369-0497B6C39A7E": "ayakashi", // Kogitsune
  "07409307-46CC-98DB-EC92-CEB04A865F73": "luna", // Luna's Descent
  "8330A4C0-4E98-1CB7-9695-6B998B77138D": "piedra-del-sol", // Obsidiana
  "4E7342A5-4820-2D79-A488-0FA51A4357F7": "oni", // Onimaru Kunitsuna
  "239ED20B-479C-E08E-C4B5-6BA0394576D4": "protocol-781-a", // Personal Administrative Melee Unit
  "F0BA8044-4964-BA1F-7F0F-E68DC2118D42": "radiant-entertainment-system", // Power Fist
  "F4E40444-43F3-E6F7-3271-BDB7D1492B05": "tethered-realms", // Prosperity
  "62A52D27-4C08-104C-3BD0-22BE86848CC3": "valiant-hero", // Ruyi Staff
  "12CC9ED2-4430-D2FE-3064-F7A19B1BA7C7": "standard", // Melee
  "1B8DE6D7-4F37-7170-ACD7-E78829F7959A": "chronovoid", // Terminus A Quo
  // "9A98F7DD-426C-603E-0569-E9B317C25EE4": "vct-lock-in-miserico-rdia", // VCT LOCK//IN Misericórdia // This is from a capsule. It is solo
  "400BB847-4F4F-A39E-CD52-589F00B2204F": "spectrum", // Waveform
  "D034911C-45A6-1CE4-E6F5-4CBE57E9D4F1": "valorant-go-vol-2", // Yoru's Stylish Butterfly Comb
  "A03598B3-4879-3380-EB4C-D6B2D29DD565": "sentinels-of-light", // Relic Stone Daggers
};