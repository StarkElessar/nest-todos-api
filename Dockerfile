# Используем официальный образ PostgreSQL
FROM postgres:latest

# Устанавливаем переменные среды для PostgreSQL
ENV POSTGRES_USER=root
ENV POSTGRES_PASSWORD=root
ENV POSTGRES_DB=todos_db

# Порт, который будет слушать PostgreSQL
EXPOSE 5432

# Команда для запуска PostgreSQL
CMD ["postgres"]