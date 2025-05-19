# Weather Subscription Service | Сервіс підписки на погоду

## Overview | Огляд

**EN:** A service for subscribing to regular weather forecast updates for selected cities. The system allows users to create subscriptions for weather updates with customizable frequency.

**UK:** Сервіс для підписки на регулярні оновлення прогнозу погоди у вибраному місті. Система дозволяє користувачам створювати підписки на оновлення погоди з налаштовуваною частотою.

**Technology | Технологія:** Node.js

## Getting Started | Початок роботи

**EN:** To launch the project, run the script:

```
./docker-dev.sh
```

**UK:** Щоб підняти проєкт, виконайте скрипт:

```
./docker-dev.sh
```

## 📦 Service Structure | Структура сервісів

### subscription-service

**EN:** REST API responsible for:

- Creating subscriptions
- Confirming subscriptions
- Cancelling subscriptions

**UK:** REST API, відповідальне за:

- створення підписки
- підтвердження підписки
- скасування підписки

### scheduler

**EN:** Background process that performs periodic tasks (cron jobs):

- Retrieves subscriptions from the database based on delivery frequency
- Requests current weather forecasts from external APIs
- Sends emails to respective users

**UK:** Фоновий процес, що виконує періодичні задачі (cron jobs):

- отримує з бази даних підписки з відповідною частотою надсилання
- запитує актуальний прогноз погоди із зовнішніх API
- надсилає імейли відповідним користувачам

## 🔧 Potential Improvements | Потенційні покращення

**EN:** To enhance the system's scalability and fault tolerance, we can integrate a message broker:

1. The scheduler extracts a list of subscriptions to be processed
2. Instead of immediately sending emails, it publishes tasks to a queue
3. A separate process (worker) processes tasks from the queue and sends messages

This approach provides:

- Load balancing capabilities
- Simplified horizontal scaling
- Retry mechanisms in case of failures
- Better resilience against service outages

**UK:** Для підвищення масштабованості та відмовостійкості системи можна інтегрувати брокера повідомлень:

1. Scheduler витягує список підписок, які потрібно обробити
2. Замість негайного надсилання імейлів, він публікує задачі у чергу
3. Окремий процес (worker) обробляє задачі з черги та надсилає повідомлення

Цей підхід:

- дозволяє балансувати навантаження
- спрощує горизонтальне масштабування
- забезпечує повторні спроби у випадку помилок
- підвищує стійкість до збоїв сервісів

## 📂 Technology Stack | Технології

**EN:**

- Node.js - JavaScript runtime environment
- Express - Web application framework
- PostgreSQL - Relational database
- Docker & Docker Compose - Containerization
- Nodemailer - Email sending library
- Cron - Scheduling library

**UK:**

- Node.js - середовище виконання JavaScript
- Express - фреймворк для веб-застосунків
- PostgreSQL - реляційна база даних
- Docker & Docker Compose - контейнеризація
- Nodemailer - бібліотека для надсилання електронної пошти
- Cron - бібліотека для планування завдань
