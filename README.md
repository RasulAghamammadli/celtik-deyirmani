# Çəltik Dəyirmanı - Admin Panel

Müasir və responsiv admin panel sistemi çəltik dəyirmanı idarəetməsi üçün.

## Xüsusiyyətlər

- 🔐 **Giriş Sistemi** - Təhlükəsiz autentifikasiya
- 📊 **Statistika Dashboard** - Real-vaxt məlumatlar və diaqramlar
- 📹 **Avadanlıq Nəzarəti** - Video nəzarət və iş yükü monitorinqi
- 💾 **Məlumat Bazası** - İstehsal məlumatlarının idarəetməsi
- 📈 **Hesabat Sistemi** - Günlük, həftəlik, aylıq və illik hesabatlar

## Texnologiyalar

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI komponentləri
- **Recharts** - Diaqramlar və qrafiklər
- **Lucide React** - İkonlar

## Quraşdırma

1. Dependencies quraşdırın:
```bash
npm install
```

2. Development serveri işə salın:
```bash
npm run dev
```

3. Brauzerdə açın: [http://localhost:3000](http://localhost:3000)

## Giriş Məlumatları

**Demo hesab:**
- İstifadəçi adı: `admin`
- Şifrə: `admin`

## Struktur

```
├── app/
│   ├── dashboard/      # Statistika səhifəsi
│   ├── equipment/      # Avadanlıq nəzarəti
│   ├── database/       # Məlumat bazası
│   ├── reports/        # Hesabatlar
│   └── login/          # Giriş səhifəsi
├── components/
│   ├── ui/             # shadcn/ui komponentləri
│   └── layout/         # Layout komponentləri
└── lib/                # Utility funksiyaları
```

## Responsiv Dizayn

Panel tam responsivdir və bütün cihazlarda (mobil, planşet, desktop) optimal işləyir.

## İnkişaf

Bu layihə demo məqsədlə yaradılıb. Real məlumatlar və API inteqrasiyası üçün əlavə inkişaf tələb olunur.

