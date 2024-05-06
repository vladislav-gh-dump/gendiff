# Вычислитель отличий

### Hexlet tests and linter status:
[![Actions Status](https://github.com/vladislav-gh-dump/frontend-project-46/actions/workflows/node-js.yml/badge.svg)](https://github.com/vladislav-gh-dump/frontend-project-46/actions)
[![Actions Status](https://github.com/vladislav-gh-dump/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/vladislav-gh-dump/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/02b3b1e5fb5f8547a5a4/maintainability)](https://codeclimate.com/github/vladislav-gh-dump/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/02b3b1e5fb5f8547a5a4/test_coverage)](https://codeclimate.com/github/vladislav-gh-dump/frontend-project-46/test_coverage)

Мой второй проект на Javascript - «Вычислитель отличий». Проект разработан в рамках обучения в [Hexlet](https://ru.hexlet.io/) на направлении [Frontend-разработчик](https://ru.hexlet.io/programs/frontend/).

## Описание
**«Вычислитель отличий»** — программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например http://www.jsondiff.com/. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменений в конфигурационных файлах.

## Возможности утилиты
 - Поддержка разных входных форматов: `yaml`, `yml`, `json`
 - Генерация отчета в виде `plain`, `stylish` и `json`

## Установка
1. Клонирование репозитория
   
    ```bash
    $ git clone https://github.com/vladislav-gh-dump/frontend-project-46.git
    ```

2. Переход в директорию проекта
   
    ```bash
    $ cd frontend-project-46
    ```

3. Установка необходимых модулей
   
    ```bash
    $ npm ci
    ```
   или

    ```bash
    $ make install
    ```

4. Установка пакета в систему
   
    ```bash
    $ npm link
    ```

## Использование
 - Получение справочной информации. 
  
    ```bash
    $ gendiff -h

    Usage: gendiff [options] <filepath1> <filepath2>

    Compares two configuration files and shows a difference. 

    Options:
    -V, --version        output the version number
    -f, --format [type]  format output (default: "stylish")
    -h, --help           display help for command
    ```

 - Определение разницы между двумя структурами данных (по-умолчанию формат вывода `stylish`)

    ```bash
    # формат stylish
    $ gendiff --format stylish filepath1 filepath2

    # тоже формат stylish
    $ gendiff filepath1 filepath2

    # формат plain
    gendiff --format plain filepath1 filepath2
    
    # формат json
    gendiff --format json filepath1 filepath2
    ```

## Примеры
### Простые структуры
[![asciicast](https://asciinema.org/a/CkY73R3UuolcSV90e1xYIt0yX.svg)](https://asciinema.org/a/CkY73R3UuolcSV90e1xYIt0yX)

### Вложенные структуры
[![asciicast](https://asciinema.org/a/jqweOt0hWFILwwW1aGzcWnBlL.svg)](https://asciinema.org/a/jqweOt0hWFILwwW1aGzcWnBlL)

### Формат `plain`
[![asciicast](https://asciinema.org/a/xScvrUAZRV7chSkELUVV7sDzC.svg)](https://asciinema.org/a/xScvrUAZRV7chSkELUVV7sDzC)

### Формат `json`
[![asciicast](https://asciinema.org/a/0vDs7qK4WVuCBbwJUcMML4GOz.svg)](https://asciinema.org/a/0vDs7qK4WVuCBbwJUcMML4GOz)

### Структуры с разным синтаксисом
[![asciicast](https://asciinema.org/a/sLUP7BRuGTpksSkHxPTtP4u8j.svg)](https://asciinema.org/a/sLUP7BRuGTpksSkHxPTtP4u8j)