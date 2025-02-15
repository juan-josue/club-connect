"""" Matching algorithm for club-connect """
import json
from flask import Flask, request,  jsonify

app = Flask(__name__)


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

        return jsonify(matching_clubs)

    else:
        return jsonify([])


if __name__ == "__main__":
    app.run(debug=True)

