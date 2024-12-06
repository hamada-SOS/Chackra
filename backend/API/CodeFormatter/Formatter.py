import black
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/format-code', methods=['POST'])
def format_code():
    data = request.json
    code = data.get('code', '')
    formatted_code = format_code_with_black(code)
    return jsonify({'formatted_code': formatted_code})

def format_code_with_black(code: str) -> str:
    try:
        # Format the code with Black's API
        formatted_code = black.format_str(code, mode=black.FileMode())
        return formatted_code
    except black.NothingChanged:
        # If Black didn't make any changes
        return code
    except Exception as e:
        # Handle other exceptions
        print(f"Error formatting code: {e}")
        return code

# hell = "import json\nimport sys\n\ndef add_two_numbers() -> int:\n    a, b = json.loads(sys.stdin.read().strip())\n    # Add your logic here\n\n    return 0  # Replace with your logic\n\nresult = add_two_numbers()\nprint(result)"
# print(jsonify(format_code_with_black(hell)))