# Giai đoạn build
FROM maven:3.8.7-amazoncorretto-17 AS build
WORKDIR /app

# Copy pom.xml trước để cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline || echo "Maven dependency failed"

# Copy toàn bộ source code
COPY . .

# Build ứng dụng, tạo file .jar trong thư mục target/
RUN mvn clean package -DskipTests

# Debug: Kiểm tra file .jar có được tạo chưa
RUN ls -lh target/ || echo "No target directory found"

# Giai đoạn runtime
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy file .jar từ giai đoạn build sang container runtime
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
