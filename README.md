# Tienda Rey – Backend

Backend del proyecto Tienda Rey, desarrollado con **Java + Spring Boot**. Expone una API RESTful para la gestión de **clientes**, **artículos** y **pedidos**, conectando con una base de datos MySQL.

## 🛠 Tecnologías

- Java 17
- Spring Boot
- Spring Data JPA
- MySQL
- Maven

## 📦 Estructura

Proyecto organizado en una arquitectura por capas:

- `controller/`: controladores REST
- `service/` y `service/impl/`: lógica de negocio
- `repository/`: acceso a base de datos (Spring Data JPA)
- `model/`: entidades JPA

## 📄 Entidades principales

- `Cliente`
- `Articulo`
- `Pedido`
- `PedidoArticulo` (entidad intermedia para manejar la relación muchos-a-muchos con cantidades)

## 🔌 Endpoints REST

- `GET /api/clientes`
- `POST /api/clientes`
- `PUT /api/clientes/{id}`
- `DELETE /api/clientes/{id}`

- `GET /api/articulos`
- `POST /api/articulos`
- `PUT /api/articulos/{id}`
- `DELETE /api/articulos/{id}`

- `GET /api/pedidos`
- `POST /api/pedidos`

## 🧱 Requisitos

- JDK 17
- Maven
- MySQL

## 🗃 Base de Datos

Nombre: rey_db

Debés crear la base de datos en tu servidor MySQL:

CREATE DATABASE rey_db;

Las tablas se generan automáticamente al correr el proyecto, si está habilitado:

spring.jpa.hibernate.ddl-auto=update

▶️ Ejecución

Clonar el repositorio:

git clone https://github.com/tu-usuario/tienda_rey_backend.git

Configurar src/main/resources/application.properties con tus credenciales de MySQL:

spring.datasource.url=jdbc://localhost:3306/rey_db  
spring.datasource.username=TU_USUARIO  
spring.datasource.password=TU_CONTRASEÑA  

spring.jpa.hibernate.ddl-auto=update  
spring.jpa.show-sql=true  

Ejecutar el proyecto:

mvn spring-boot:run

O desde tu IDE favorito (IntelliJ, Eclipse, VS Code, etc).

O desde tu IDE favorito (IntelliJ, Eclipse, VS Code, etc).
