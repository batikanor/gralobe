import requests
import json

url = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_urban_areas.geojson"
print(f"Fetching {url}...")
try:
    r = requests.get(url)
    data = r.json()
    print("Keys in first feature properties:")
    if data['features']:
        print(data['features'][0]['properties'].keys())
        
        # Check if any feature has 'name' or 'name_conve'
        has_name = False
        has_name_conve = False
        sample_names = []
        
        for f in data['features']:
            props = f['properties']
            if 'name' in props:
                has_name = True
                sample_names.append(props['name'])
            if 'name_conve' in props:
                has_name_conve = True
                
        print(f"Has 'name': {has_name}")
        print(f"Has 'name_conve': {has_name_conve}")
        if sample_names:
            print(f"Sample names: {sample_names[:5]}")
            
except Exception as e:
    print(f"Error: {e}")
