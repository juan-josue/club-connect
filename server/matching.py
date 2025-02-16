"""" Matching algorithm for club-connect """
import json
from flask import Flask, request,  jsonify
from openai import OpenAI
from dotenv import load_dotenv
import os
from flask_cors import CORS, cross_origin


load_dotenv()
key = os.getenv('OPENAI_API_KEY')
print(f"Loaded API Key: {os.getenv('OPENAI_API_KEY')}")
client = OpenAI(api_key=key)

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route('/api/clubs', methods=["POST"])
@cross_origin()
def match():
    """function takes in user object and a club list file and returns a matching clubs"""
    data = request.get_json()
    club_pref_list = data.get("preferences", [])
    club_rank_pref = dict()
    matching_clubs = []

    # checks if user has any preferences
    if club_pref_list is not []:
        with open("j.json", 'r') as file:
            data = json.load(file)

        for club in data["clubs"]:
            club_rank_pref[club["name"]] = sum(club["tags"].count(pref) for pref in club_pref_list)
        club_rank_pref = dict(sorted(club_rank_pref.items(), key=lambda item: item[1], reverse=True))
        print(data["clubs"])

        # finds the first 20 clubs with the most matches
        for key in club_rank_pref.keys():
            if len(matching_clubs) != 20:
                for club in data["clubs"]:
                    if club["name"] == key:
                        matching_clubs.append(club)
            else:
                break

        matching_clubs = summarize_description(matching_clubs)

        return jsonify(matching_clubs)

    else:
        return jsonify([])


def summarize_description(club_list):
    """summarizes club description"""

    with open("preprompt.txt", "r") as f:
        system_prompt = f.read().strip()

    # OpenAI's system prompt for summarizing
    messages = [{"role": "system", "content": system_prompt}]

    for i in range(len(club_list)):
        # Reset messages for each club
        messages.append({"role": "user", "content": club_list[i]["description"]})

        try:

            completion = client.chat.completions.create(
                model="gpt-4o",
                store=True,
                messages=messages

            )

            club_list[i]["description"] = completion.choices[0].message.content
        except Exception as e:
            print(f"Error during OpenAI API call: {e}")
            #club_list[i]["description"] = "Error summarizing description"

    return club_list


if __name__ == "__main__":
    app.run(debug=True)

