import re
import math

file_path = '/vercel/share/v0-project/components/character-marketplace.tsx'

with open(file_path, 'r') as f:
    content = f.read()

char_index = [0]

def seeded_random(seed):
    x = math.sin(seed) * 10000
    return x - math.floor(x)

def replacer(match):
    char_index[0] += 1
    idx = char_index[0]
    tier = match.group(1)
    status = match.group(2)
    
    gold = int(seeded_random(idx * 7 + 3) * 401) + 100
    email_type = '"fake-bnet"' if idx % 3 == 0 else '"full"'
    
    return f'tier: "{tier}", status: "{status}",\n    emailAccess: {email_type}, goldInBags: {gold},'

pattern = r'tier: "(T4|Pre-Raid|PvP)", status: "(available|reserved)",'
content = re.sub(pattern, replacer, content)

with open(file_path, 'w') as f:
    f.write(content)

print(f"Updated {char_index[0]} characters with emailAccess and goldInBags fields.")
