# JND28 - Telegram Bot Game System

中文 | [English](README.md)

---

### ⚠️ Important Notice

**This project may not be perfect in details, and some details may need optimization during actual use.**

**If you find BUG or have suggestions, please contact TG** ** `https://t.me/jnd28admin` **

**Services available: Various program feature development | Program deployment | Program creation | Custom development based on existing programs**

---

A Telegram Bot-based PC28 Canadian 28 game system with complete game workflow, admin management, and blockchain payment integration.

## Project Overview

JND28 Bot is a fully functional Telegram game bot system integrated with Canadian PC28 number game gameplay. The system uses a front-end and back-end separation architecture, with Node.js + Express on the backend and React + Vite + Tailwind CSS on the frontend, supporting Telegram Bot interaction and TRON blockchain payment.

### Core Features

- **Telegram Bot Integration** - Complete Bot message handling, command system, and inline keyboard interaction
- **PC28 Game System** - Supports 12+ game types, including Big/Small, Odd/Even, Triple, Pair, Straight, etc.
- **Real-time Drawing** - Automatic drawing data retrieval, supporting betting close, settlement, and prize distribution
- **Admin Management System** - React SPA admin panel with user management, bet management, fund management, etc.
- **Blockchain Payment** - Integrated TronWeb, supporting TRX/USDT queries and exchange rate conversion
- **Agent Commission System** - Complete invitation rebate and cashback mechanism
- **Risk Control System** - Supports limit control, betting close management, and permission verification

## Tech Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | >= 14.0 | Runtime Environment |
| Express | 4.18.2 | Web Framework |
| MySQL | 2.18.1 | Database Driver |
| node-telegram-bot-api | 0.60.0 | Telegram Bot API |
| TronWeb | 5.1.0 | TRON Blockchain Interaction |
| Cheerio | 1.0.0 | HTML Parsing |
| Moment.js | 2.29.4 | Time Processing |
| Canvas | 2.11.0 | Image Processing |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI Framework |
| Vite | 5.0.0 | Build Tool |
| Tailwind CSS | 3.3.5 | Style Framework |
| React Router | 6.20.0 | Route Management |
| Zustand | 4.4.7 | State Management |
| Axios | 1.6.2 | HTTP Client |
| Recharts | 2.10.3 | Chart Library |

## Project Structure

```
jnd28/
├── app.js                    # Main entry file
├── package.json              # Project dependencies
├── jnd28.sql                 # Database structure and initial data
├── config/
│   └── conf.js               # Core configuration (database, odds, limits)
├── core/                     # Core modules
├── modules/
│   ├── api/                  # API route configuration
│   ├── bot/                  # Bot command and message handling
│   ├── game/                 # Game logic processing
│   ├── routes/               # Express routes
│   ├── scheduler/            # Scheduled task service
│   └── user/                 # User services
├── utils/                    # Utility functions
├── admin-react/              # React frontend project
│   ├── src/                  # Source code
│   └── dist/                 # Build output
└── data/                     # Data storage directory
```

## Installation

### Requirements

- Node.js >= 14.0
- MySQL >= 5.7
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/your-username/jnd28.git
cd jnd28
```

### 2. Install dependencies

```bash
npm install --production
```

### 3. Configure database

```bash
# Create database
mysql -u root -p -e "CREATE DATABASE jnd28 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Import database structure
mysql -u root -p jnd28 < jnd28.sql
```

### 4. Configure project

Edit `config/conf.js` file to modify database connection configuration:

```javascript
const DATABASE_CONFIG = {
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'your_username',
        password: 'your_password',
        database: 'jnd28'
    }
};
```

### 5. Configure Telegram Bot

Configure Bot Token and group ID in the database `bot_config` table:

```sql
UPDATE bot_config SET value='YOUR_BOT_TOKEN' WHERE name='token';
UPDATE bot_config SET value='YOUR_CHAT_ID' WHERE name='chatid';
UPDATE bot_config SET value='YOUR_GROUP_ID' WHERE name='sxfqunid';
```

### 6. Start the service

```bash
./start.sh
```

Or start manually:

```bash
node app.js
```

## Usage

### Bot Commands

| Command | Description |
|---------|-------------|
| `/start` | Register account / Open personal center |
| `/help` | View help information |
| `/odds` | View odds table |
| `/invite` | Get invitation link |

### Betting Format

```
大100        # Bet Big 100 yuan
小200        # Bet Small 200 yuan
单100 双200  # Mixed betting
10押100      # Bet on point 10 for 100 yuan
梭哈大       # All-in on Big
```

### Supported Betting Shortcuts

| Shortcut | Game Type |
|----------|-----------|
| da | Big |
| xiao | Small |
| dan | Odd |
| shuang | Even |
| dd | Big Odd |
| xd | Small Odd |
| ds | Big Even |
| xs | Small Even |
| bz | Triple |
| dz | Pair |
| sz | Straight |
| jd | Extreme Big |
| jx | Extreme Small |

## Configuration

### Odds Configuration

The system supports dynamic odds configuration through the database `system_config` table:

| Config Key | Default | Description |
|------------|---------|-------------|
| peilv_dxds | 2.8 | Big/Small/Odd/Even odds |
| peilv_fushi1 | 6 | Big Odd/Small Even odds |
| peilv_fushi2 | 6 | Small Odd/Big Even odds |
| peilv_baozi | 60 | Triple odds |
| peilv_duizi | 3 | Pair odds |
| peilv_shunzi | 12 | Straight odds |
| peilv_jdjx | 12 | Extreme Big/Small odds |

### Limit Configuration

| Config Key | Default | Description |
|------------|---------|-------------|
| betMin | 10 | Minimum single bet |
| betMax | 100000 | Maximum single bet |
| xianzhu_dxds | 20000 | Big/Small/Odd/Even single bet limit |
| xianzhu_zuhe | 5000 | Combination game single bet limit |
| xianzhu_baozi | 1000 | Triple single bet limit |
| xianzhu_zongzhu | 20000 | Single period total bet limit |

### Port Configuration

The default running port can be modified in `config/conf.js`, default port is 5898.

## API Endpoints

### Authentication Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/login/username` | Admin login |
| GET | `/login/check` | Token verification |

### Data Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/table/users` | User list |
| GET | `/table/bet` | Bet list |
| GET | `/table/pay` | Deposit records |
| GET | `/table/withdrawal` | Withdrawal records |
| GET | `/table/result` | Drawing records |

### Statistics Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/chart/jr` | Today's statistics |
| GET | `/chart/all` | Overall statistics |

## Database Tables

| Table Name | Description |
|------------|-------------|
| users | User information table |
| bet | Betting records table |
| result | Drawing results table |
| pay | Deposit records table |
| withdrawal | Withdrawal records table |
| fengpan | Betting close information table |
| groupadmin | Group administrators table |
| admin | Backend administrators table |
| jiangli | Reward records table |
| bot_config | Bot configuration table |
| system_config | System configuration table |

## Admin Panel

Access URL: `http://your-server:5898/admin/`

Default credentials:
- Username: admin
- Password: admin123

**Important**: Change the default password immediately after first login.

## Development Guide

### Development Mode

```bash
# Install development dependencies
npm install

# Start backend
node app.js

# Start frontend development server
cd admin-react
npm install
npm run dev
```

### Build Production Version

```bash
cd admin-react
npm run build
```

## Security Notes

- Change all default passwords
- Keep database credentials secure
- Use HTTPS in production
- Regularly backup database
- Keep dependencies updated
- Configure firewall rules

## License

This project uses ISC license. For learning and research purposes only.

## Disclaimer

This project is for learning and research purposes only. Please comply with local laws and regulations. Do not use for illegal purposes. The developers are not responsible for any consequences resulting from the use of this software.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

## Support

For issues or suggestions, please submit on the GitHub Issues page.

---

**Note**: This project is for technical learning and research only. Do not use it for any illegal purposes.
