---
title: "Spring Boot + Docker + Nginx 生产级部署实战"
date: "2026-06-15"
category: "tech-deep"
tags: ["Java", "Spring Boot", "Docker", "Nginx", "部署"]
description: "从 Dockerfile 编写到 Nginx 反代，再到监控告警，一篇搞定 Spring Boot 应用的生产级部署。"
---

# Spring Boot + Docker + Nginx 生产级部署实战

## 背景

做了 10 年 Java，Spring Boot 部署搞了无数回。这套方案是我踩过无数坑后的最佳实践，直接拿去用。

## 项目结构

```
project/
├── Dockerfile
├── docker-compose.yml
├── nginx/
│   └── conf.d/
│       └── app.conf
├── src/
└── pom.xml
```

## Dockerfile — 多阶段构建

```dockerfile
# 第一阶段：构建
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# 第二阶段：运行
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

## Docker Compose — 一键编排

```yaml
version: '3.8'
services:
  app:
    build: .
    container_name: spring-app
    restart: always
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - DB_URL=jdbc:mysql://db:3306/mydb
    ports:
      - "8080:8080"
    depends_on:
      db:
        condition: service_healthy

  db:
    image: mysql:8.0
    container_name: mysql-db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
      MYSQL_DATABASE: mydb
    volumes:
      - mysql_data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  mysql_data:
```

## Nginx 反代配置

```nginx
server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 关键生产配置

### 1. JVM 参数

```bash
java -jar app.jar \
  -Xms512m -Xmx1024m \
  -XX:+UseG1GC \
  -XX:MaxGCPauseMillis=200 \
  -Djava.security.egd=file:/dev/./urandom
```

### 2. 健康检查

```java
@RestController
public class HealthController {
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP"));
    }
}
```

## 总结

这套方案的核心思路：
1. **多阶段构建**减少镜像体积
2. **Docker Compose**管理服务间依赖
3. **Nginx 反代**处理 SSL 和负载均衡
4. **健康检查**确保容器编排正常

能满足大部分中小型项目的部署需求。有问题欢迎交流 🤝
