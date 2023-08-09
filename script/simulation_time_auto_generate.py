import random
import time
import threading
import uuid
from elasticsearch import Elasticsearch

# Establish a connection to Elasticsearch
es = Elasticsearch(hosts=[{'host': '192.168.1.16', 'port': 9200, 'scheme': 'http'}])

# Define the mapping for the index
mapping = {

    "mappings": {
        "properties": {
            "deviceId": {"type": "text"},
            "user_age": {"type": "integer"},
            "event": {"type": "text"},
            "timestamp": {
                "type": "date",
                "store": True
            },
            "message": {"type": "text"}
        },
        "dynamic_templates": [
            {
                "timestamps": {
                    "match_mapping_type": "date",
                    "mapping": {
                        "type": "date",
                        "format": "strict_date_optional_time||epoch_millis",
                        "store": True
                    }
                }
            }
        ],
        "date_detection": True
    },
    "settings": {
        "index.mapping.total_fields.limit": 2000
    }
}


# Delete index if it exists
if es.indices.exists(index="tes_time"):
    es.indices.delete(index="tes_time")

# Create the index with the defined mapping
es.indices.create(index="tes_time", body=mapping)

# Define the STB devices and user profiles
deviceIds = [f'ZX98763{i:02d}' for i in range(1, 10)]
user_profiles = {deviceId: [random.randint(12, 60) for _ in range(5)] for deviceId in deviceIds}

# Define the STB channels
channel_prefixes = ["News", "Sport", "Kids", "Music", "Movies", "Education", "Food", "Travel"]
channel_suffixes = ["Network", "Channel", "Central", "World", "Planet", "Hub"]

channels = {}
for i in range(80):
    channel_name = f"{random.choice(channel_prefixes)} {random.choice(channel_suffixes)} {i + 1}"
    channels[i + 1] = {'lcn': f'LCN{i + 1:03d}', 'channel_name': channel_name}

# Initialize volume level for each device
device_volumes = {deviceId: 60 for deviceId in deviceIds}

# Initialize current channel for each device
device_channels = {deviceId: channels[76] for deviceId in deviceIds}


# Function to generate a log entry
def generate_log(device_id, user_age, event, channel=None, volume=None, old_volume=None):
    message = f'Device: {device_id}, User Age: {user_age}, Event: {event}'
    if channel is not None:
        message += f', Channel Number: {channel["lcn"]}, Channel Name: {channel["channel_name"]}'
    if volume is not None:
        if old_volume is not None:
            message += f', Old Volume: {old_volume}, New Volume: {volume}'
        else:
            message += f', Volume: {volume}'

    log = {
        'deviceId': device_id,
        'user_age': user_age,
        'event': event,
        'message': message
    }
    if channel is not None:
        log.update({
            'channel_number': channel["lcn"],
            'channel_name': channel["channel_name"],
        })
    if volume is not None:
        log['volume'] = volume
    return log


# Code for the select_channel_based_on_age and simulate_device functions goes here...


def select_channel_based_on_age(user_age):
    if 12 <= user_age <= 18:
        preferred_keywords = ["Kids", "Education", "Sport", "Network", "Channel", "World"]
    elif 19 <= user_age <= 30:
        preferred_keywords = ["News", "Sport", "Music", "Travel", "Central", "World", "Hub"]
    elif 31 <= user_age <= 45:
        preferred_keywords = ["News", "Movies", "Food", "Travel", "Channel", "World", "Hub", "Planet"]
    elif 46 <= user_age <= 55:
        preferred_keywords = ["Movies", "Music", "Education", "Network", "Planet"]
    else:
        preferred_keywords = ["Food", "Kids", "Education", "Central", "Hub"]

    preferred_channels = [channel for channel in channels.values() if
                          any(keyword in channel['channel_name'] for keyword in preferred_keywords)]
    non_preferred_channels = [channel for channel in channels.values() if channel not in preferred_channels]

    if random.random() < 0.6 and preferred_channels:  # 60% bias towards preferred channels
        return random.choice(preferred_channels)
    else:
        return random.choice(non_preferred_channels + preferred_channels)


def simulate_device(device_id):
    while True:  # Loop to keep the device running indefinitely
        # Generate a unique session ID
        session_id = str(uuid.uuid4())

        # Select a random user profile
        current_user_age = random.choice(user_profiles[device_id])

        # STB is powered on
        es.index(index="tes_time",
                 id=f'{device_id}_powered_on_{session_id}',
                 document=generate_log(device_id, current_user_age, "Powered On", channel=device_channels[device_id],
                                       volume=device_volumes[device_id]))
        time.sleep(10)

        # Generate heartbeat events for 1-2 hours
        end_time = time.time() + 60 * 60 * random.randint(1, 2)
        while time.time() < end_time:
            es.index(index="tes_time",
                     id=f'{device_id}_heartbeat_{session_id}',
                     document=generate_log(device_id, current_user_age, "Heartbeat", channel=device_channels[device_id],
                                           volume=device_volumes[device_id]))
            time.sleep(10)

            # Randomly send other events
            if random.random() < 0.1:
                event_type = random.choice(["Channel Zap", "Volume change", "Profile Change"])
                if event_type == "Channel Zap":
                    channel = select_channel_based_on_age(current_user_age)
                    device_channels[device_id] = channel
                    es.index(index="tes_time",
                             id=str(uuid.uuid4()),  # Random Elasticsearch ID
                             document=generate_log(device_id, current_user_age, event_type, channel=channel))
                elif event_type == "Volume change":
                    old_volume = device_volumes[device_id]
                    new_volume = random.randint(0, 100)  # Assuming STB volume range is 0-100
                    device_volumes[device_id] = new_volume
                    es.index(index="tes_time",
                             id=str(uuid.uuid4()),  # Random Elasticsearch ID
                             document=generate_log(device_id, current_user_age, event_type, volume=new_volume,
                                                   old_volume=old_volume))
                elif event_type == "Profile Change":
                    current_user_age = random.choice(user_profiles[device_id])
                    es.index(index="tes_time",
                             id=str(uuid.uuid4()),  # Random Elasticsearch ID
                             document=generate_log(device_id, current_user_age, event_type))

        # Randomly power off the device for 1-10 minutes
        time.sleep(60 * random.randint(1, 10))


# Create and start a separate thread for each device
for deviceId in deviceIds:
    threading.Thread(target=simulate_device, args=(deviceId,)).start()
