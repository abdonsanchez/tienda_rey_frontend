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

### Nombre: rey_db

### Pasos para configurar y ejecutar el proyecto

1. **Crear la base de datos en tu servidor MySQL:**

    ```sql
    CREATE DATABASE rey_db;
    ```

2. **Configuración automática de tablas**

    Las tablas se generan automáticamente al correr el proyecto, si está habilitado:

    ```properties
    spring.jpa.hibernate.ddl-auto=update
    ```

3. **▶️ Ejecución**

    - Clonar el repositorio:

        ```bash
        git clone https://github.com/tu-usuario/tienda_rey_backend.git
        ```

    - Configurar `src/main/resources/application.properties` con tus credenciales de MySQL:

        ```properties
        spring.datasource.url=jdbc:mysql://localhost:3306/rey_db
        spring.datasource.username=TU_USUARIO
        spring.datasource.password=TU_CONTRASEÑA

        spring.jpa.hibernate.ddl-auto=update
        spring.jpa.show-sql=true
        ```

    - Ejecutar el proyecto:

        ```bash
        mvn spring-boot:run
        ```

    - O desde tu IDE favorito (IntelliJ, Eclipse, VS Code, etc).
