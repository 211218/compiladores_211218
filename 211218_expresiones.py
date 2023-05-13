from flask import Flask, jsonify
import pandas as pd
import re

app = Flask(__name__)

data_client = pd.read_excel('contactos.xlsx', engine='openpyxl')

data_client = data_client.fillna("")

clientes = data_client.to_dict('records')

def searching(entrada):
    regex_pattern = f"({re.escape(entrada)})"
    pattern = re.compile(regex_pattern, re.IGNORECASE)
    coincidencias = [cliente for cliente in clientes if pattern.search(str(cliente["   Nombre Contacto "])) or pattern.search(str(cliente["Clave cliente"])) or pattern.search(str(cliente["Correo "])) or pattern.search(str(cliente["Teléfono Contacto  "]))]
    return coincidencias

@app.route('/buscar_registros/<string:entrada>', methods=['GET'])
def search(entrada):
    res = searching(entrada)
    return jsonify(res)

if __name__ == '__main__':  
    app.run(debug=True, port=5000)
