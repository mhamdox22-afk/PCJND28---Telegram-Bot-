# JND28 - Telegram Bot 游戏系统

[English](README_EN.md) | 中文

---

### ⚠️ 重要提示

**此项目细节可能不够完善，需要实际运用中才会发现部分细节需要优化。**

**如有 BUG 或好的建议请联系 TG** `https://t.me/jnd28admin` 

**可接业务：各种程序功能开发 | 程序部署 | 程序制作 | 各种现有程序基础上功能定制开发**

---

基于 Telegram Bot 的 PC28 加拿大28 TG机器人游戏系统，支持完整的游戏流程、后台管理和区块链支付集成。

## 项目概述

JND28 Bot 是一个功能完整的 Telegram 游戏机器人系统，集成了加拿大 PC28 数字游戏玩法。系统采用前后端分离架构，后端使用 Node.js + Express，前端使用 React + Vite + Tailwind CSS，支持 Telegram Bot 交互和 TRON 区块链支付。

### 核心特性

- **Telegram Bot 集成** - 完整的 Bot 消息处理、命令系统和内联键盘交互
- **PC28 游戏系统** - 支持 12+ 种玩法，包括大小单双、豹子、对子、顺子等
- **实时开奖** - 自动获取开奖数据，支持封盘、结算、派奖全流程
- **后台管理系统** - React SPA 后台，支持用户管理、注单管理、资金管理等功能
- **区块链支付** - 集成 TronWeb，支持 TRX/USDT 查询和汇率转换
- **代理佣金系统** - 完整的邀请返佣和返水机制
- **风控系统** - 支持限额控制、封盘管理和权限验证

## 技术栈

### 后端

| 技术 | 版本 | 用途 |
|------|------|------|
| Node.js | >= 14.0 | 运行环境 |
| Express | 4.18.2 | Web 框架 |
| MySQL | 2.18.1 | 数据库驱动 |
| node-telegram-bot-api | 0.60.0 | Telegram Bot API |
| TronWeb | 5.1.0 | TRON 区块链交互 |
| Cheerio | 1.0.0 | HTML 解析 |
| Moment.js | 2.29.4 | 时间处理 |
| Canvas | 2.11.0 | 图片处理 |

### 前端

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.2.0 | UI 框架 |
| Vite | 5.0.0 | 构建工具 |
| Tailwind CSS | 3.3.5 | 样式框架 |
| React Router | 6.20.0 | 路由管理 |
| Zustand | 4.4.7 | 状态管理 |
| Axios | 1.6.2 | HTTP 客户端 |
| Recharts | 2.10.3 | 图表库 |

## 项目结构

```
jnd28/
├── app.js                    # 主入口文件
├── package.json              # 项目依赖配置
├── jnd28.sql                 # 数据库结构和初始数据
├── config/
│   └── conf.js               # 核心配置（数据库、赔率、限额）
├── core/                     # 核心模块
├── modules/
│   ├── api/                  # API 路由配置
│   ├── bot/                  # Bot 命令和消息处理
│   ├── game/                 # 游戏逻辑处理
│   ├── routes/               # Express 路由
│   ├── scheduler/            # 定时任务服务
│   └── user/                 # 用户服务
├── utils/                    # 工具函数
├── admin-react/              # React 前端项目
│   ├── src/                  # 源代码
│   └── dist/                 # 构建输出
└── data/                     # 数据存储目录
```

## 安装步骤

### 环境要求

- Node.js >= 14.0
- MySQL >= 5.7
- npm 或 yarn

### 1. 克隆项目

```bash
git clone https://github.com/your-username/jnd28.git
cd jnd28
```

### 2. 安装依赖

```bash
npm install --production
```

### 3. 配置数据库

```bash
# 创建数据库
mysql -u root -p -e "CREATE DATABASE jnd28 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 导入数据库结构
mysql -u root -p jnd28 < jnd28.sql
```

### 4. 配置项目

编辑 `config/conf.js` 文件，修改数据库连接配置：

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

### 5. 配置 Telegram Bot

在数据库 `bot_config` 表中配置 Bot Token 和群组 ID：

```sql
UPDATE bot_config SET value='YOUR_BOT_TOKEN' WHERE name='token';
UPDATE bot_config SET value='YOUR_CHAT_ID' WHERE name='chatid';
UPDATE bot_config SET value='YOUR_GROUP_ID' WHERE name='sxfqunid';
```

### 6. 启动服务

```bash
./start.sh
```

或手动启动：

```bash
node app.js
```

## 使用方法

### Bot 命令

| 命令 | 说明 |
|------|------|
| `/start` | 注册账号 / 打开个人中心 |
| `/help` | 查看帮助信息 |
| `/odds` | 查看赔率表 |
| `/invite` | 获取邀请链接 |

### 下注格式

```
大100        # 下注大 100 元
小200        # 下注小 200 元
单100 双200  # 混合下注
10押100      # 押 10 点 100 元
梭哈大       # 全部余额下注大
```

### 支持的玩法简写

| 简写 | 玩法 |
|------|------|
| da | 大 |
| xiao | 小 |
| dan | 单 |
| shuang | 双 |
| dd | 大单 |
| xd | 小单 |
| ds | 大双 |
| xs | 小双 |
| bz | 豹子 |
| dz | 对子 |
| sz | 顺子 |
| jd | 极大 |
| jx | 极小 |

## 配置说明

### 赔率配置

系统支持通过数据库 `system_config` 表动态配置赔率：

| 配置键 | 默认值 | 说明 |
|--------|--------|------|
| peilv_dxds | 2.8 | 大小单双赔率 |
| peilv_fushi1 | 6 | 大单小双赔率 |
| peilv_fushi2 | 6 | 小单大双赔率 |
| peilv_baozi | 60 | 豹子赔率 |
| peilv_duizi | 3 | 对子赔率 |
| peilv_shunzi | 12 | 顺子赔率 |
| peilv_jdjx | 12 | 极大极小赔率 |

### 限额配置

| 配置键 | 默认值 | 说明 |
|--------|--------|------|
| betMin | 10 | 单笔最小下注 |
| betMax | 100000 | 单笔最大下注 |
| xianzhu_dxds | 20000 | 大小单双单注限额 |
| xianzhu_zuhe | 5000 | 组合玩法单注限额 |
| xianzhu_baozi | 1000 | 豹子单注限额 |
| xianzhu_zongzhu | 20000 | 单期总注限额 |

### 端口配置

默认运行端口可在 `config/conf.js` 中修改，默认端口为 5898。

## API 接口

### 认证接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/login/username` | 管理员登录 |
| GET | `/login/check` | Token 验证 |

### 数据接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/table/users` | 用户列表 |
| GET | `/table/bet` | 注单列表 |
| GET | `/table/pay` | 充值记录 |
| GET | `/table/withdrawal` | 提现记录 |
| GET | `/table/result` | 开奖记录 |

### 统计接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/chart/jr` | 今日统计 |
| GET | `/chart/all` | 总体统计 |

## 数据库表结构

| 表名 | 说明 |
|------|------|
| users | 用户信息表 |
| bet | 下注记录表 |
| result | 开奖结果表 |
| pay | 充值记录表 |
| withdrawal | 提现记录表 |
| fengpan | 封盘信息表 |
| groupadmin | 群管理员表 |
| admin | 后台管理员表 |
| jiangli | 奖励记录表 |
| bot_config | Bot 配置表 |
| system_config | 系统配置表 |

## 管理后台

访问地址：`http://your-server:5898/admin/`

默认账号：
- 用户名：admin
- 密码：admin123

**重要**：首次登录后请立即修改默认密码。

## 开发指南

### 开发模式

```bash
# 安装开发依赖
npm install

# 启动后端
node app.js

# 启动前端开发服务器
cd admin-react
npm install
npm run dev
```

### 构建生产版本

```bash
cd admin-react
npm run build
```

## 安全注意事项

- 修改所有默认密码
- 保护好数据库凭据
- 生产环境使用 HTTPS
- 定期备份数据库
- 及时更新依赖包
- 配置防火墙规则

## 许可证

本项目采用 ISC 许可证。仅供学习和研究使用。

## 免责声明

本项目仅供学习和研究使用。请遵守当地法律法规，不得用于非法用途。开发者不对使用本软件产生的任何后果负责。

## 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 支持

如有问题或建议，请在 GitHub Issues 页面提交。

---

**注意**: 本项目仅供技术学习和研究，请勿用于任何违反法律法规的用途。
