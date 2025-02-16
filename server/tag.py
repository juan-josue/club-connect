import requests
import json
from bs4 import BeautifulSoup
import time


# Load the JSON file
json_file = "uoft_clubs.json"

with open(json_file, "r", encoding="utf-8") as file:
    data = json.load(file)


# Function to scrape the campus tag
def get_campus_tag(url):
    try:
        r = requests.get(url, timeout=10)
        soup = BeautifulSoup(r.content, 'html5lib')

        # Extract the campus name
        campus_tag = soup.find("span", class_="inline-flex items-center text-sm bg-secondary font-bold px-2 py-2 gap-2 rounded text-white uppercase")
        return campus_tag.get_text(strip=True) if campus_tag else None

    except requests.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return None


# Loop through all clubs
for club in data["clubs"]:
    if not club["tags"]:
        campus_text = get_campus_tag(club["url"])  # Scrape campus info

        if campus_text:
            if "tags" not in club:
                club["tags"] = []  # Ensure tags field exists

            if campus_text not in club["tags"]:
                club["tags"].append(campus_text)  # Add unique campus tag

        print(f"Updated {club['name']} with campus: {campus_text}")

        time.sleep(1)  # Avoid overwhelming the website


# Save the updated JSON while keeping the format
updated_json_file = "uoft_clubs.json"

with open(updated_json_file, "w", encoding="utf-8") as file:
    json.dump(data, file, ensure_ascii=False, indent=4)

print(f"Updated JSON saved to {updated_json_file}")
