import json
import os
import sqlite3
import re

datos_unificados = []

# Ruta a la carpeta que contiene los archivos JSON
carpeta = 'e:/Mis proyectos/OrganizadorDeComidas-React/ConverterToSqlite/recetas/'

# Recorre cada archivo en la carpeta y agrega los datos a la lista unificada
for archivo in os.listdir(carpeta):
    if archivo.endswith('.json'):
        with open(carpeta + archivo) as f:
            datos = json.load(f)
            datos_unificados.extend(datos)


with open('e:/Mis proyectos/OrganizadorDeComidas-React/ConverterToSqlite/datos_unificados.json', 'w') as f:
    json.dump(datos_unificados, f)


conexion = sqlite3.connect('e:/Mis proyectos/OrganizadorDeComidas-React/ConverterToSqlite/Comidas.db')
cursor = conexion.cursor()
cursor.execute('DROP TABLE IF EXISTS Comidas')
cursor.execute('CREATE TABLE Comidas (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre varchar, ingredientes text, receta text)')

patron = r'\d+\. '
for fila in datos_unificados:
     if 'receta' in fila: 
        fila['receta'] = [re.sub(patron, '', paso) for paso in fila['receta']]

for fila in datos_unificados:
        if 'instrucciones' in fila:
            cursor.execute('INSERT INTO Comidas (nombre, ingredientes, receta) VALUES (?, ?, ?)', (fila['nombre'], str(fila['ingredientes']), str(fila['instrucciones'])))
        elif 'receta' in fila:
            cursor.execute('INSERT INTO Comidas (nombre, ingredientes, receta) VALUES (?, ?, ?)', (fila['nombre'], str(fila['ingredientes']), str(fila['receta'])))
        else:
            cursor.execute('INSERT INTO Comidas (nombre, ingredientes, receta) VALUES (?, ?, ?)', (fila['nombre'], str(fila['ingredientes']), str(fila['preparacion'])))

conexion.commit()
conexion.close()
