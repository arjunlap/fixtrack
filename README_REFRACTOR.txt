# FixTrack 2.0 Refactor Structure

File ini adalah hasil pecah dari `src/app/page.js` besar menjadi struktur komponen profesional.

## Cara Pakai

1. Backup dulu project Anda:
```cmd
cd C:\Users\Administrator\Desktop\FixTrack\fixtrack
git add .
git commit -m "Backup before applying refactor package"
git push
```

2. Extract isi ZIP ini ke root project:
```text
C:\Users\Administrator\Desktop\FixTrack\fixtrack
```

3. Jika Windows minta replace file, pilih replace untuk:
```text
src/app/page.js
```

4. Hapus cache dan jalankan ulang:
```cmd
rmdir /s /q .next
npm run dev
```

5. Buka:
```text
http://localhost:3000
```

## Struktur Baru

```text
src/
├ app/page.js
├ data/initialData.js
├ lib/utils.js
└ components/
   ├ layout/
   ├ shared/
   ├ dashboard/
   ├ service/
   ├ customer/
   ├ inventory/
   ├ technician/
   ├ finance/
   ├ marketing/
   └ settings/
```
