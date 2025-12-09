# Deploy Təlimatları

## 🚀 Vercel ilə Deploy (Tövsiyə olunur)

Vercel Next.js üçün ən yaxşı seçimdir - avtomatik, sürətli və pulsuz.

### Addımlar:

1. **GitHub-a yükləyin:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Çəltik Dəyirmanı Admin Panel"
   git branch -M main
   git remote add origin https://github.com/SIZIN-USERNAME/celtik-deyirmani.git
   git push -u origin main
   ```

2. **Vercel-ə qoşulun:**
   - [vercel.com](https://vercel.com) saytına gedin
   - "Sign Up" düyməsinə basın
   - GitHub hesabınızla giriş edin

3. **Layihəni deploy edin:**
   - Vercel dashboard-da "Add New Project" düyməsinə basın
   - GitHub repo-nuzu seçin
   - "Import" düyməsinə basın
   - Vercel avtomatik olaraq Next.js-i tanıyacaq
   - "Deploy" düyməsinə basın

4. **Hazır!** 🎉
   - Bir neçə dəqiqə sonra layihəniz canlı olacaq
   - Vercel sizə unikal URL verəcək (məsələn: `celtik-deyirmani.vercel.app`)

### Avantajlar:
- ✅ Pulsuz plan
- ✅ Avtomatik HTTPS
- ✅ Global CDN
- ✅ GitHub ilə avtomatik deploy (hər push-da yenilənir)
- ✅ Custom domain dəstəyi

---

## 🌐 Alternativ: Netlify

Netlify də yaxşı seçimdir.

### Addımlar:

1. **GitHub-a yükləyin** (yuxarıdakı addımlar)

2. **Netlify-ə qoşulun:**
   - [netlify.com](https://netlify.com) saytına gedin
   - GitHub hesabınızla giriş edin

3. **Deploy:**
   - "Add new site" → "Import an existing project"
   - GitHub repo-nuzu seçin
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - "Deploy site" düyməsinə basın

---

## 📝 GitHub-a Yükləmə (Ətraflı)

### 1. Git init (ilk dəfə)
```bash
git init
```

### 2. Bütün faylları əlavə et
```bash
git add .
```

### 3. Commit et
```bash
git commit -m "Çəltik Dəyirmanı Admin Panel - ilk versiya"
```

### 4. GitHub-da yeni repo yarat
- GitHub.com-a gedin
- "New repository" düyməsinə basın
- Repo adı: `celtik-deyirmani` (və ya istədiyiniz ad)
- Public və ya Private seçin
- "Create repository" düyməsinə basın

### 5. Remote əlavə et və push et
```bash
git remote add origin https://github.com/SIZIN-USERNAME/celtik-deyirmani.git
git branch -M main
git push -u origin main
```

---

## ⚙️ Deploy-dan əvvəl yoxlayın:

- [x] `.gitignore` düzgündür (node_modules, .next və s. ignore olunur)
- [x] `package.json` build script-ləri var
- [x] Environment variables yoxdur (lazım olsa Vercel/Netlify-də təyin edin)

---

## 🎯 Təqdimat üçün:

Deploy edildikdən sonra:
- URL-i qeyd edin
- Screenshot-lar hazırlayın
- Demo üçün hazır olun

**Uğurlar! 🚀**

