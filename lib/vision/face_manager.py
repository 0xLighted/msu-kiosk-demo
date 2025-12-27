import warnings
# Suppress the annoying pkg_resources deprecation warning from face_recognition_models
warnings.filterwarnings("ignore", category=UserWarning, module="face_recognition_models")

import face_recognition
import numpy as np
import json
import os
from pathlib import Path
from typing import List, Dict, Optional, Tuple

class FaceManager:
    def __init__(self, storage_path: str = "data/face_data.json"):
        self.storage_path = Path(storage_path)
        self.users = [] # List of dicts: {"id": str, "name": str, "encoding": np.array}
        
        # Ensure data directory exists
        self.storage_path.parent.mkdir(parents=True, exist_ok=True)
        self.load_data()

    def load_data(self):
        """Load users from JSON file."""
        if self.storage_path.exists():
            try:
                with open(self.storage_path, "r") as f:
                    data = json.load(f)
                    self.users = []
                    for item in data:
                        user = {
                            "id": item["id"],
                            "name": item["name"],
                            "encoding": np.array(item["encoding"])
                        }
                        self.users.append(user)
                print(f"Loaded {len(self.users)} users from storage.")
            except Exception as e:
                print(f"Error loading face data: {e}")

    def save_data(self):
        """Save users to JSON file."""
        data = []
        for user in self.users:
            data.append({
                "id": user["id"],
                "name": user["name"],
                "encoding": user["encoding"].tolist()
            })
        
        with open(self.storage_path, "w") as f:
            json.dump(data, f, indent=4)
        print("Face data saved successfully.")

    def add_user(self, user_id: str, name: str, image_path: str) -> bool:
        """
        Extract face encoding and add user to database.
        """
        if not os.path.exists(image_path):
            print(f"Error: Image path {image_path} does not exist.")
            return False

        try:
            image = face_recognition.load_image_file(image_path)
            encodings = face_recognition.face_encodings(image)

            if len(encodings) == 0:
                print(f"Error: No faces found in {image_path}.")
                return False
            
            encoding = encodings[0]
            
            # Check if user ID already exists
            existing_user = next((u for u in self.users if u["id"] == user_id), None)
            
            if existing_user:
                existing_user.update({
                    "name": name,
                    "encoding": encoding
                })
                print(f"Updated existing user: {name} (ID: {user_id})")
            else:
                self.users.append({
                    "id": user_id,
                    "name": name,
                    "encoding": encoding
                })
                print(f"Added new user: {name} (ID: {user_id})")

            self.save_data()
            return True
        except Exception as e:
            print(f"Error adding user {name}: {e}")
            return False

    def identify_face(self, frame_or_path, tolerance: float = 0.6) -> List[Dict]:
        """
        Identify faces. Returns a list of user dictionaries.
        Unrecognized users will have name "Unknown" and id None.
        """
        try:
            if isinstance(frame_or_path, str):
                image = face_recognition.load_image_file(frame_or_path)
            else:
                image = frame_or_path

            if not self.users:
                print("No users in database.")
                return []

            face_locations = face_recognition.face_locations(image)
            face_encodings = face_recognition.face_encodings(image, face_locations)

            # Extract just the encodings for calculation
            known_encodings = [u["encoding"] for u in self.users]
            
            results = []
            for face_encoding in face_encodings:
                matches = face_recognition.compare_faces(known_encodings, face_encoding, tolerance=tolerance)
                user_info = {"id": None, "name": "Unknown"}

                face_distances = face_recognition.face_distance(known_encodings, face_encoding)
                if len(face_distances) > 0:
                    best_match_index = np.argmin(face_distances)
                    if matches[best_match_index]:
                        matched_user = self.users[best_match_index]
                        user_info = {
                            "id": matched_user["id"],
                            "name": matched_user["name"]
                        }

                results.append(user_info)
            
            return results
        except Exception as e:
            print(f"Error identifying face: {e}")
            return []
