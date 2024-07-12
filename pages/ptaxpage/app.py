from flask import Flask, jsonify
import requests

app = Flask(__name__)

@app.route('/fetch-csv', methods=['GET'])
def fetch_csv():
    url = 'https://www4.bcb.gov.br/Download/fechamento/20240712.csv'
    try:
        response = requests.get(url)
        response.raise_for_status()  # Check if the request was successful
        csv_data = response.text
        return jsonify({'csv_data': csv_data})
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

