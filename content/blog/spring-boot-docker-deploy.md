---
title: "Spring Boot 生产级部署终极指南：Docker + Nginx + 性能调优，抄作业就行"
date: "2026-06-15"
category: "tech-deep"
tags: ["Java", "Spring Boot", "Docker", "Nginx", "部署", "生产环境", "DevOps"]
description: "10年Java老兵的生产级部署方案，从Docker多阶段构建到Nginx反代，从JVM参数调优到健康检查。拿这篇文章当checklist，部署Spring Boot应用不需要踩坑。含完整Dockerfile和docker-compose.yml可直接复制使用。"
---

# Spring Boot 生产级部署终极指南：Docker + Nginx + 性能调优

## 背景：部署不应该是一场冒险

做了 10 年 Java，Spring Boot 部署搞了无数回。踩过的坑包括但不限于：Docker 镜像 1.2G 塞满磁盘、JVM OOM 半夜告警、Nginx 超时配置不对导致 502、数据库连接池耗尽……

这套方案是我踩完所有坑之后沉淀的最佳实践，**拿这篇文章当 checklist，部署不用再踩坑。**

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

---

> **相关阅读**：[Vultr VPS 选购与配置指南](/toolbox/vultr) —— 部署 Spring Boot 应用需要一台靠谱的服务器，看看我用 Vultr 的方案和对比评测。
>
> 想找人帮你部署？[看看我的服务](/services) —— 后端部署、性能优化、架构设计都可以聊。
