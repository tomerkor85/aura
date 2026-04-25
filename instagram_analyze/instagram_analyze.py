import requests
import json
import os
from datetime import datetime, timedelta

ACCESS_TOKEN = "IGAANZA059HK2pBZAGJTZAlFLTEE4X3NtYUQ0N3dmSURYdGYxQlFxX0lXYkdRU2xxYlRTRjRndDV2bjFiOUlqTGxJQzVKUWs4emdvMzAxa3NUeTY5MjVuXzdxVkdMMUJEOUhTV2VCU2RkYkVHNmNLaTY1MWJjWkNUU1NDRGNVXzNoQQZDZD"
INSTAGRAM_ID = "17841438822791148"
OUTPUT_FILE = "instagram_data.json"

print("\nמתחיל לשלוף נתונים...\n")


def api_get(url, params):
    params["access_token"] = ACCESS_TOKEN
    r = requests.get(url, params=params)
    data = r.json()
    if "error" in data:
        print(f"  שגיאה: {data['error'].get('message')}")
    return data


def get_account_info():
    print("1. שולף פרטי חשבון...")
    return api_get(f"https://graph.instagram.com/v21.0/{INSTAGRAM_ID}", {
        "fields": "id,username,name,biography,website,followers_count,follows_count,media_count"
    })


def get_all_posts():
    print("2. שולף פוסטים...")
    url = f"https://graph.instagram.com/v21.0/{INSTAGRAM_ID}/media"
    params = {
        "fields": "id,caption,media_type,timestamp,permalink,like_count,comments_count",
        "limit": 100
    }
    all_posts = []
    while url and len(all_posts) < 100:
        data = api_get(url, params)
        all_posts.extend(data.get("data", []))
        url = data.get("paging", {}).get("next")
        params = {}
    print(f"   נמצאו {len(all_posts)} פוסטים")
    return all_posts


def get_post_insights(post_id, media_type):
    if media_type in ["VIDEO", "REELS"]:
        metrics = "reach,impressions,saved,shares,plays"
    elif media_type == "CAROUSEL_ALBUM":
        metrics = "reach,impressions,saved,shares"
    else:
        metrics = "reach,impressions,saved,shares"
    return api_get(f"https://graph.instagram.com/v21.0/{post_id}/insights", {"metric": metrics})


def get_account_insights():
    print("3. שולף Insights של החשבון...")
    end = datetime.now()
    start = end - timedelta(days=30)
    return api_get(f"https://graph.instagram.com/v21.0/{INSTAGRAM_ID}/insights", {
        "metric": "reach,impressions,profile_views,accounts_engaged,total_interactions",
        "period": "day",
        "since": int(start.timestamp()),
        "until": int(end.timestamp())
    })


def get_audience_insights():
    print("4. שולף נתוני קהל...")
    return api_get(f"https://graph.instagram.com/v21.0/{INSTAGRAM_ID}/insights", {
        "metric": "follower_demographics",
        "period": "lifetime",
        "breakdown": "country,age,gender"
    })


data = {}
data["account"] = get_account_info()
posts = get_all_posts()
data["posts"] = posts

print("5. שולף insights לפוסטים אחרונים...")
posts_with_insights = []
for i, post in enumerate(posts[:20]):
    print(f"   פוסט {i + 1}/20")
    p = post.copy()
    p["insights"] = get_post_insights(post["id"], post.get("media_type", "IMAGE"))
    posts_with_insights.append(p)
data["posts_with_insights"] = posts_with_insights

data["account_insights"] = get_account_insights()
data["audience"] = get_audience_insights()

media_types = {}
for p in posts:
    mt = p.get("media_type", "UNKNOWN")
    if mt not in media_types:
        media_types[mt] = {"count": 0, "total_likes": 0, "total_comments": 0}
    media_types[mt]["count"] += 1
    media_types[mt]["total_likes"] += p.get("like_count", 0)
    media_types[mt]["total_comments"] += p.get("comments_count", 0)
for mt in media_types:
    c = media_types[mt]["count"]
    media_types[mt]["avg_likes"] = round(media_types[mt]["total_likes"] / c, 1)
    media_types[mt]["avg_comments"] = round(media_types[mt]["total_comments"] / c, 1)
data["stats_by_media_type"] = media_types

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False, default=str)

print(f"\nהכל נשמר ב: {os.path.abspath(OUTPUT_FILE)}")
print("שלח את הקובץ instagram_data.json לקלוד!")
