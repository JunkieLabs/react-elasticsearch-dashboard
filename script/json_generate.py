import json
import random
from datetime import datetime, timedelta

# Initialize data
channel_names = [f"Channel {i}" for i in range(1, 101)]
channel_numbers = [str(i) for i in range(1, 101)]
channel_mapping = dict(zip(channel_names, channel_numbers))

device_ids = [f"Device {i}" for i in range(1, 11)]
genders = ["Male", "Female"]
boquet_names = [f"Boquet {i}" for i in range(1, 20)]

# City coordinates and pincodes
cities = {
    "Chennai": {"coordinates": [80.2785, 13.0878], "pincodes": ["600001", "600002", "600003"]},
    "Bangalore": {"coordinates": [77.5937, 12.9719], "pincodes": ["560001", "560002", "560003"]},
    "Delhi": {"coordinates": [77.2090, 28.6139], "pincodes": ["110001", "110002", "110003"]},
    "Mumbai": {"coordinates": [72.8777, 19.0760], "pincodes": ["400001", "400002", "400003"]}
}

# Randomly associate device_ids with city coordinates
device_to_city = {device_id: random.choice(list(cities.keys())) for device_id in device_ids}

base_timestamp = datetime.fromisoformat("2023-09-17T13:01:55.000Z")

# Generate JSON data
data = []
for i in range(10000):
    num_users = random.randint(1, 4)  # Decide number of users for this record (between 1 to 4)
    users_gender = random.choices(genders, k=num_users)
    users_age = [random.randint(5, 100) for _ in range(num_users)]  # Generating ages between 5 to 100

    chosen_channel_name = random.choice(channel_names)
    chosen_channel_number = channel_mapping[chosen_channel_name]
    chosen_device_id = random.choice(device_ids)
    chosen_city = device_to_city[chosen_device_id]
    chosen_coordinates = cities[chosen_city]['coordinates']
    chosen_pincode = random.choice(cities[chosen_city]['pincodes'])

    record = {
        "channel_name": chosen_channel_name,
        "channel_number": chosen_channel_number,
        "bouquet_name": random.choice(boquet_names),
        "device_id": chosen_device_id,
        "event": "Timer",
        "timestamp": (base_timestamp - timedelta(hours=i)).isoformat(),
        "pincode": chosen_pincode,
        "location": {"type": "Point", "coordinates": chosen_coordinates},
        "users_gender": users_gender,
        "users_age": users_age
    }
    data.append(record)

for i in data:
    print(i)

with open("data/data_logs.txt", "w") as f:
    for i in data:
        print(i)
        json_str = json.dumps(i, indent=4)
        f.write(json_str + "\n")