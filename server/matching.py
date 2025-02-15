"""" Matching algorithm for club-connect """
import json
from flask import Flask, request,  jsonify
import openai
from dotenv import load_dotenv
import os


load_dotenv()
from flask_cors import CORS

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv('SECRET_KEY')
CORS(app)


@app.route('/api/clubs', methods=["POST"])
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
    # """summarizes club description"""
    # openai.api_key = app.config["SECRET_KEY"]
    #
    # with open("preprompt.txt", "r") as f:
    #     system_prompt = f.read().strip()
    #
    # messages = [
    #     {"role": "system", "content": system_prompt}
    # ]
    # # get initial response
    # openai.chat.completions.create(
    #     model="gpt-3.5-turbo",
    #     messages=messages)
    #
    # for i in range(len(club_list)):
    #     messages.append({"role": "user", "content": club_list[i]["description"]})
    #     response = openai.chat.completions.create(
    #         model="gpt-3.5-turbo",
    #         messages=messages)
    #
    #     club_list[i]["description"] = response.choices[0].message.content
    #

    # return club_list
    """summarizes club description"""
    openai.api_key = app.config["SECRET_KEY"]

    with open("preprompt.txt", "r") as f:
        system_prompt = f.read().strip()

    # OpenAI's system prompt for summarizing
    messages = [{"role": "system", "content": system_prompt}]

    for i in range(len(club_list)):
        # Reset messages for each club
        messages.append({"role": "user", "content": club_list[i]["description"]})

        try:
            response = openai.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages
            )
            club_list[i]["description"] = response.choices[0].message.content
        except Exception as e:
            print(f"Error during OpenAI API call: {e}")
            club_list[i]["description"] = "Error summarizing description"

    return club_list


if __name__ == "__main__":
    app.run(debug=True)

