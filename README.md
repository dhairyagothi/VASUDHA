# VASUDHA - Digital Farm Management Portal for MRL & AMU Monitoring

## 🚀 Smart Digital Solution for Livestock Antimicrobial Monitoring

**Problem Statement ID:** SIH25007  
**Ministry:** Fisheries, Animal Husbandry & Dairying  
**Category:** Agriculture, FoodTech & Rural Development

---

## 🎯 Project Overview

VASUDHA is a comprehensive digital platform that revolutionizes how Maximum Residue Limits (MRL) and Antimicrobial Usage (AMU) are monitored in livestock farming. Our solution combines cutting-edge technologies to ensure food safety, regulatory compliance, and sustainable farming practices.

### 🔥 Key Innovations

1. **🏷️ Smart QR-based Drug & Sample Traceability**
   - Secure QR/NFC tags for drug batches and biological samples
   - Complete chain-of-custody from farm to lab
   - Auto-logging of batch details, expiry, and manufacturer info

2. **🤖 AI-driven Risk Prediction & Farm Scorecard**
   - ML models predict MRL violation likelihood
   - Farm-specific "Residue Risk Score"
   - Actionable recommendations for farmers

3. **🌐 IoT-powered Smart Monitoring**
   - Real-time sensor networks for milk, water, and feed quality
   - ESP32/MQTT gateway integration
   - Instant alerts for contamination detection

4. **⛓️ Blockchain-based Compliance Ledger**
   - Immutable record storage for audit trails
   - International compliance (EU/US MRL standards)
   - Tamper-proof documentation

5. **🗣️ Multilingual AI Assistant**
   - Voice + text chatbot in Hindi/Marathi/English
   - Offline-first SMS/IVR fallback
   - Real-time withdrawal period guidance

---

## 🏗️ Architecture Overview

```
VASUDHA/
├── 📱 frontend/              # React + Vite web & mobile apps
│   ├── web-portal/          # Admin dashboards (Regulators, Vets)
│   ├── mobile-app/          # Farmer mobile application
│   └── shared/              # Shared components and utilities
├── 🔧 backend/              # Node.js API server
│   ├── api-server/          # Main REST API
│   ├── auth-service/        # Authentication & authorization
│   ├── worker/              # Background job processing
│   └── config/              # Configuration files
├── 🧠 ml-model/             # Python ML services
│   ├── risk-prediction/     # Risk scoring models
│   ├── anomaly-detection/   # Time-series anomaly detection
│   └── api-server/          # ML API endpoints
├── ⛓️ blockchain/           # Blockchain infrastructure
│   ├── smart-contracts/     # Compliance smart contracts
│   ├── network/             # Blockchain network config
│   └── api-bridge/          # Blockchain API interface
├── 🌐 iot-service/          # IoT data ingestion
│   ├── mqtt-broker/         # Message broker
│   ├── sensor-gateway/      # Device management
│   └── data-processor/      # Real-time processing
├── 🗄️ database/            # Database schemas & migrations
│   ├── postgres/            # Main relational database
│   ├── timeseries/         # Time-series data (IoT)
│   └── migrations/          # Database migration scripts
├── 🐳 docker/              # Containerization
└── 📚 docs/                # Documentation
```

---

## 👥 User Roles & Features

### 👨‍🌾 **Farmers**
- **Mobile-First Dashboard:** Real-time farm health overview
- **Drug Administration Logging:** QR scan → auto-log with withdrawal calculations
- **Compliance Alerts:** SMS/WhatsApp notifications for withdrawal periods
- **Multilingual Support:** Hindi/Marathi/English interface
- **Offline Capability:** Work without internet, sync later

### 👩‍⚕️ **Veterinarians**
- **Digital Prescriptions:** Electronic prescription management
- **Farm Visit Scheduling:** Calendar integration and visit logs
- **AMU Analytics:** Usage trends and recommendations
- **Withdrawal Calculator:** Precise period calculations

### 🥼 **Laboratory Personnel**
- **Sample Management:** Digital sample tracking and results upload
- **Quality Control:** Automated LOD/LOQ validation
- **Certificate Generation:** Digital certificates with signatures
- **Integration APIs:** Lab instrument connectivity

### 🏛️ **Regulatory Officers**
- **Geographic Dashboards:** Heat maps of AMU violations
- **Risk-Based Inspections:** AI-prioritized farm visits
- **Compliance Reports:** Automated regulatory reporting
- **Real-time Monitoring:** Live alerts and notifications

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Mobile:** Progressive Web App (PWA)
- **State Management:** Zustand
- **Routing:** React Router v6

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** PostgreSQL + TimescaleDB
- **Authentication:** JWT + OAuth2
- **Queue:** Redis + Bull
- **Cache:** Redis

### ML & Analytics
- **Language:** Python 3.9+
- **Framework:** FastAPI
- **ML Libraries:** Scikit-learn, XGBoost, Prophet
- **Data Processing:** Pandas, NumPy
- **Deployment:** Docker containers

### Blockchain
- **Platform:** Hyperledger Fabric
- **Smart Contracts:** JavaScript/TypeScript
- **Consensus:** PBFT (Practical Byzantine Fault Tolerance)

### IoT & Real-time
- **Protocol:** MQTT
- **Broker:** Eclipse Mosquitto
- **Hardware:** ESP32 microcontrollers
- **Sensors:** pH, temperature, conductivity

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- PostgreSQL 14+
- Docker & Docker Compose
- Redis

### 1. Clone Repository
```bash
git clone https://github.com/your-org/vasudha.git
cd vasudha
```

### 2. Environment Setup
```bash
# Copy environment templates
cp .env.example .env
cp backend/.env.example backend/.env
cp ml-model/.env.example ml-model/.env

# Install dependencies
npm run install:all
```

### 3. Database Setup
```bash
# Start PostgreSQL with Docker
docker-compose up -d postgres redis

# Run migrations
npm run db:migrate
npm run db:seed
```

### 4. Start Development Services
```bash
# Start all services
npm run dev

# Or start individual services
npm run dev:frontend    # Frontend (port 5173)
npm run dev:backend     # Backend API (port 3000)  
npm run dev:ml          # ML Service (port 8000)
npm run dev:blockchain  # Blockchain (port 7000)
npm run dev:iot         # IoT Service (port 1883)
```

### 5. Access Applications
- **Farmer Mobile:** http://localhost:5173
- **Admin Dashboard:** http://localhost:5173/admin
- **API Documentation:** http://localhost:3000/docs
- **ML API:** http://localhost:8000/docs

---

## 📊 Key Metrics & KPIs

### Compliance Metrics
- **100% Traceability:** Drug administration → animal → product sample → lab result
- **MRL Violation Rate:** < 2% (target industry standard)
- **Withdrawal Period Compliance:** > 95% adherence

### Performance Metrics
- **Mobile App Response Time:** < 2s for critical operations
- **Real-time Alert Latency:** < 30s for MRL violations
- **Offline Sync Success Rate:** > 99%
- **AI Prediction Accuracy:** > 85% for risk scoring

### User Adoption
- **Farmer Registration:** Target 10,000+ farms in pilot phase
- **Daily Active Users:** > 70% of registered farmers
- **Mobile App Rating:** > 4.5 stars
- **Support Ticket Resolution:** < 24 hours average

---

## 🧪 Testing & Quality Assurance

### Testing Strategy
- **Unit Tests:** 90%+ code coverage
- **Integration Tests:** API endpoint validation
- **E2E Tests:** Critical user workflows
- **Performance Tests:** Load testing for 10,000+ concurrent users
- **Security Tests:** OWASP compliance validation

### Data Quality
- **Lab Result Validation:** Automated LOD/LOQ checks
- **Unit Conversion:** Standardized ng/g and mg/kg comparisons
- **Data Integrity:** Blockchain-verified audit trails

---

## 🔐 Security & Compliance

### Data Protection
- **Encryption:** TLS 1.3 everywhere, field-level encryption for PII
- **Access Control:** Role-based permissions (RBAC)
- **Audit Logging:** Immutable append-only logs
- **Privacy:** GDPR-compliant data handling

### Regulatory Compliance
- **FSSAI Standards:** Updated MRL limits integration
- **WHO GLASS:** Global Antimicrobial Resistance Surveillance
- **Export Standards:** EU/US MRL compliance verification

---

## 🌍 Deployment & Scaling

### Infrastructure
- **Cloud:** AWS/GCP with auto-scaling
- **Containers:** Kubernetes orchestration
- **CDN:** CloudFront for global distribution
- **Monitoring:** Prometheus + Grafana + ELK stack

### Disaster Recovery
- **Database Backups:** Point-in-time recovery
- **Geographic Redundancy:** Multi-region deployment
- **Failover:** Automated disaster recovery

---

## 👥 Team Structure

### Core Team (6-8 people)
- **1 Product Manager:** Domain expertise in AMR/residue monitoring
- **2 Full-stack Developers:** React + Node.js
- **1 Mobile Developer:** React Native/PWA
- **1 DevOps Engineer:** Infrastructure & deployment
- **1 Data Scientist:** ML models & analytics
- **1 QA Engineer:** Testing & quality assurance
- **1 Security Engineer:** Compliance & security

---

## 📈 Roadmap

### Phase 1: MVP (Months 1-3)
- ✅ Core farm & animal management
- ✅ Drug administration logging
- ✅ Basic mobile app
- ✅ Simple analytics dashboard

### Phase 2: Advanced Features (Months 4-6)
- 🔄 AI risk prediction models
- 🔄 IoT sensor integration
- 🔄 Blockchain compliance ledger
- 🔄 Advanced analytics

### Phase 3: Scale & Integration (Months 7-12)
- 📋 National lab integration
- 📋 Multi-state deployment
- 📋 Advanced ML models
- 📋 International compliance

---

## 📞 Support & Contact

- **Documentation:** [https://vasudha-docs.com](https://vasudha-docs.com)
- **API Reference:** [https://api.vasudha.com/docs](https://api.vasudha.com/docs)
- **Support Email:** support@vasudha.com
- **Developer Chat:** [Discord Community](https://discord.gg/vasudha)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

## 🙏 Acknowledgments

- **Ministry of Fisheries, Animal Husbandry & Dairying** for the problem statement
- **Smart India Hackathon 2025** for the platform
- **Open Source Community** for the amazing tools and libraries

---

**Made with ❤️ for Indian Farmers and Food Safety**
