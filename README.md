#Crear un Microservicio que exponga una API Rest que permita realizar un ABM de “Cursos de Formación”. Se propone que la implementación se realice de acuerdo a los métodos GET-POST-PUT-DELETE. Se empleará “Course” como nombre del recurso. en python


#El presente microservicio está elaborado en Python utilizando Flask, que es un marco de trabajo ligero para la creación de aplicaciones web. Este microservicio permitirá realizar operaciones de ABM (Alta, Baja, Modificación) en “Cursos de Formación”.

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'  # Configura tu base de datos aquí
db = SQLAlchemy(app)

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200))

@app.route('/course', methods=['POST'])
def create_course():
    data = request.get_json()
    new_course = Course(name=data['name'], description=data['description'])
    db.session.add(new_course)
    db.session.commit()
    return jsonify({'message': 'Curso creado exitosamente!'})

@app.route('/course', methods=['GET'])
def get_courses():
    courses = Course.query.all()
    return jsonify([{'id': course.id, 'name': course.name, 'description': course.description} for course in courses])

@app.route('/course/<course_id>', methods=['PUT'])
def update_course(course_id):
    data = request.get_json()
    course = Course.query.get(course_id)
    course.name = data['name']
    course.description = data['description']
    db.session.commit()
    return jsonify({'message': 'Curso actualizado exitosamente!'})

@app.route('/course/<course_id>', methods=['DELETE'])
def delete_course(course_id):
    course = Course.query.get(course_id)
    db.session.delete(course)
    db.session.commit()
    return jsonify({'message': 'Curso eliminado exitosamente!'})

if __name__ == '__main__':
    app.run(debug=True)

#Este código crea un modelo de base de datos para los cursos con un id, name y description. Luego, define rutas para crear, obtener, actualizar y eliminar cursos.

pip install flask flask_sqlalchemy


#Configurando la base de datos en Windows, aqui estamos usando una ruta absoluta al archivo de base de datos.

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///C:\\ruta\\a\\tu\\base\\de\\datos.db'

#En este caso, C:\\ruta\\a\\tu\\base\\de\\datos.db es la ruta al archivo de la base de datos en el sistema. 
#Para consumir los servicios con Postman, se puede seguir estos pasos:

#Iniciar el servidor: Primero, hay que asegúrse de que el servidor Flask está en ejecución. Si está ejecutando el script de Python desde la línea de comandos, deberíamos ver algo como esto: * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit). Esto significa que el servidor está en ejecución y escuchando las solicitudes en http://127.0.0.1:5000.

#Configurar Postman: Abrir Postman y siguir estos pasos para cada operación:

#GET (Obtener cursos): Selecciona GET como método, introduce http://127.0.0.1:5000/course en la barra de URL y presionar Send.

#POST (Crear un curso): Selecciona POST como método, introducir http://127.0.0.1:5000/course en la barra de URL, seleccionar Body -> raw -> JSON, y en el área de texto introducir los detalles del curso en formato JSON, por ejemplo: {"name": "Curso 1", "description": "Descripción del curso"}. Luego, presionar Send.

#PUT (Actualizar un curso): Seleccionar PUT como método, introducir http://127.0.0.1:5000/course/<course_id> en la barra de URL (reemplazar <course_id> con el ID del curso que se desea actualizar), selecciona Body -> raw -> JSON, y en el área de texto introducir los detalles actualizados del curso en formato JSON, por ejemplo: {"name": "Nuevo nombre", "description": "Nueva descripción"}. Luego, presionar Send.

#DELETE (Eliminar un curso): Selecciona DELETE como método, introduce http://127.0.0.1:5000/course/<course_id> en la barra de URL (reemplaza <course_id> con el ID del curso que deseas eliminar) y presiona Send.

#Se debe reemplazar 127.0.0.1:5000 con la dirección y el puerto donde se está ejecutando el servidor Flask si es diferente.

#La estructura de la base de datos SQLite para el ejemplo mencionado sería una tabla llamada course con las siguientes columnas:

#id: Un número entero que sirve como clave primaria. Este campo se autoincrementa cada vez que se agrega un nuevo curso.
#name: Una cadena de texto que almacena el nombre del curso. Este campo no puede ser nulo.
#description: Una cadena de texto que almacena la descripción del curso.

CREATE TABLE course (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT
);
#Las presentes definiciones de la tabla se manejan automáticamente a través de SQLAlchemy, que es un ORM (Object-Relational Mapper) que permite interactuar con la base de datos de una manera más orientada a objetos. La clase Course en el código de Python corresponde a la tabla course en la base de datos. Cada instancia de la clase Course corresponde a una fila en la tabla course.

#Alumno Marcos PANOZO


