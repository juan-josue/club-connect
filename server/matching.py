"""" Matching algorithm for club-connect """
import json


class User:
    """ User class
    """
    pref: list

    def __init__(self, pref: list) -> None:
        """ initializes club """
        self.pref = pref


def match(user: User, clubs_file: str) -> list:
    """function takes in user object and a club list file and returns a matching clubs"""

    club_pref_list = user.pref
    club_rank_pref = dict()
    matching_clubs = []


    # checks if user has any preferences
    if club_pref_list is not []:
        with open(clubs_file, 'r') as file:
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

        return matching_clubs

    else:
        return []
