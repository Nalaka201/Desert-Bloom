import os
import sys
import pymysql

print("=" * 60)
print("  Aswenna.lk - Cloud MySQL Database Auto-Importer")
print("=" * 60)

host = input("Enter Cloud DB Host (e.g. mysql-xxx.aivencloud.com): ").strip()
port = input("Enter Cloud DB Port (default 3306 or Aiven port): ").strip()
port = int(port) if port else 3306
user = input("Enter Cloud DB User (e.g. avnadmin or root): ").strip()
password = input("Enter Cloud DB Password: ").strip()
db_name = input("Enter Database Name (e.g. defaultdb or farmer_system): ").strip() or "defaultdb"

sql_file_path = os.path.join(os.path.dirname(__file__), 'mysql_database.sql')

if not os.path.exists(sql_file_path):
    sql_file_path = input("Enter path to mysql_database.sql file: ").strip()

print(f"\nConnecting to cloud database '{db_name}' on {host}:{port}...")

try:
    connection = pymysql.connect(
        host=host,
        port=port,
        user=user,
        password=password,
        database=db_name,
        autocommit=True,
        ssl={'ssl': True} if 'aivencloud' in host else None
    )
    print("SUCCESS: Connected to cloud MySQL database successfully!")
    
    with open(sql_file_path, 'r', encoding='utf-8') as f:
        sql_content = f.read()

    # Clean statements
    statements = [stmt.strip() for stmt in sql_content.split(';') if stmt.strip()]

    cursor = connection.cursor()
    success_count = 0

    print("\nImporting database schema and data...")
    for stmt in statements:
        # Skip USE database statements to avoid switching away from cloud database
        if stmt.upper().startswith('USE ') or stmt.upper().startswith('CREATE DATABASE'):
            continue
        try:
            cursor.execute(stmt)
            success_count += 1
        except Exception as e:
            print(f"Notice: {e}")

    cursor.close()
    connection.close()
    print(f"\n✅ COMPLETED! Successfully executed {success_count} database queries into '{db_name}'.")
    print("Your Cloud Database is ready for backend hosting!")

except Exception as err:
    print(f"\n❌ Connection or Import Error: {err}")
