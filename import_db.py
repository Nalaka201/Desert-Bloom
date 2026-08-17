import os
import sys
import re
from urllib.parse import urlparse
import pymysql

print("=" * 60)
print("  Aswenna.lk - Cloud MySQL Database Auto-Importer")
print("=" * 60)

raw_input_host = input("Enter Cloud DB Host (or full Service URI): ").strip()

# If user pasted a full mysql:// URI
if raw_input_host.startswith("mysql://"):
    parsed = urlparse(raw_input_host)
    host = parsed.hostname
    port = parsed.port or 3306
    user = parsed.username or "avnadmin"
    password = parsed.password or ""
    db_name = parsed.path.lstrip('/') if parsed.path else "defaultdb"
    print(f"\nParsed Service URI successfully!")
else:
    # Clean host if it includes protocol
    host = re.sub(r'^https?://', '', raw_input_host)
    host = host.split('/')[0].split(':')[0]
    
    port_input = input("Enter Cloud DB Port (default 3306 or Aiven port): ").strip()
    port = int(port_input) if port_input else 3306
    user = input("Enter Cloud DB User (e.g. avnadmin or root): ").strip() or "avnadmin"
    password = input("Enter Cloud DB Password: ").strip()
    db_input = input("Enter Database Name (default 'defaultdb'): ").strip()
    db_name = db_input if db_input else "defaultdb"

sql_file_path = os.path.join(os.path.dirname(__file__), 'mysql_database.sql')

print(f"\nConnecting to cloud database '{db_name}' at {host}:{port} as user '{user}'...")

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
    print("✅ SUCCESS: Connected to cloud MySQL database successfully!")
    
    with open(sql_file_path, 'r', encoding='utf-8') as f:
        sql_content = f.read()

    # Clean statements
    statements = [stmt.strip() for stmt in sql_content.split(';') if stmt.strip()]

    cursor = connection.cursor()
    success_count = 0

    print("\nImporting database schema and sample data...")
    for stmt in statements:
        if stmt.upper().startswith('USE ') or stmt.upper().startswith('CREATE DATABASE'):
            continue
        try:
            cursor.execute(stmt)
            success_count += 1
        except Exception as e:
            print(f"Notice: {e}")

    cursor.close()
    connection.close()
    print(f"\n🎉 COMPLETED! Successfully executed {success_count} queries into database '{db_name}'.")
    print("Your Cloud Database is now ready for deployment!")

except Exception as err:
    print(f"\n❌ Connection or Import Error: {err}")
