# Amrutha Developers

A React + Vite frontend application coupled with a Node/Express backend API connected to MongoDB.

---

## 🚀 Production Deployment Guide (VPS)

Follow these instructions to safely deploy or update the website on the VPS without losing database storage or affecting other hosted websites.

### ⚠️ Critical Safeguards
* **Database Preservation:** Do **NOT** run `node seed.js` (under the `server` directory) during normal redeployments/updates. Running it will wipe/reset your MongoDB collections. It is only meant for the first-time setup.
* **Port Conflict Prevention:** The backend API runs on port **`5008`**. Ensure no other applications on the VPS try to bind to this port.
* **Isolate Nginx Configurations:** Ensure you configure `amruthadevelopers.com` in its own Nginx server block under `/etc/nginx/sites-available/` and symlink it correctly.

---

### First-Time Setup on VPS

1. **Clone the repository:**
   ```bash
   cd /var/www
   git clone https://github.com/doraswamyraju/amrutha.git
   cd amrutha
   ```

2. **Configure Environment Variables:**
   Create a `.env` file inside the `server/` directory:
   ```bash
   nano server/.env
   ```
   Add the following content (update database credentials if different):
   ```env
   PORT=5008
   MONGODB_URI=mongodb://admin:MySecurePassword123@127.0.0.1:27017/amrutha?authSource=admin
   ```

3. **Install Dependencies & Seed Initial Data (Only Once):**
   ```bash
   cd server
   npm install
   node seed.js # WARNING: Only run this on first setup. Wipes existing data.
   cd ..
   ```

4. **Build Frontend & Start Server:**
   ```bash
   npm install
   npm run build
   pm2 start server/server.js --name amrutha-api
   ```

---

### Subsequent Updates / Redeployments

To pull the latest changes, compile the React build, and restart the backend safely:

```bash
cd /var/www/amrutha

# 1. Pull the latest code updates
git pull origin main

# 2. Build the new frontend production bundle
npm run build

# 3. Reload the backend app with PM2 (zero downtime)
pm2 reload amrutha-api
```

---

### Nginx Routing & Reverse Proxy Config
Create `/etc/nginx/sites-available/amruthadevelopers.com`:

```nginx
server {
    listen 80;
    server_name amruthadevelopers.com www.amruthadevelopers.com;

    root /var/www/amrutha/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Reverse proxy API calls to port 5008
    location /api/ {
        proxy_pass http://127.0.0.1:5008/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
}
```

Enable config and verify:
```bash
ln -s /etc/nginx/sites-available/amruthadevelopers.com /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx
```
Enable SSL using Certbot:
```bash
certbot --nginx -d amruthadevelopers.com -d www.amruthadevelopers.com
```
